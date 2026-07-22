import type { MetadataRoute } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.launchReady) return [];

  return siteConfig.routes.map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
