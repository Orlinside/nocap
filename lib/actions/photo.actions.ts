"use server";
import { db } from "../db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { Role } from "@prisma/client";
import { AddPhotoToPartyParams } from "@/types";
import { currentRole } from "../auth";
import { getPartyById } from "./party.actions";

//! ADD PHOTO TO PARTY
export const addPhotosToParty = async ({
  photo,
  partyId,
  userId,
}: AddPhotoToPartyParams) => {
  try {
    const role = await currentRole();

    if (role !== Role.admin) {
      return new NextResponse(null, { status: 403 });
    }

    const party = await getPartyById(partyId);

    if (!party) {
      return new NextResponse(null, { status: 404 });
    }

    const newPhoto = await db.photo.create({
      data: {
        ...photo,
        partyId,
        userId,
      },
    });

    revalidatePath(`/admin/party/${partyId}`);

    return newPhoto;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! DELETE PHOTO
export const deletePhoto = async (photoId: string) => {
  try {
    const role = await currentRole();

    if (role !== Role.admin) {
      return new NextResponse(null, { status: 403 });
    }

    const photo = await db.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      return new NextResponse(null, { status: 404 });
    }

    // Extraire la clé du fichier depuis l'URL UploadThing
    const fileKey = photo.url.split('/').pop();
    
    if (fileKey) {
      // Supprimer le fichier d'UploadThing
      const utapi = new UTApi();
      try {
        await utapi.deleteFiles([fileKey]);
        console.log(`Fichier supprimé d'UploadThing: ${fileKey}`);
      } catch (uploadthingError) {
        console.error("Erreur lors de la suppression du fichier UploadThing:", uploadthingError);
        // On continue même si la suppression UploadThing échoue
      }
    }

    // Supprimer l'entrée de la base de données
    await db.photo.delete({
      where: {
        id: photoId,
      },
    });

    revalidatePath(`/admin/party/${photo.partyId}`);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la photo:", error);
    return new NextResponse(null, { status: 500 });
  }
};
