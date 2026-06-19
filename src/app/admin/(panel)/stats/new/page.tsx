import StatFormPage from "../[id]/page";
export default function NewStatPage() {
  return <StatFormPage params={Promise.resolve({ id: "new" })} />;
}
