import { requireSuperAdmin, apiSuccess, apiError } from "@/lib/auth/guard";
import { hashPassword } from "@/lib/auth/password";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import { z } from "zod";

function sanitizeUser(user: {
  _id: { toString(): string };
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}) {
  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
  };
}

export async function GET(request: Request) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const filter: Record<string, unknown> = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }
    const users = await User.find(filter).select("-passwordHash").sort({ createdAt: -1 }).lean();
    return apiSuccess(users.map((u) => sanitizeUser({ ...u, isActive: u.isActive ?? true })));
  } catch {
    return apiError("Failed to fetch users", 500);
  }
}

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
  role: z.enum(["superadmin", "editor"]),
  isActive: z.boolean().optional(),
});

export async function POST(request: Request) {
  const auth = await requireSuperAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid user data. Password must be at least 8 characters.", 400);
    }

    await connectDB();
    const existing = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (existing) return apiError("A user with this email already exists", 409);

    const user = await User.create({
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name,
      passwordHash: await hashPassword(parsed.data.password),
      role: parsed.data.role,
      isActive: parsed.data.isActive ?? true,
    });

    return apiSuccess(sanitizeUser(user), 201);
  } catch {
    return apiError("Failed to create user", 500);
  }
}
