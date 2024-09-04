import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";

import { getAllUsers } from "@/lib/actions/user.actions";
import { DeleteConfirmationUser } from "@/components/admin/DeleteConfirmationUser";

export default async function GestionUsers() {
  const user = await currentUser();

  const users = await getAllUsers();

  if (!users) {
    return (
      <RoleGate allowedRole={Role.admin}>
        <section className="wrapper">
          <div className="mt-28 sm:mt-20"></div>
          <div className=" flex justify-between items-center">
            <h1 className="uppercase renogare bg-linear-text">
              Liste des utilisateurs
            </h1>
          </div>
        </section>
        <section className="wrapper text-white">
          <p>Aucun utilisateur trouvé.</p>
        </section>
      </RoleGate>
    );
  }

  return (
    <RoleGate allowedRole={Role.admin}>
      <section className="wrapper">
        <div className="mt-28 sm:mt-20"></div>
        <div className=" flex justify-between items-center">
          <h1 className="uppercase renogare bg-linear-text">
            Liste des utilisateurs ({users.length})
          </h1>
        </div>
      </section>

      <section className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => {
          return (
            <div key={user.email} className="border border-white/60 rounded-xl">
              <div className="flex justify-between items-center hover:bg-white/20 p-2 rounded-xl">
                <p className="col-span-3 text-white text-xl font-bold renogare">
                  {user.name}
                </p>
                <span className="text-sm text-white font-bold">
                  {user.email}
                </span>
                <DeleteConfirmationUser userId={user.id} />
              </div>
            </div>
          );
        })}
      </section>
    </RoleGate>
  );
}
