import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type Ga4Overview = {
  activeUsers: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  avgEngagementTime: number;
};

export type Ga4DailyPoint = {
  date: string;
  users: number;
  sessions: number;
  pageViews: number;
};

export type Ga4VisitorsReport = {
  configured: boolean;
  ready: boolean;
  message?: string;
  period: { start: string; end: string; days: number };
  overview: Ga4Overview | null;
  daily: Ga4DailyPoint[];
  topPages: { path: string; title: string; views: number }[];
  countries: { country: string; users: number }[];
  cities: { city: string; country: string; users: number }[];
  devices: { device: string; users: number }[];
  browsers: { browser: string; users: number }[];
  trafficSources: { channel: string; source: string; users: number; sessions: number }[];
  demographics: {
    age: { bracket: string; users: number }[];
    gender: { gender: string; users: number }[];
  };
};

type ReportRow = Record<string, string | number>;

const REPORT_DAYS = 30;

function parseServiceAccountJson(): object | null {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;

  try {
    if (raw.startsWith("{")) return JSON.parse(raw) as object;
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as object;
  } catch {
    return null;
  }
}

function createGa4Client(): BetaAnalyticsDataClient | null {
  const credentials = parseServiceAccountJson();
  if (credentials) {
    return new BetaAnalyticsDataClient({ credentials });
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new BetaAnalyticsDataClient();
  }
  return null;
}

function resolvePropertyId(ga4PropertyId?: string): string | null {
  const fromEnv = process.env.GA4_PROPERTY_ID?.trim();
  if (fromEnv) return fromEnv.replace(/\D/g, "");
  const fromDb = ga4PropertyId?.trim();
  if (fromDb) return fromDb.replace(/\D/g, "");
  return null;
}

type Ga4RunReportResponse = {
  dimensionHeaders?: { name?: string | null }[];
  metricHeaders?: { name?: string | null }[];
  rows?: {
    dimensionValues?: { value?: string | null }[];
    metricValues?: { value?: string | null }[];
  }[];
};

function parseRows(response: Ga4RunReportResponse): ReportRow[] {
  const dimNames =
    response.dimensionHeaders?.map((header) => header.name ?? "") ?? [];
  const metricNames =
    response.metricHeaders?.map((header) => header.name ?? "") ?? [];

  return (response.rows ?? []).map((row) => {
    const parsed: ReportRow = {};
    row.dimensionValues?.forEach((value, index) => {
      parsed[dimNames[index] ?? `dim${index}`] = value.value ?? "";
    });
    row.metricValues?.forEach((value, index) => {
      const key = metricNames[index] ?? `metric${index}`;
      const numeric = Number(value.value);
      parsed[key] = Number.isFinite(numeric) ? numeric : (value.value ?? "");
    });
    return parsed;
  });
}

function emptyReport(message: string, configured: boolean): Ga4VisitorsReport {
  const end = new Date();
  const start = new Date(end.getTime() - REPORT_DAYS * 24 * 60 * 60 * 1000);
  return {
    configured,
    ready: false,
    message,
    period: {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      days: REPORT_DAYS,
    },
    overview: null,
    daily: [],
    topPages: [],
    countries: [],
    cities: [],
    devices: [],
    browsers: [],
    trafficSources: [],
    demographics: { age: [], gender: [] },
  };
}

async function runReport(
  client: BetaAnalyticsDataClient,
  property: string,
  request: Omit<Parameters<BetaAnalyticsDataClient["runReport"]>[0], "property" | "dateRanges">,
) {
  const [response] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${REPORT_DAYS}daysAgo`, endDate: "today" }],
    ...request,
  });
  return parseRows(response as Ga4RunReportResponse);
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export { formatDuration };

export async function fetchGa4VisitorsReport(
  ga4PropertyId?: string,
): Promise<Ga4VisitorsReport> {
  const propertyId = resolvePropertyId(ga4PropertyId);
  const hasCredentials =
    Boolean(parseServiceAccountJson()) ||
    Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  if (!propertyId) {
    return emptyReport(
      "Add your GA4 Property ID in Admin → SEO (numeric ID from Google Analytics → Admin → Property settings).",
      false,
    );
  }

  if (!hasCredentials) {
    return emptyReport(
      "Set GA4_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS on the server with a Google service account that has Viewer access to this GA4 property.",
      false,
    );
  }

  const client = createGa4Client();
  if (!client) {
    return emptyReport("Could not initialize the Google Analytics client.", true);
  }

  const property = `properties/${propertyId}`;
  const end = new Date();
  const start = new Date(end.getTime() - REPORT_DAYS * 24 * 60 * 60 * 1000);
  const period = {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    days: REPORT_DAYS,
  };

  try {
    const [
      overviewRows,
      dailyRows,
      pageRows,
      countryRows,
      cityRows,
      deviceRows,
      browserRows,
      channelRows,
      ageRows,
      genderRows,
    ] = await Promise.all([
      runReport(client, property, {
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
          { name: "userEngagementDuration" },
        ],
      }),
      runReport(client, property, {
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      runReport(client, property, {
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      runReport(client, property, {
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 10,
      }),
      runReport(client, property, {
        dimensions: [{ name: "city" }, { name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 10,
      }),
      runReport(client, property, {
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),
      runReport(client, property, {
        dimensions: [{ name: "browser" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 8,
      }),
      runReport(client, property, {
        dimensions: [
          { name: "sessionDefaultChannelGroup" },
          { name: "sessionSource" },
        ],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 12,
      }),
      runReport(client, property, {
        dimensions: [{ name: "userAgeBracket" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "userAgeBracket" } }],
      }),
      runReport(client, property, {
        dimensions: [{ name: "userGender" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),
    ]);

    const overviewRaw = overviewRows[0] ?? {};
    const activeUsers = Number(overviewRaw.activeUsers ?? 0);
    const engagementDuration = Number(overviewRaw.userEngagementDuration ?? 0);

    const overview: Ga4Overview = {
      activeUsers,
      sessions: Number(overviewRaw.sessions ?? 0),
      pageViews: Number(overviewRaw.screenPageViews ?? 0),
      bounceRate: Number(overviewRaw.bounceRate ?? 0) * 100,
      avgSessionDuration: Number(overviewRaw.averageSessionDuration ?? 0),
      avgEngagementTime: activeUsers > 0 ? engagementDuration / activeUsers : 0,
    };

    return {
      configured: true,
      ready: true,
      period,
      overview,
      daily: dailyRows.map((row) => ({
        date: String(row.date ?? ""),
        users: Number(row.activeUsers ?? 0),
        sessions: Number(row.sessions ?? 0),
        pageViews: Number(row.screenPageViews ?? 0),
      })),
      topPages: pageRows.map((row) => ({
        path: String(row.pagePath ?? "/"),
        title: String(row.pageTitle ?? row.pagePath ?? "Unknown"),
        views: Number(row.screenPageViews ?? 0),
      })),
      countries: countryRows.map((row) => ({
        country: String(row.country ?? "Unknown"),
        users: Number(row.activeUsers ?? 0),
      })),
      cities: cityRows.map((row) => ({
        city: String(row.city ?? "Unknown"),
        country: String(row.country ?? ""),
        users: Number(row.activeUsers ?? 0),
      })),
      devices: deviceRows.map((row) => ({
        device: String(row.deviceCategory ?? "Unknown"),
        users: Number(row.activeUsers ?? 0),
      })),
      browsers: browserRows.map((row) => ({
        browser: String(row.browser ?? "Unknown"),
        users: Number(row.activeUsers ?? 0),
      })),
      trafficSources: channelRows.map((row) => ({
        channel: String(row.sessionDefaultChannelGroup ?? "Unknown"),
        source: String(row.sessionSource ?? ""),
        users: Number(row.activeUsers ?? 0),
        sessions: Number(row.sessions ?? 0),
      })),
      demographics: {
        age: ageRows
          .filter((row) => String(row.userAgeBracket ?? "") !== "unknown")
          .map((row) => ({
            bracket: String(row.userAgeBracket ?? "Unknown"),
            users: Number(row.activeUsers ?? 0),
          })),
        gender: genderRows
          .filter((row) => String(row.userGender ?? "") !== "unknown")
          .map((row) => ({
            gender: String(row.userGender ?? "Unknown"),
            users: Number(row.activeUsers ?? 0),
          })),
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load visitor analytics from Google Analytics.";
    return {
      ...emptyReport(message, true),
      configured: true,
    };
  }
}
