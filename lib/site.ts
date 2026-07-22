import type { Metadata } from "next";

const configuredOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ?? "";
const configuredBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "") ?? "";
const configuredWhatsApp = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "447528862843"
).replace(/\D/g, "");

function isPublicSiteUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

const hasPublicOrigin = isPublicSiteUrl(configuredOrigin);
const basePath = /^\/(?:[a-z0-9._~-]+(?:\/[a-z0-9._~-]+)*)?$/i.test(
  configuredBasePath,
)
  ? configuredBasePath
  : "";
const hasWhatsAppNumber = /^\d{8,15}$/.test(configuredWhatsApp);

export const siteConfig = {
  name: "Stevie Craig Private Hires and Tours",
  shortName: "Stevie Craig",
  descriptor: "Private Hires & Tours",
  description:
    "Private hire across Edinburgh and beyond, including airport transfers, longer journeys and bespoke tours.",
  origin: hasPublicOrigin
    ? configuredOrigin
    : "https://preview.steviecraig.example",
  basePath,
  publicOrigin: hasPublicOrigin,
  whatsappNumber: configuredWhatsApp,
  whatsappReady: hasWhatsAppNumber,
  launchReady: hasPublicOrigin && hasWhatsAppNumber,
  areaServed: "Edinburgh and journeys beyond the city",
  email: "",
  routes: ["/", "/private-hire", "/airport-transfers", "/tours", "/contact"],
  bookingMessages: {
    general: "Hi Stevie, I'd like to book a taxi:",
    privateHire: "Hi Stevie, I'd like to book a taxi:",
    airport: "Hi Stevie, I'd like to book a taxi:",
    tour: "Hi Stevie, I'd like to book a taxi:",
  },
} as const;

export type BookingKind = keyof typeof siteConfig.bookingMessages;

export function siteAsset(path: `/${string}`) {
  return `${siteConfig.basePath}${path}`;
}

export function siteUrl(path: `/${string}` = "/") {
  const relativePath = path.replace(/^\/+/, "");
  return new URL(relativePath, `${siteConfig.origin}/`).toString();
}

export function whatsappHref(kind: BookingKind = "general") {
  if (!siteConfig.whatsappReady) return "/contact#booking-pending";

  const message = encodeURIComponent(siteConfig.bookingMessages[kind]);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const absoluteUrl = siteUrl(path);
  const shareImage = siteUrl("/og.png");

  return {
    title,
    description,
    alternates: siteConfig.publicOrigin ? { canonical: absoluteUrl } : undefined,
    robots: siteConfig.launchReady
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl,
      images: [{ url: shareImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export function structuredData() {
  const provider: Record<string, unknown> = {
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
  };

  if (siteConfig.publicOrigin) provider.url = siteConfig.origin;
  if (siteConfig.whatsappReady) provider.telephone = `+${siteConfig.whatsappNumber}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      provider,
      {
        "@type": "TaxiService",
        name: siteConfig.name,
        description: siteConfig.description,
        areaServed: {
          "@type": "City",
          name: "Edinburgh",
        },
        provider,
        providerMobility: "dynamic",
      },
    ],
  };
}
