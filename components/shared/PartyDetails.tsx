import { getPartyById } from "@/lib/actions/party.actions";
import Image from "next/image";
import Link from "next/link";

export const PartyDetails = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const party = await getPartyById(id);

  console.log(party);

  if (!party) {
    return <div>Party not found</div>;
  }

  //! Vérifier si l'event est passé ou pas :
  const currentDateTime = new Date();
  const startDateTime = new Date(party.startDateTime);
  const endDateTime = new Date(party.endDateTime);
  const isPastEvent = currentDateTime > endDateTime;
  const isEnCours =
    currentDateTime >= startDateTime && currentDateTime <= endDateTime;

  return (
    <>
      <section>
        <div>
          <h2>{party.name}</h2>
        </div>
        <div>
          {party.photos.length === 0 ? (
            <p>Aucune photo disponible pour cette soirée</p>
          ) : (
            <div>
              {party.photos.map((photo) => (
                <Image key={photo.id} src={photo.url} alt={photo.alt} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
