import type { MetadataRoute } from "next";
import { getAllCases, site } from "@/content";

/* Файл собирается один раз при сборке — требование статической выгрузки. */
export const dynamic = "force-static";

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
