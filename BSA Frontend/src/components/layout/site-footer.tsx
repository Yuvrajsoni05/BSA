import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ivory/10 py-10">
      <Container className="flex flex-col gap-4 text-sm text-ivory-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear().toString()} {siteConfig.business.legalName}
        </p>
        <div className="flex flex-col gap-1 sm:text-right">
          <span>{siteConfig.business.address}</span>
          <span>
            {siteConfig.business.phone}
          </span>
        </div>
      </Container>
    </footer>
  );
}
