import type { MetadataRoute } from "next";
import { siteConfig, sitePageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.routes.map((route) => ({
    url: sitePageUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/contact" ? 0.6 : 0.8,
  }));
}
