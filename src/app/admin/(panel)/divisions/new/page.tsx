import DivisionFormPage from "../[id]/page";

export default function NewDivisionPage() {
  return <DivisionFormPage params={Promise.resolve({ id: "new" })} />;
}
