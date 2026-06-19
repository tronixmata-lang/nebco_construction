import UserFormPage from "../[id]/page";

export default function NewUserPage() {
  return <UserFormPage params={Promise.resolve({ id: "new" })} />;
}
