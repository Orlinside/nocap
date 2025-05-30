import { getLastParty } from "@/lib/actions/party.actions";
import { Bandeau } from "./Bandeau";

export const Annonces = async () => {
  const lastParty = await getLastParty();

  return (
    <div className="hidden md:flex w-full h-fit items-center justify-center gap-20 bg-black/50 shadowXL">
      <Bandeau lastParty={lastParty} />
    </div>
  );
};
