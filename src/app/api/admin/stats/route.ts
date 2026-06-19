import { Stat } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = { model: Stat as never, resourceName: "stat", searchFields: ["label", "value"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
