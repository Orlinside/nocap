import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import Link from "next/link";

export default function AdminPage() {
  return (
    <RoleGate allowedRole={Role.admin}>
      <section className="wrapper">
        <div className="mt-20"></div>
        <div className="flex flex-col sm:flex-row gap-8 justify-center w-full">
          <Link href="/admin/party" className="w-full">
            <div className="bg-gradient text-white renogare font-bold tracking-widest w-full flex-center py-12 uppercase rounded-xl">
              Gestion des soirées
            </div>
            {/* Nombre de soirées */}
          </Link>
          <Link href="/admin/comments" className="w-full">
            <div className="bg-gradient text-white renogare font-bold tracking-widest w-full flex-center py-12 uppercase rounded-xl">
              Gestion des commentaires
            </div>
            {/* Nombre de commentaires */}
          </Link>
          <Link href="/admin/users" className="w-full">
            <div className="bg-gradient text-white renogare font-bold tracking-widest w-full flex-center py-12 uppercase rounded-xl">
              Gestion des utilisateurs
            </div>
            {/* Nombre d'utilisateurs */}
          </Link>
        </div>
      </section>
    </RoleGate>
  );
}
