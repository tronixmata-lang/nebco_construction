import SectorFormPage from "../[id]/page";
export default function NewSectorPage() {
  return <SectorFormPage params={Promise.resolve({ id: "new" })} />;
}
