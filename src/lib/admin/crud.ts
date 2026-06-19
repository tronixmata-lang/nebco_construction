import type { Model } from "mongoose";
import { requireAuth, apiSuccess, apiError } from "@/lib/auth/guard";
import { connectDB } from "@/lib/db/connect";

type CrudConfig = {
  model: Model<Record<string, unknown>>;
  resourceName: string;
  searchFields?: string[];
  sort?: Record<string, 1 | -1>;
};

export function createListHandler({ model, resourceName, searchFields, sort }: CrudConfig) {
  return async function GET(request: Request) {
    const auth = await requireAuth();
    if ("error" in auth) return auth.error;
    try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const q = searchParams.get("q")?.trim();
      const filter: Record<string, unknown> = {};
      if (q && searchFields?.length) {
        filter.$or = searchFields.map((field) => ({
          [field]: { $regex: q, $options: "i" },
        }));
      }
      const items = await model.find(filter).sort(sort ?? { sortOrder: 1 }).lean();
      return apiSuccess(items);
    } catch {
      return apiError(`Failed to fetch ${resourceName}`, 500);
    }
  };
}

export function createCreateHandler({ model, resourceName }: CrudConfig) {
  return async function POST(request: Request) {
    const auth = await requireAuth();
    if ("error" in auth) return auth.error;
    try {
      const body = await request.json();
      await connectDB();
      const count = await model.countDocuments();
      const item = await model.create({ ...body, sortOrder: body.sortOrder ?? count });
      return apiSuccess(item, 201);
    } catch {
      return apiError(`Failed to create ${resourceName}`, 500);
    }
  };
}

export function createItemHandlers({ model, resourceName }: CrudConfig) {
  async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth();
    if ("error" in auth) return auth.error;
    try {
      const { id } = await context.params;
      await connectDB();
      const item = await model.findById(id).lean();
      if (!item) return apiError(`${resourceName} not found`, 404);
      return apiSuccess(item);
    } catch {
      return apiError(`Failed to fetch ${resourceName}`, 500);
    }
  }

  async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth();
    if ("error" in auth) return auth.error;
    try {
      const { id } = await context.params;
      const body = await request.json();
      await connectDB();
      const item = await model.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
      if (!item) return apiError(`${resourceName} not found`, 404);
      return apiSuccess(item);
    } catch {
      return apiError(`Failed to update ${resourceName}`, 500);
    }
  }

  async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth();
    if ("error" in auth) return auth.error;
    try {
      const { id } = await context.params;
      await connectDB();
      const item = await model.findByIdAndDelete(id);
      if (!item) return apiError(`${resourceName} not found`, 404);
      return apiSuccess({ deleted: true });
    } catch {
      return apiError(`Failed to delete ${resourceName}`, 500);
    }
  }

  return { GET, PUT, DELETE };
}
