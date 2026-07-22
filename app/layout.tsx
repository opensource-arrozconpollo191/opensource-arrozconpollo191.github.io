import type { Metadata, Viewport } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.origin}/`),
  title: {
    default: "Edinburgh Private Hire & Tours | Stevie Craig",
    template: "%s | Stevie Craig",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: siteUrl("/icon.png"),
    shortcut: siteUrl("/icon.png"),
    apple: siteUrl("/apple-icon.png"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071724",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
