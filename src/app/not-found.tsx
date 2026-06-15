import { SetBreadcrumbLabel } from "@/components/layout/BreadcrumbContext";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <>
      <SetBreadcrumbLabel label="Page Not Found" />
      <PageHeader
        eyebrow="404"
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
      >
        <div className="mt-10">
          <Button href="/" size="lg">
            Return Home
          </Button>
        </div>
      </PageHeader>
    </>
  );
}
