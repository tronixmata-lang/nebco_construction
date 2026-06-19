import PillarFormPage from "../[id]/page";
export default function NewPillarPage() {
  return <PillarFormPage params={Promise.resolve({ id: "new" })} />;
}
