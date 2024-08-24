import { Button } from "@/components/ui/button";
import Link from "next/link";

import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import { getAllParties } from "@/lib/actions/party.actions";
import { PartyProps } from "@/types";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { NextResponse } from "next/server";

export default async function PartyPage() {
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

  return (
    <RoleGate allowedRole={Role.admin}>
      <section>
        <div className="wrapper flex justify-between items-center">
          <h1>Liste des soirées</h1>
          <Link href="/admin/party/create">
            <Button className="button rounded-xl">Créer une soirée</Button>
          </Link>
        </div>
      </section>
      <section className="wrapper flex flex-col gap-8">
        {parties.map((party: PartyProps) => (
          <div key={party.id} className="flex justify-between">
            <Link href={`/admin/party/${party.id}`}>{party.name}</Link>
            <DeleteConfirmation partyId={party.id} />
          </div>
        ))}
      </section>
    </RoleGate>
  );
}
