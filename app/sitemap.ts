import type { MetadataRoute } from "next";
import { business } from "./business";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: business.siteUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }];
}
