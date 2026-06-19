import InsightFormPage from "../[id]/page";

export default function NewInsightPage() {
  return <InsightFormPage params={Promise.resolve({ id: "new" })} />;
}
