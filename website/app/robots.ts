import type { MetadataRoute } from "next";
import { origin } from "../lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(origin ? { allow: "/" } : { disallow: "/" }) },
    ...(origin ? { sitemap: new URL("/sitemap.xml", origin).href } : {}),
  };
}
