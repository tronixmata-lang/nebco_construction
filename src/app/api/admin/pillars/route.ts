import { ValuePillar } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = { model: ValuePillar as never, resourceName: "pillar", searchFields: ["title"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
