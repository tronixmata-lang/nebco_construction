import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { revalidatePublicSite } from "@/lib/admin/revalidate-public";
import { connectDB } from "@/lib/db/connect";
import { Redirect } from "@/lib/db/models";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const items = await Redirect.find().sort({ createdAt: -1 }).lean();
    return apiSuccess(items);
  } catch {
    return apiError("Failed to fetch redirects", 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const from = body.from?.startsWith("/") ? body.from : `/${body.from ?? ""}`;
    const to = body.to?.startsWith("/") || body.to?.startsWith("http") ? body.to : `/${body.to ?? ""}`;

    await connectDB();
    const existing = await Redirect.findOne({ from });
    if (existing) return apiError("A redirect for this path already exists", 409);

    const item = await Redirect.create({ ...body, from, to });
    revalidatePublicSite();
    return apiSuccess(item, 201);
  } catch {
    return apiError("Failed to create redirect", 500);
  }
}
