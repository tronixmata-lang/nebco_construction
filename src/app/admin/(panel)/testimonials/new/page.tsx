import TestimonialFormPage from "../[id]/page";
export default function NewTestimonialPage() {
  return <TestimonialFormPage params={Promise.resolve({ id: "new" })} />;
}
