import { PartyForm } from "@/components/admin/PartyForm";
import { currentRole, currentUser } from "@/lib/auth";

import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";

export default async function CreatePartyPage() {
  const user = await currentUser();
  const role = currentRole();

  return (
    <>
      <RoleGate allowedRole={Role.admin}>
        <section>
          <div className="wrapper">
            <h2 className="uppercase my-4">Créer une nouvelle soirée</h2>
            <div className="flex-center">
              <PartyForm userId={user?.id} type="Créer" />
            </div>
          </div>
        </section>
      </RoleGate>
    </>
  );
}
