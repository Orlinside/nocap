import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nocap.fr"),
  title: "No Cap | Photos de soirees et ambiance nightlife",
  description:
    "No Cap partage les plus belles photos de soirees, les ambiances des events et les moments marquants de la communaute.",
  applicationName: "No Cap",
  keywords: [
    "no cap",
    "photos de soiree",
    "nightlife",
    "event",
    "soirée",
    "communaute",
    "galerie photo",
  ],
  authors: [{ name: "No Cap" }],
  creator: "No Cap",
  publisher: "No Cap",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.nocap.fr",
    siteName: "No Cap",
    title: "No Cap | Photos de soirees et ambiance nightlife",
    description:
      "No Cap partage les plus belles photos de soirees, les ambiances des events et les moments marquants de la communaute.",
    images: [
      {
        url: "https://www.nocap.fr/api/opengraph",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No Cap | Photos de soirees et ambiance nightlife",
    description:
      "No Cap partage les plus belles photos de soirees, les ambiances des events et les moments marquants de la communaute.",
    images: ["https://www.nocap.fr/api/opengraph"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="fr">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="9951baf4-c521-49f0-a81a-93b0e1401184"
        ></script>
      </head>

      <SessionProvider session={session}>
        <body className="flex min-h-screen flex-col">
          <div
            data-site-header
            className="sticky top-0 z-[120] w-full shrink-0 bg-transparent"
          >
            <Header />
          </div>

          <main className="flex-1 bg-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_60%)]"></div>
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]"></div>
            {children}
          </main>

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
