import { ValuePillar } from "@/lib/db/models";
import { createItemHandlers } from "@/lib/admin/crud";

const handlers = createItemHandlers({ model: ValuePillar as never, resourceName: "pillar" });
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
