import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { ContactInquiry, Insight, Project, SeoSettings } from "@/lib/db/models";
import { getSeoSettings } from "@/lib/data/seo";
import { fetchGa4VisitorsReport } from "@/lib/analytics/ga4";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      inquiriesTotal,
      inquiriesWeek,
      inquiriesMonth,
      inquiriesNew,
      projectsPublished,
      insightsPublished,
      recentInquiries,
      seoSettings,
    ] = await Promise.all([
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
      ContactInquiry.countDocuments({ createdAt: { $gte: monthAgo } }),
      ContactInquiry.countDocuments({ status: "new" }),
      Project.countDocuments({ published: true }),
      Insight.countDocuments({ status: "published" }),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(10).lean(),
      getSeoSettings(),
    ]);

    const visitors = await fetchGa4VisitorsReport(seoSettings.ga4PropertyId);

    const dbSeo = await SeoSettings.findOne({ key: "global" }).lean();

    const tracking = {
      ga4: Boolean(seoSettings.ga4MeasurementId),
      gtm: Boolean(seoSettings.gtmContainerId),
      clarity: Boolean(seoSettings.clarityProjectId),
      facebook: Boolean(seoSettings.facebookPixelId),
      googleVerification: Boolean(seoSettings.googleSiteVerification),
    };

    const inquiriesByDay = await ContactInquiry.aggregate([
      { $match: { createdAt: { $gte: monthAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const statusBreakdown = await ContactInquiry.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    return apiSuccess({
      tracking,
      ids: {
        ga4MeasurementId: seoSettings.ga4MeasurementId,
        ga4PropertyId: seoSettings.ga4PropertyId,
        gtmContainerId: seoSettings.gtmContainerId,
        clarityProjectId: seoSettings.clarityProjectId,
      },
      content: {
        projectsPublished,
        insightsPublished,
      },
      inquiries: {
        total: inquiriesTotal,
        week: inquiriesWeek,
        month: inquiriesMonth,
        new: inquiriesNew,
        byDay: inquiriesByDay,
        byStatus: statusBreakdown,
        recent: recentInquiries,
      },
      visitors,
      links: {
        ga4: seoSettings.ga4MeasurementId
          ? `https://analytics.google.com/analytics/web/#/p${seoSettings.ga4MeasurementId.replace("G-", "")}/reports/intelligenthome`
          : "https://analytics.google.com",
        searchConsole: "https://search.google.com/search-console",
        clarity: seoSettings.clarityProjectId
          ? "https://clarity.microsoft.com/projects/view/" + seoSettings.clarityProjectId
          : "https://clarity.microsoft.com",
      },
      updatedAt: dbSeo?.updatedAt,
    });
  } catch {
    return apiError("Failed to load analytics", 500);
  }
}
