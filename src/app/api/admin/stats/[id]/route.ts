import { Stat } from "@/lib/db/models";
import { createItemHandlers } from "@/lib/admin/crud";

const handlers = createItemHandlers({ model: Stat as never, resourceName: "stat" });
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
