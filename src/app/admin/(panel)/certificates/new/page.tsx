import CertificateFormPage from "../[id]/page";
export default function NewCertificatePage() {
  return <CertificateFormPage params={Promise.resolve({ id: "new" })} />;
}
