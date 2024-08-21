"use server";
import { db } from "../db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AddReactionToPhotoParams } from "@/types";
import { ReactionType } from "@prisma/client";

export const addOrRemoveReaction = async ({
  photoId,
  userId,
  reactionType,
}: AddReactionToPhotoParams) => {
  try {
    const photo = await db.photo.findUnique({
      where: {
        id: photoId,
      },
    });

    if (!photo) {
      return new NextResponse(null, { status: 404 });
    }

    const reaction = await db.reaction.findFirst({
      where: {
        photoId,
        userId,
      },
    });

    console.log(reaction);

    const validReactionType = reactionType as ReactionType;

    if (reaction) {
      if (reaction.type !== validReactionType) {
        // Si le type de réaction est différent, mettre à jour la réaction
        await db.reaction.update({
          where: {
            id: reaction.id,
          },
          data: {
            type: validReactionType,
          },
        });
      } else {
        // Si le type de réaction est le même, supprimer la réaction
        await db.reaction.delete({
          where: {
            id: reaction.id,
          },
        });
      }
    } else {
      // Si aucune réaction n'existe, creer une nouvelle
      await db.reaction.create({
        data: {
          photoId,
          userId,
          type: validReactionType,
        },
      });
    }

    revalidatePath(`/party/${photo.partyId}`);

    return true;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};
