import Image from "next/image";
import Link from "next/link";

import { getPartyById } from "@/lib/actions/party.actions";
import { PhotoForm } from "../admin/PhotoForm";
import { currentUser } from "@/lib/auth";
import { DeleteConfirmationPhoto } from "../admin/DeleteConfirmationPhoto";
import { DeleteConfirmation } from "../admin/DeleteConfirmation";
import { NextResponse } from "next/server";

interface Photo {
  id: string;
  url: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  partyId: string | null;
  reactions: any[];
}

interface Party {
  id: string;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  photos: Photo[];
}

export const PartyDetails = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const response = await getPartyById(id);
  let party: Party | null = null;

  if (response instanceof NextResponse) {
    const data = await response.json();
    if (data && typeof data === "object" && "id" in data) {
      party = data as Party;
    }
  } else if (response && typeof response === "object" && "id" in response) {
    party = response as Party;
  }

  console.log(party);

  const user = await currentUser();
  const userId = user?.id;

  if (!party) {
    return <div>Party not found</div>;
  }

  //! Vérifier si l'event est passé ou pas :
  // const currentDateTime = new Date();
  // const startDateTime = new Date(party.startDateTime);
  // const endDateTime = new Date(party.endDateTime);
  // const isPastEvent = currentDateTime > endDateTime;
  // const isEnCours =
  //   currentDateTime >= startDateTime && currentDateTime <= endDateTime;

  return (
    <>
      <section>
        <div className="wrapper flex flex-between">
          <h2 className="uppercase text-2xl">{party.name}</h2>
          {/* <Button className="rounded-xl">Ajouter une photo</Button> */}
          <div className="flex gap-8">
            <PhotoForm
              partyId={party.id}
              userId={userId ?? ""}
              type="Ajouter"
            />
            <DeleteConfirmation partyId={party.id} />
          </div>
        </div>
        <div className="wrapper">
          {party.photos.length === 0 ? (
            <p>Aucune photo disponible pour cette soirée</p>
          ) : (
            <div className="flex gap-8">
              {party.photos.map((photo: Photo) => (
                <div key={photo.id} className="relative bg-black">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={2000}
                    height={2000}
                    className="rounded-xl w-[20rem] h-[18rem] object-contain"
                  />
                  <div className="absolute right-2 top-2">
                    <DeleteConfirmationPhoto photoId={photo.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
