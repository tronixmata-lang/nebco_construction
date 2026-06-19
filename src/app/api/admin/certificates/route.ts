import { Certificate } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = { model: Certificate as never, resourceName: "certificate", searchFields: ["title"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
