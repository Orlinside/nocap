import { getLastParty } from "@/lib/actions/party.actions";
import { Bandeau } from "./Bandeau";

export const Annonces = async () => {
  const lastParty = await getLastParty();

  return (
    <div className="hidden h-fit w-full items-center justify-center gap-20 bg-transparent md:flex">
      <Bandeau lastParty={lastParty} />
    </div>
  );
};
