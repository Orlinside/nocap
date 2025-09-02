import { PartyDetails } from "@/components/shared/PartyDetails";
import { RoleGate } from "@/components/auth/RoleGate";
import { Role } from "@prisma/client";
import React from "react";

export default function PartyDetailPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <RoleGate allowedRole={Role.admin}>
      <PartyDetails params={{ id }} searchParams={searchParams} />
    </RoleGate>
  );
}
