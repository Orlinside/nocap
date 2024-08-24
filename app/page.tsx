import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getAllPartiesWithPhotos } from "@/lib/actions/party.actions";

import { Accueil } from "@/components/shared/Accueil";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //! Récupérer l'ID de la personnne connecté pour afficher les events auxquels il est abonné
  const user = await currentUser();
  const userId = user?.id;

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
      <section className="wrapper bg-dark h-screen">
        <p>Erreur lors de la récupération des soirées.</p>
      </section>
    );
  }

  const party = partyResponse;

  return (
    <section className="wrapper bg-dark">
      {user && <p>{JSON.stringify(user)}</p>}
      <Accueil
        party={party.data}
        totalPages={party.totalPages}
        limit={1}
        page={page}
        urlParamName={""}
      />
    </section>
  );
}
