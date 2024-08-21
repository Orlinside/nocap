import Image from "next/image";
import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getAllParties } from "@/lib/actions/party.actions";

import { PartyProps } from "@/types";

export default async function Home() {
  //! Récupérer l'ID de la personnne connecté pour afficher les events auxquels il est abonné
  const user = await currentUser();
  const userId = user?.id;

  //! Récupérer les soirées et leurs photos
  const response = await getAllParties();
  let parties: PartyProps[] = [];

  if (response instanceof NextResponse) {
    const data = await response.json();
    if (Array.isArray(data)) {
      parties = data;
    }
  } else if (Array.isArray(response)) {
    parties = response;
  }

  console.log(parties);

  return (
    <section className="wrapper bg-dark h-screen">
      {user && <p>{JSON.stringify(user)} aa</p>}
    </section>
  );
}
