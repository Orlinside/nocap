/**
 * Composent réutilisable pour afficher une page en fonction du rôle de l'utilisateur
 */

"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";
import { Form } from "react-hook-form";
import { FormError } from "./Card/FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <div className="mt-28 sm:mt-20 renogare h-full flex items-center justify-center">
        <FormError message="Cette page n'est pas accessible." />
      </div>
    );
  }

  return <>{children}</>;
};
