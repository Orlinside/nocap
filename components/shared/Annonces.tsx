import { getLastParty } from "@/lib/actions/party.actions";
import { Bandeau } from "./Bandeau";

export const Annonces = async () => {
  const lastParty = await getLastParty();

  return (
    <div className="w-full h-auto flex items-center justify-center gap-20 bg-transparent">
      <Bandeau lastParty={lastParty} />
    </div>
  );
};
