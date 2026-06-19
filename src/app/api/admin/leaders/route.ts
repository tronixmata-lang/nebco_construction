import { Leader } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = { model: Leader as never, resourceName: "leader", searchFields: ["name", "role"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
