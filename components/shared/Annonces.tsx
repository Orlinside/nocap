import { getLastParty } from "@/lib/actions/party.actions";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { Bandeau } from "./Bandeau";

const defaultCountdown = {
  minutes: "OO",
  heures: "OO",
  jours: "OO",
};

export const Annonces = async () => {
  const lastParty = await getLastParty();

  // if (lastParty instanceof NextResponse) {
  //   console.error("Error fetching last party:", lastParty);
  //   return (
  //     <div className="w-full h-10 flex items-center gap-20 bg-primary z-10">
  //       {/* Handle error case */}
  //     </div>
  //   );
  // }

  return (
    <div className="w-[30rem] h-auto flex items-center justify-center gap-20 bg-transparent">
      <Bandeau lastParty={lastParty} />
    </div>
  );
};
