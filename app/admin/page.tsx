import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import Link from "next/link";
import { FaCalendarAlt, FaComments, FaUsers } from "react-icons/fa";

export default function AdminPage() {
  return (
    <RoleGate allowedRole={Role.admin}>
      <section className="wrapper min-h-screen">
        <div className="mt-28 sm:mt-32">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl text-white renogare font-bold tracking-widest mb-4">
              ADMINISTRATION
            </h1>
            <p className="text-white/70 font-mono text-lg">
              Gérez votre plateforme depuis ce tableau de bord
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Gestion des soirées */}
            <Link href="/admin/party" className="group">
              <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-64 flex flex-col justify-between transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <FaCalendarAlt className="text-4xl text-white/80 group-hover:text-white transition-colors" />
                  <div className="bg-gradient text-xs px-3 py-1 rounded-full text-white renogare tracking-wider">
                    ADMIN
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-2">
                    SOIRÉES
                  </h3>
                  <p className="text-white/60 font-mono text-sm mb-4">
                    Créez, modifiez et gérez vos événements
                  </p>

                  {/* Stats placeholder */}
                  <div className="flex items-center text-white/40 font-mono text-xs">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Actives cette semaine
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
              </div>
            </Link>

            {/* Gestion des commentaires */}
            <Link href="/admin/comments" className="group">
              <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-64 flex flex-col justify-between transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <FaComments className="text-4xl text-white/80 group-hover:text-white transition-colors" />
                  <div className="bg-gradient text-xs px-3 py-1 rounded-full text-white renogare tracking-wider">
                    MODÉRATION
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-2">
                    COMMENTAIRES
                  </h3>
                  <p className="text-white/60 font-mono text-sm mb-4">
                    Modérez et validez les commentaires
                  </p>

                  {/* Stats placeholder */}
                  <div className="flex items-center text-white/40 font-mono text-xs">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    En attente de validation
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
              </div>
            </Link>

            {/* Gestion des utilisateurs */}
            <Link href="/admin/users" className="group">
              <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-64 flex flex-col justify-between transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <FaUsers className="text-4xl text-white/80 group-hover:text-white transition-colors" />
                  <div className="bg-gradient text-xs px-3 py-1 rounded-full text-white renogare tracking-wider">
                    USERS
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-2">
                    UTILISATEURS
                  </h3>
                  <p className="text-white/60 font-mono text-sm mb-4">
                    Gérez les comptes utilisateurs
                  </p>

                  {/* Stats placeholder */}
                  <div className="flex items-center text-white/40 font-mono text-xs">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Inscrits ce mois-ci
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Footer info */}
          <div className="text-center mt-12">
            <p className="text-white/40 font-mono text-sm">
              Tableau de bord administrateur • Version 1.0
            </p>
          </div>
        </div>
      </section>
    </RoleGate>
  );
}

