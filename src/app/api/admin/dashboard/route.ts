import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";
import { dbErrorResponse } from "@/lib/db/api-errors";
import {
  Certificate,
  ContactInquiry,
  Division,
  Insight,
  Leader,
  Project,
  Sector,
  Stat,
  Testimonial,
  ValuePillar,
} from "@/lib/db/models";
import { seedDatabase } from "@/lib/db/seed";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();

    const [
      projects,
      insights,
      divisions,
      sectors,
      pillars,
      leaders,
      testimonials,
      stats,
      certificates,
      newInquiries,
      totalInquiries,
      publishedProjects,
      draftInsights,
    ] = await Promise.all([
      Project.countDocuments(),
      Insight.countDocuments(),
      Division.countDocuments(),
      Sector.countDocuments(),
      ValuePillar.countDocuments(),
      Leader.countDocuments(),
      Testimonial.countDocuments(),
      Stat.countDocuments(),
      Certificate.countDocuments(),
      ContactInquiry.countDocuments({ status: "new" }),
      ContactInquiry.countDocuments(),
      Project.countDocuments({ published: true }),
      Insight.countDocuments({ status: "draft" }),
    ]);

    const recentInquiries = await ContactInquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentProjects = await Project.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("title slug updatedAt published featured")
      .lean();

    return apiSuccess({
      counts: {
        projects,
        insights,
        divisions,
        sectors,
        pillars,
        leaders,
        testimonials,
        stats,
        certificates,
        newInquiries,
        totalInquiries,
        publishedProjects,
        draftInsights,
      },
      recentInquiries,
      recentProjects,
    });
  } catch (error) {
    return dbErrorResponse(error, "Failed to load dashboard");
  }
}

export async function POST() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  if (auth.session.role !== "superadmin") {
    return apiError("Only superadmin can re-seed database", 403);
  }

  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DB_SEED !== "true") {
    return apiError(
      "Database seed is disabled in production. Set ALLOW_DB_SEED=true to enable.",
      403,
    );
  }

  try {
    const counts = await seedDatabase();
    return apiSuccess({ message: "Database seeded successfully", counts });
  } catch (error) {
    return dbErrorResponse(error, "Seed failed");
  }
}
