import LeaderFormPage from "../[id]/page";
export default function NewLeaderPage() {
  return <LeaderFormPage params={Promise.resolve({ id: "new" })} />;
}
