import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { QueriesProvider } from "@/lib/query-provider";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <QueriesProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </QueriesProvider>
      </body>
    </html>
  );
}
