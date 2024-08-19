import Image from "next/image";

import { currentUser } from "@/lib/auth";

export default async function Home() {
  //! Récupérer l'ID de la personnne connecté pour afficher les events auxquels il est abonné
  const user = await currentUser();
  const userId = user?.id;
  console.log(user);

  return <main className="flex"></main>;
}
