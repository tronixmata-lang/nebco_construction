import { Sector } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = {
  model: Sector as never,
  resourceName: "sector",
  searchFields: ["title", "legacyId", "highlight"],
};
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
