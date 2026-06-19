import { Sector } from "@/lib/db/models";
import { createItemHandlers } from "@/lib/admin/crud";

const handlers = createItemHandlers({ model: Sector as never, resourceName: "sector" });
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
