import type { MetadataRoute } from "next";

const BASE_URL = "https://www.nocap.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/commentaires",
          "/contact",
          "/merch",
          "/mentions-legales",
          "/politique-de-confidentialite",
        ],
        disallow: [
          "/admin",
          "/api",
          "/compte",
          "/connexion",
          "/inscription",
          "/reset",
          "/nouveau-mot-de-passe",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
