import { getLastParty } from "@/lib/actions/party.actions";
import { BandeauMobile } from "./BandeauMobile";

export const AnnoncesMobile = async () => {
  const lastParty = await getLastParty();

  return (
    <div className="w-full h-auto flex items-center justify-center bg-transparent">
      <BandeauMobile lastParty={lastParty} />
    </div>
  );
};
