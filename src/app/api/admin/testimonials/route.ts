import { Testimonial } from "@/lib/db/models";
import { createCreateHandler, createListHandler } from "@/lib/admin/crud";

const config = { model: Testimonial as never, resourceName: "testimonial", searchFields: ["author", "organization"] };
export const GET = createListHandler(config);
export const POST = createCreateHandler(config);
