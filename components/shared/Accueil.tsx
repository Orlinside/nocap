"use client";
import { PartyProps } from "@/types";
import { Photo } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

export const Accueil = ({ parties }: any) => {
  //! Filtrer les soirées pour ne garder que celles qui ont des photos
  const partiesWithPhotos = parties.filter(
    (party: PartyProps) => party.photos && party.photos.length > 0
  );

  //! Trier les soirées par date pour obtenir la plus récente
  partiesWithPhotos.sort(
    (a: any, b: any) =>
      new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
  );

  //! État pour gérer l'affichage des soirées
  const [visibleParties, setVisibleParties] = useState(
    partiesWithPhotos.slice(0, 1)
  );

  //! Fonction pour charger plus de soirées
  const loadMoreParties = () => {
    const currentLength = visibleParties.length;
    const moreParties = partiesWithPhotos.slice(
      currentLength,
      currentLength + 1
    );
    setVisibleParties([...visibleParties, ...moreParties]);
  };

  return (
    <section className="wrapper bg-dark h-screen">
      {visibleParties.map((party: PartyProps, index: any) => (
        <div key={index} className="">
          <h2>{party.name}</h2>
          <div className="grid grid-cols-3 gap-4 items-center">
            {party.photos.map((photo: Photo, idx: any) => (
              <div key={idx} className="relative bg-black">
                <Image
                  src={photo.url}
                  alt={photo.url}
                  width={500}
                  height={300}
                  className=""
                />
                <div className="absolute right-2 bottom-2">
                  <Button className="text-[0.8rem]">Like</Button>
                  <Button className="text-[0.8rem]">Fire</Button>
                  <Button className="text-[0.8rem]">Pouce</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {visibleParties.length < partiesWithPhotos.length && (
        <Button className="button" onClick={loadMoreParties}>
          Charger plus de soirées
        </Button>
      )}
    </section>
  );
};
