import Image from "next/image";
import { NextResponse } from "next/server";
import { FaCalendarAlt, FaImages, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

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
      <section className="wrapper min-h-screen">
        <div className="mt-28 sm:mt-32">
          <div className="text-center py-20">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <FaCalendarAlt className="text-6xl text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl text-white renogare font-bold tracking-widest mb-4">
                SOIRÉE INTROUVABLE
              </h3>
              <p className="text-white/60 font-mono">
                Les données sont introuvables ou supprimées
              </p>
            </div>
          </div>
        </div>
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
    <section className="wrapper min-h-screen">
      <div className="mt-28 sm:mt-32">
        {/* Header Section */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Party Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient p-3 rounded-lg">
                  <FaCalendarAlt className="text-white text-xl" />
                </div>
                <div className="bg-black/40 text-sm px-3 py-1 rounded-full text-white/80 font-mono">
                  {formattedDate}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl text-white renogare font-bold tracking-widest mb-4">
                {party.name}
              </h1>
              <div className="flex items-center space-x-4 text-white/60 font-mono">
                <div className="flex items-center space-x-2">
                  <FaImages className="text-sm" />
                  <span>{party.photos.length} photo{party.photos.length > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Événement actif</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
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
        </div>

        {/* Photos Section */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white renogare font-bold tracking-wider">
              GALERIE PHOTOS
            </h2>
            <div className="text-white/60 font-mono text-sm">
              {party.photos.length} élément{party.photos.length > 1 ? 's' : ''}
            </div>
          </div>

          {party.photos.length === 0 ? (
            <div className="text-center py-16">
              <FaImages className="text-5xl text-white/20 mx-auto mb-4" />
              <p className="text-white/60 font-mono text-lg mb-6">
                Aucune photo disponible pour cette soirée
              </p>
              <PhotoForm
                partyId={party.id}
                userId={userId ?? ""}
                type="Ajouter"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {party.photos.map((photo: Photo) => (
                <div 
                  key={photo.id} 
                  className="group relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-3 transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-105"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay with delete button */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl">
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <DeleteConfirmationPhoto photoId={photo.id} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo info */}
                  <div className="mt-3 px-2">
                    <div className="text-white/40 font-mono text-xs">
                      Ajouté le {new Date(photo.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
