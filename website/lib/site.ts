import type { Metadata } from "next";

export const repositoryUrl = "https://github.com/mnmalali/PRAESIDIO";

export const routes = [
  "/",
  "/product",
  "/security",
  "/docs",
  "/changelog",
  "/about",
  "/contact",
];
export const origin = process.env.NEXT_PUBLIC_SITE_URL;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | PRAESIDIO AI` },
    description,
    ...(origin
      ? { alternates: { canonical: new URL(path, origin).href } }
      : {}),
    openGraph: {
      title: `${title} | PRAESIDIO AI`,
      description,
      type: "website",
      ...(origin
        ? {
            url: new URL(path, origin).href,
            images: [
              {
                url: new URL("/opengraph-image", origin).href,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
  };
}
