import { NextResponse } from "next/server";

import {
  getAllPartiesForHomePage,
  getAllPartiesWithPhotos,
  getLastParty,
} from "@/lib/actions/party.actions";

import { Accueil } from "@/components/shared/Accueil";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil | No Cap",
  description:
    "Decouvrez l'univers No Cap : photos de soirees, moments forts, ambiances et meilleures selections de la communaute.",
  keywords: [
    "accueil no cap",
    "photos de soiree",
    "galerie nightlife",
    "evenement",
    "communaute no cap",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.nocap.fr/",
    siteName: "No Cap",
    title: "Accueil | No Cap",
    description:
      "Decouvrez l'univers No Cap : photos de soirees, moments forts, ambiances et meilleures selections de la communaute.",
    images: [
      { url: "https://www.nocap.fr/api/opengraph", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accueil | No Cap",
    description:
      "Decouvrez l'univers No Cap : photos de soirees, moments forts, ambiances et meilleures selections de la communaute.",
    images: ["https://www.nocap.fr/api/opengraph"],
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;
  const page = Number(pageParam) || 1;

  //! Récupérer les soirées et leurs photos
  const partyResponse = await getAllPartiesWithPhotos({
    limit: 1,
    page,
  });

  const allParties = await getAllPartiesForHomePage();

  const lastParty = await getLastParty();

  // Vérifier si la réponse est une instance de NextResponse : Pour que le code gère correctement les deux types de réponses possibles et évite l'erreur de propriété inexistante.
  if (partyResponse instanceof NextResponse) {
    // Gérer le cas où la réponse est un NextResponse
    return (
      <section className="wrapper bg-dark h-full">
        <p>Erreur lors de la récupération des soirées.</p>
      </section>
    );
  }

  const party = partyResponse;
  const featuredParty = party.data?.[0];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "No Cap",
      url: "https://www.nocap.fr",
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "No Cap",
      url: "https://www.nocap.fr",
      logo: "https://www.nocap.fr/logo/Logo_NoCapR_white.png",
    },
    featuredParty
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: featuredParty.name,
          startDate: featuredParty.startDateTime,
          endDate: featuredParty.endDateTime,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          organizer: {
            "@type": "Organization",
            name: "No Cap",
            url: "https://www.nocap.fr",
          },
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      <section className="h-full w-full overflow-x-hidden">
        {structuredData.map((schema, index) => (
          <script
            key={`jsonld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}

        {/* {user && <p>{JSON.stringify(user)}</p>} */}
        <Accueil
          allParties={allParties}
          party={party.data}
          totalPages={party.totalPages}
          limit={1}
          page={page}
          urlParamName={""}
          lastParty={lastParty}
        />
      </section>
    </>
  );
}
