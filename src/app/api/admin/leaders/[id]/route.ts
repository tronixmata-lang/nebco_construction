import { Leader } from "@/lib/db/models";
import { createItemHandlers } from "@/lib/admin/crud";

const handlers = createItemHandlers({ model: Leader as never, resourceName: "leader" });
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
