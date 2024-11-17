import { NextResponse } from "next/server";

import { getAllPartiesWithPhotos } from "@/lib/actions/party.actions";

import { Accueil } from "@/components/shared/Accueil";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil | No Cap",
  description:
    "Page d'accueil de No Cap, présentant la soirée à venir et les soirées passées.",
  openGraph: {
    images: [
      { url: "https://www.nocapdscvr.com/api/opengraph", width: 1200, height: 630 },
    ],
  },
};


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;

  //! Récupérer les soirées et leurs photos
  const partyResponse = await getAllPartiesWithPhotos({
    limit: 1,
    page,
  });

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

  return (
    <>
      <section className="h-screen w-screen overflow-x-hidden">
        {/* {user && <p>{JSON.stringify(user)}</p>} */}
        <Accueil
          party={party.data}
          totalPages={party.totalPages}
          limit={1}
          page={page}
          urlParamName={""}
        />
      </section>
    </>
  );
}
