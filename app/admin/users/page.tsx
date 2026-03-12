import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import { FaUsers } from "react-icons/fa";

import { getAllUsers } from "@/lib/actions/user.actions";
import { UsersList } from "@/components/admin/UsersList";

export default async function GestionUsers() {
  const users = await getAllUsers();

  if (!users) {
    return (
      <RoleGate allowedRole={Role.admin}>
        <section className="wrapper min-h-screen">
          <div className="mt-20 sm:mt-24">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="renogare mb-1 text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
                  UTILISATEURS
                </h1>
                <p className="font-mono text-sm text-white/70">
                  Gestion des comptes utilisateurs
                </p>
              </div>
            </div>

            <div className="py-12 text-center">
              <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-black/20 p-8 backdrop-blur-sm">
                <FaUsers className="mx-auto mb-4 text-4xl text-white/30" />
                <h3 className="renogare mb-2 text-xl font-bold tracking-[0.18em] text-white">
                  AUCUN UTILISATEUR
                </h3>
                <p className="font-mono text-sm text-white/60">
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
        <div className="mt-20 sm:mt-24">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="renogare mb-1 text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
                UTILISATEURS
              </h1>
              <p className="font-mono text-sm text-white/70">
                Gestion des comptes utilisateurs
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-xs text-white/60">
                {users.length} utilisateur{users.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Users List */}
          <UsersList users={users} />
        </div>
      </section>
    </RoleGate>
  );
}
