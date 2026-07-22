import type { Metadata } from "next";

const productionOrigin = "https://shctransfers-toursedinburgh.com";
const configuredOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ??
  productionOrigin;
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

const origin = isPublicSiteUrl(configuredOrigin)
  ? configuredOrigin
  : productionOrigin;
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
  origin,
  basePath,
  whatsappNumber: configuredWhatsApp,
  whatsappReady: hasWhatsAppNumber,
  phoneDisplay: "+44 7528 862843",
  email: "stevenjamescraig39@gmail.com",
  areaServed: "Edinburgh and journeys beyond the city",
  routes: ["/", "/private-hire", "/airport-transfers", "/tours", "/contact"],
  bookingMessages: {
    general:
      "Hi Stevie, I'd like to arrange a journey. My pickup, destination, date, time and passenger details are:",
    privateHire:
      "Hi Stevie, I'd like to arrange private hire. My pickup, destination, date, time and passenger details are:",
    airport:
      "Hi Stevie, I'd like to arrange an airport transfer. My pickup or drop-off, date, time, flight number, passenger and luggage details are:",
    tour:
      "Hi Stevie, I'd like to discuss a private tour. My preferred date, starting point, passenger numbers and interests are:",
  },
} as const;

export type BookingKind = keyof typeof siteConfig.bookingMessages;

export function siteAsset(path: `/${string}`) {
  return `${siteConfig.basePath}${path}`;
}

export function siteImageSrcSet(
  path: `/images/${string}.webp`,
  widths: readonly number[],
) {
  const originalWidth = widths.at(-1);
  const base = path.slice(0, -".webp".length);

  return widths
    .map((width) => {
      const imagePath =
        width === originalWidth
          ? path
          : (`${base}-${width}.webp` as `/images/${string}.webp`);
      return `${siteAsset(imagePath)} ${width}w`;
    })
    .join(", ");
}

export function siteUrl(path: `/${string}` = "/") {
  const relativePath = path.replace(/^\/+/, "");
  return new URL(relativePath, `${siteConfig.origin}/`).toString();
}

export function sitePageUrl(path: `/${string}` = "/") {
  const relativePath = path.replace(/^\/+|\/+$/g, "");
  return new URL(relativePath ? `${relativePath}/` : "", `${siteConfig.origin}/`).toString();
}

export function telephoneHref() {
  return `tel:+${siteConfig.whatsappNumber}`;
}

export function emailHref() {
  return `mailto:${siteConfig.email}`;
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
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const absoluteUrl = sitePageUrl(path);
  const shareImage = siteUrl("/og.jpg");

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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

type StructuredDataFaq = {
  question: string;
  answer: string;
};

export function structuredData(faqs: readonly StructuredDataFaq[] = []) {
  const homeUrl = sitePageUrl("/");
  const organizationId = `${homeUrl}#organization`;
  const serviceId = `${homeUrl}#taxi-service`;
  const websiteId = `${homeUrl}#website`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: homeUrl,
      description: siteConfig.description,
      telephone: `+${siteConfig.whatsappNumber}`,
      email: siteConfig.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${siteConfig.whatsappNumber}`,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: "English",
      },
    },
    {
      "@type": "TaxiService",
      "@id": serviceId,
      name: siteConfig.name,
      url: homeUrl,
      image: siteUrl("/og.jpg"),
      description: siteConfig.description,
      telephone: `+${siteConfig.whatsappNumber}`,
      email: siteConfig.email,
      areaServed: [
        {
          "@type": "City",
          name: "Edinburgh",
        },
        {
          "@type": "AdministrativeArea",
          name: "Scotland",
        },
      ],
      serviceType: [
        "Private hire",
        "Edinburgh Airport transfers",
        "Long-distance journeys",
        "Bespoke private tours",
      ],
      provider: { "@id": organizationId },
      providerMobility: "dynamic",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: homeUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": organizationId },
      inLanguage: "en-GB",
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${homeUrl}#frequently-asked-questions`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
