import Link from "next/link";
import { NextResponse } from "next/server";

import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";

import { getAllParties } from "@/lib/actions/party.actions";
import { PartyProps } from "@/types";

import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";
import { PartyForm } from "@/components/admin/PartyForm";

export default async function PartyPage() {
  const user = await currentUser();

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
      <section className="wrapper">
        <div className="mt-20"></div>
        <div className=" flex justify-between items-center">
          <h1 className="uppercase renogare bg-linear-text">
            Liste des soirées
          </h1>
          <PartyForm userId={user?.id} type="Créer" />
        </div>
      </section>
      <section className="wrapper w-full flex flex-col gap-4">
        {parties.map((party: PartyProps) => {
          const formattedDate = new Date(
            party.startDateTime
          ).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <Link
              key={party.id}
              href={`/admin/party/${party.id}`}
              className="bg-gray-600 rounded-xl"
            >
              <div className="flex justify-between items-center hover:bg-white/20 p-2 rounded-xl">
                <p className="text-white col-span-3 text-xl font-bold">
                  {party.name}
                </p>
                <span className="text-sm text-white">{formattedDate}</span>
                {/* <DeleteConfirmation partyId={party.id} /> */}
              </div>
            </Link>
          );
        })}
      </section>
    </RoleGate>
  );
}
