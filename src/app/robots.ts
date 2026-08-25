import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Generates `/robots.txt`.
 *
 * This page is the landing page of a paid recruiting funnel and is meant to be
 * reached through the ad, not through search — the original site carried a
 * `noindex` meta tag for the same reason. `siteConfig.noindex` is the one
 * switch: it drives this file and the `robots` block in the metadata
 * generator, so the two can never disagree.
 *
 * The sitemap is deliberately omitted while noindexed — advertising a sitemap
 * for pages you are asking crawlers to skip is a contradictory signal.
 */
export default function robots(): MetadataRoute.Robots {
  if (siteConfig.noindex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
