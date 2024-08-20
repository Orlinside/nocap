import { PartyDetails } from "@/components/shared/PartyDetails";
import React from "react";

export default function PartyDetailPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <PartyDetails params={{ id }} searchParams={searchParams} />
    </>
  );
}
