"use server";
import { db } from "../db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import {
  CreatePartyParams,
  UpdatePartyParams,
  DeletePartyParams,
  GetPartiesHomeParams,
} from "@/types";

import { getUserById } from "./user.actions";

import { Role } from "@prisma/client";
import { currentRole } from "../auth";

//! CREATE PARTY
export const createParty = async ({
  party,
  userId,
  path,
}: CreatePartyParams) => {
  try {
    const role = await currentRole();

    if (role !== Role.admin) {
      return new NextResponse(null, { status: 403 });
    }

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    const adminUser = await getUserById(userId);

    if (!adminUser) {
      return new NextResponse(null, { status: 404 });
    }

    const newParty = await db.party.create({
      data: {
        ...party,
      },
    });

    revalidatePath(path);

    return newParty;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! UPDATE PARTY
export async function updateParty({ userId, party, path }: UpdatePartyParams) {
  try {
    const partyToUpdate = await db.party.findUnique({
      where: {
        id: party.partyId,
      },
    });

    if (!partyToUpdate) {
      throw new Error("Party not found");
    }

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    const updatedParty = await db.party.update({
      where: { id: party.partyId },
      data: {
        name: party.name,
        startDateTime: party.startDateTime,
        endDateTime: party.endDateTime,
      },
    });

    revalidatePath(path);

    return updatedParty;
  } catch (error) {
    console.error("Error updating party:", error);
    return new NextResponse(null, { status: 500 });
  }
}

//! DELETE PARTY
export async function deleteParty({ partyId, path }: DeletePartyParams) {
  try {
    const partyToDelete = await db.party.findUnique({
      where: {
        id: partyId,
      },
    });

    if (!partyToDelete) {
      throw new Error("Party not found");
    }

    await db.party.delete({
      where: { id: partyId },
    });

    revalidatePath(path);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting party:", error);
    return new NextResponse(null, { status: 500 });
  }
}

//! GET PARTY BY ID
export async function getPartyById(partyId: string) {
  try {
    const party = await db.party.findUnique({
      where: {
        id: partyId,
      },
      include: {
        photos: {
          include: {
            reactions: true, // Inclure les réactions associées à chaque photo
          },
        },
      },
    });

    if (!party) {
      return new NextResponse(null, { status: 404 });
    }

    return party;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

//! GET ALL PARTIES
export async function getAllParties() {
  try {
    const parties = await db.party.findMany({
      include: {
        photos: {
          include: {
            reactions: true, // Inclure les réactions associées à chaque photo
          },
        },
      },
      orderBy: {
        startDateTime: "desc", // Trier par date de début de la plus récente à la plus vieille
      },
    });

    return parties;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

//! GET ALL PARTIES
export async function getAllPartiesWithPhotos({
  limit = 1,
  page,
}: GetPartiesHomeParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const parties = await db.party.findMany({
      where: {
        photos: {
          some: {}, // Filtrer pour ne récupérer que les parties avec des photos
        },
      },
      include: {
        photos: {
          include: {
            reactions: true, // Inclure les réactions associées à chaque photo
          },
          // orderBy: {
          //   reactions: {
          //     _count: "desc", // Trier les photos par nombre de réactions, de la plus réactive à la moins réactive
          //   },
          // },
        },
      },
      orderBy: {
        createdAt: "desc", // Trier par date de création, de la plus récente à la plus ancienne
      },
      skip: skipAmount,
      take: limit,
    });

    // Pour chaque party, réorganiser les photos
    const partiesWithSortedPhotos = parties.map((party) => {
      if (party.photos.length > 1) {
        // Extraire la première photo ajoutée
        const firstPhoto = party.photos.reduce((oldest, photo) => {
          return new Date(photo.createdAt) < new Date(oldest.createdAt)
            ? photo
            : oldest;
        }, party.photos[0]);

        // Filtrer les autres photos
        const restPhotos = party.photos.filter((photo) => photo !== firstPhoto);

        // Combiner la première photo avec les autres triées
        party.photos = [firstPhoto, ...restPhotos];
      }
      return party;
    });

    const partiesCount = await db.party.count({
      where: {
        photos: {
          some: {}, // Filtrer pour ne récupérer que les parties avec des photos
        },
      },
    });

    return {
      data: partiesWithSortedPhotos,
      totalPages: Math.ceil(partiesCount / limit),
    };
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

//! GET LAST PARTY
export const getLastParty = async () => {
  try {
    const lastParty = await db.party.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return lastParty;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};
