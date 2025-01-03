/**
 * Composent réutilisable pour afficher une page en fonction du rôle de l'utilisateur
 */

// "use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";
// import { Form } from "react-hook-form";
import { FormError } from "./Card/FormError";
import { currentRole } from "@/lib/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  // const role = useCurrentRole();
  const role = await currentRole();

  if (role === null) {
    // Chargement des données
    return (
      <div className="mt-28 sm:mt-20 h-full flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (role !== allowedRole) {
    return (
      <div className="mt-28 sm:mt-20 h-full flex items-center justify-center">
        <FormError message="Cette page n'est pas accessible." />
      </div>
    );
  }

  return <>{children}</>;
};
