import { requireSuperAdmin, apiSuccess, apiError } from "@/lib/auth/guard";
import { hashPassword } from "@/lib/auth/password";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import { z } from "zod";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    await connectDB();
    const user = await User.findById(id).select("-passwordHash").lean();
    if (!user) return apiError("User not found", 404);
    return apiSuccess(user);
  } catch {
    return apiError("Failed to fetch user", 500);
  }
}

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(["superadmin", "editor"]).optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) return apiError("Invalid user data", 400);

    await connectDB();
    const user = await User.findById(id);
    if (!user) return apiError("User not found", 404);

    // Prevent deactivating or demoting yourself
    if (id === auth.session.userId) {
      if (parsed.data.isActive === false) {
        return apiError("You cannot deactivate your own account", 400);
      }
      if (parsed.data.role && parsed.data.role !== "superadmin") {
        return apiError("You cannot change your own role", 400);
      }
    }

    if (parsed.data.email) {
      const email = parsed.data.email.toLowerCase();
      const duplicate = await User.findOne({ email, _id: { $ne: id } });
      if (duplicate) return apiError("Email already in use", 409);
      user.email = email;
    }
    if (parsed.data.name) user.name = parsed.data.name;
    if (parsed.data.role) user.role = parsed.data.role;
    if (parsed.data.isActive !== undefined) user.isActive = parsed.data.isActive;
    if (parsed.data.password) user.passwordHash = await hashPassword(parsed.data.password);

    await user.save();

    const updated = await User.findById(id).select("-passwordHash").lean();
    return apiSuccess(updated);
  } catch {
    return apiError("Failed to update user", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;

    if (id === auth.session.userId) {
      return apiError("You cannot delete your own account", 400);
    }

    await connectDB();
    const user = await User.findByIdAndDelete(id);
    if (!user) return apiError("User not found", 404);
    return apiSuccess({ deleted: true });
  } catch {
    return apiError("Failed to delete user", 500);
  }
}
