import Link from "next/link";
import { NextResponse } from "next/server";

import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";

import { getAllParties } from "@/lib/actions/party.actions";
import { PartyProps } from "@/types";

import { PartyForm } from "@/components/admin/PartyForm";
import { FaCalendarAlt, FaImages, FaArrowRight } from "react-icons/fa";

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
      <section className="wrapper min-h-screen">
        <div className="mt-28 sm:mt-32">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl text-white renogare font-bold tracking-widest mb-2">
                SOIRÉES
              </h1>
              <p className="text-white/70 font-mono text-lg">
                Gérez vos événements et leurs contenus
              </p>
            </div>
            <PartyForm userId={user?.id} type="Créer" />
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {parties.map((party: PartyProps) => {
              const formattedDate = new Date(
                party.startDateTime
              ).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const formattedDateShort = new Date(
                party.startDateTime
              ).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              });

              return (
                <Link
                  key={party.id}
                  href={`/admin/party/${party.id}`}
                  className="group"
                >
                  <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient p-2 rounded-lg">
                          <FaCalendarAlt className="text-white text-lg" />
                        </div>
                        <div className="bg-black/40 text-xs px-2 py-1 rounded-full text-white/80 font-mono">
                          {formattedDateShort}
                        </div>
                      </div>
                      <FaArrowRight className="text-white/40 group-hover:text-white/80 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl text-white renogare font-bold tracking-wider mb-2 line-clamp-2">
                        {party.name}
                      </h3>
                      <p className="text-white/60 font-mono text-sm mb-3">
                        {formattedDate}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-white/40 font-mono text-xs">
                        <div className="flex items-center space-x-1">
                          <FaImages className="text-xs" />
                          <span>{party.photos?.length || 0} photos</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          <span>Actif</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty state */}
          {parties.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <FaCalendarAlt className="text-6xl text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-4">
                  AUCUNE SOIRÉE
                </h3>
                <p className="text-white/60 font-mono mb-6">
                  Créez votre première soirée pour commencer
                </p>
                <PartyForm userId={user?.id} type="Créer" />
              </div>
            </div>
          )}
        </div>
      </section>
    </RoleGate>
  );
}
