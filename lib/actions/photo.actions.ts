"use server";
import { db } from "../db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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

    await db.photo.delete({
      where: {
        id: photoId,
      },
    });

    revalidatePath(`/admin/party/${photo.partyId}`);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};
