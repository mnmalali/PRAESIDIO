import type { MetadataRoute } from "next";
import { routes, origin } from "../lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return origin
    ? routes.map((path) => ({ url: new URL(path, origin).href }))
    : [];
}
