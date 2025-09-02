import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { FaUser, FaEnvelope, FaUsers } from "react-icons/fa";

import { getAllUsers } from "@/lib/actions/user.actions";
import { DeleteConfirmationUser } from "@/components/admin/DeleteConfirmationUser";

export default async function GestionUsers() {
  const user = await currentUser();

  const users = await getAllUsers();

  if (!users) {
    return (
      <RoleGate allowedRole={Role.admin}>
        <section className="wrapper min-h-screen">
          <div className="mt-28 sm:mt-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl text-white renogare font-bold tracking-widest mb-2">
                  UTILISATEURS
                </h1>
                <p className="text-white/70 font-mono text-lg">
                  Gestion des comptes utilisateurs
                </p>
              </div>
            </div>

            <div className="text-center py-20">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <FaUsers className="text-6xl text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-4">
                  AUCUN UTILISATEUR
                </h3>
                <p className="text-white/60 font-mono">
                  Aucun utilisateur trouvé dans la base de données
                </p>
              </div>
            </div>
          </div>
        </section>
      </RoleGate>
    );
  }

  return (
    <RoleGate allowedRole={Role.admin}>
      <section className="wrapper min-h-screen">
        <div className="mt-28 sm:mt-32">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl text-white renogare font-bold tracking-widest mb-2">
                UTILISATEURS
              </h1>
              <p className="text-white/70 font-mono text-lg">
                Gestion des comptes utilisateurs
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2">
              <span className="text-white/60 font-mono text-sm">
                {users.length} utilisateur{users.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {users.map((userData) => {
              return (
                <div key={userData.email} className="group">
                  <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient p-2 rounded-lg">
                          <FaUser className="text-white text-lg" />
                        </div>
                        <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-mono">
                          ACTIF
                        </div>
                      </div>
                      <DeleteConfirmationUser userId={userData.id} />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl text-white renogare font-bold tracking-wider">
                          {userData.name}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2 text-white/60">
                        <FaEnvelope className="text-sm" />
                        <span className="font-mono text-sm">
                          {userData.email}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="text-white/40 font-mono text-xs">
                          ID: {userData.id.slice(0, 8)}...
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </RoleGate>
  );
}
