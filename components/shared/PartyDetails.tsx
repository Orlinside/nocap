import Image from "next/image";
import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getPartyById } from "@/lib/actions/party.actions";

import { PhotoForm } from "../admin/PhotoForm";
import { DeleteConfirmationPhoto } from "../admin/DeleteConfirmationPhoto";
import { DeleteConfirmation } from "../admin/DeleteConfirmation";
import { PartyForm } from "../admin/PartyForm";

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
    try {
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        if (data && typeof data === "object" && "id" in data) {
          party = data as Party;
        }
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else if (response && typeof response === "object" && "id" in response) {
    party = response as Party;
  }

  const user = await currentUser();
  const userId = user?.id;

  if (!party) {
    return (
      <section className="wrapper">
        <div className="mt-20"></div>
        <p className="text-white">
          Les données sont introuvables ou supprimées.
        </p>
      </section>
    );
  }

  const formattedDate = new Date(party.startDateTime).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  //! Vérifier si l'event est passé ou pas :
  // const currentDateTime = new Date();
  // const startDateTime = new Date(party.startDateTime);
  // const endDateTime = new Date(party.endDateTime);
  // const isPastEvent = currentDateTime > endDateTime;
  // const isEnCours =
  //   currentDateTime >= startDateTime && currentDateTime <= endDateTime;

  return (
    <>
      <section className="wrapper">
        <div className="mt-20"></div>
        <div
          className="flex flex-col gap-4 justify-center sm:flex-row
         sm:flex-between"
        >
          <h2 className="uppercase renogare bg-linear-text text-2xl text-center sm:text-left">
            {party.name}{" "}
            <span className="text-xs text-white font-mono">
              {formattedDate}
            </span>
          </h2>
          {/* <Button className="rounded-xl">Ajouter une photo</Button> */}
          <div className="flex gap-4 justify-between items-center sm:flex-row sm:gap-8">
            <PhotoForm
              partyId={party.id}
              userId={userId ?? ""}
              type="Ajouter"
            />
            <PartyForm
              type="Modifier"
              userId={userId}
              party={party}
              partyId={party.id}
            />
            <DeleteConfirmation partyId={party.id} />
          </div>
        </div>
        <div className="wrapper">
          {party.photos.length === 0 ? (
            <p className="text-white font-mono">
              Aucune photo disponible pour cette soirée
            </p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-8">
              {party.photos.map((photo: Photo) => (
                <div key={photo.id} className="relative bg-black rounded-xl">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={2000}
                    height={2000}
                    className="rounded-xl w-full object-contain"
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
