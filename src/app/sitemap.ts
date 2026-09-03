import type { MetadataRoute } from "next";
import { getAllCases, site } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...getAllCases().map(({ study }) => ({
      url: `${site.url}/cases/${study.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
