import { Division } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";
const config = { model: Division as never, resourceName: "division", searchFields: ["name", "slug"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
