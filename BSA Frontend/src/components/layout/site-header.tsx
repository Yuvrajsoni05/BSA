import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-ivory/10">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/BSA_logo.jpeg"
            alt={siteConfig.name}
            width={60}
            height={60}
            priority
            className="h-auto"
          />
        </Link>
      </Container>
    </header>
  );
}
