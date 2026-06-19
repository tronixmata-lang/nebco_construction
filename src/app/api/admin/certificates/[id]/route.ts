import { Certificate } from "@/lib/db/models";
import { createItemHandlers } from "@/lib/admin/crud";

const handlers = createItemHandlers({ model: Certificate as never, resourceName: "certificate" });
export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
