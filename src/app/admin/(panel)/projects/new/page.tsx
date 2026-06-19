import ProjectFormPage from "../[id]/page";

export default function NewProjectPage() {
  return <ProjectFormPage params={Promise.resolve({ id: "new" })} />;
}
