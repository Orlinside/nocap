"use client";
import React, { startTransition, useEffect, useState } from "react";

import {
  addOrRemoveReaction,
  getReactions,
} from "@/lib/actions/reactions.actions";

import { toast } from "sonner";
import { Button } from "../ui/button";

import { BsSuitHeartFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";

export const BtnReactions = ({
  photoId,
  reaction,
  user,
  isReact,
}: {
  photoId: string;
  reaction: any;
  user: any;
  isReact: boolean;
}) => {
  const userId = user?.id;

  // Récupération des réactions total
  const [reactions, setReactions] = useState(reaction);

  // Type de réactions de l'utilisateur
  const [userReactions, setUserReactions] = useState<{
    [key: string]: boolean;
  }>({
    LIKE: false,
    FIRE: false,
    THUMBS_UP: false,
  });

  useEffect(() => {
    const userReactionTypes = reactions
      .filter((r: any) => r.userId === userId)
      .map((r: any) => r.type);
    setUserReactions({
      LIKE: userReactionTypes.includes("LIKE"),
      FIRE: userReactionTypes.includes("FIRE"),
      THUMBS_UP: userReactionTypes.includes("THUMBS_UP"),
    });
  }, [reactions, userId]);

  // Nombre de réactions par type
  const countReactions = (type: string) => {
    return reactions.filter((r: any) => r.type === type).length;
  };

  const [isReaction, setIsReaction] = useState(isReact);

  const handleReaction = (
    photoId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      if (userId === null || userId === "") {
        toast.error("Vous devez être connecté pour réagir à une photo");
        return;
      }

      startTransition(async () => {
        const response = await addOrRemoveReaction({
          photoId,
          userId,
          reactionType,
        });
        const reactions = await getReactions(photoId);

        setReactions(reactions);
        setIsReaction(!isReact);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex sm:flex-col sm:gap-2 bg-transparent backdrop-blur-[3px] sm:backdrop-blur-none rounded-xl">
      {/* <Button
        onClick={() => handleReaction(photoId, userId ?? "", "FIRE")}
        className={
          userReactions.FIRE
            ? "flex gap-1 items-center justify-center text-orange-600 bg-transparent hover:text-orange-700 hover:bg-transparent"
            : "flex gap-1 items-center justify-center text-white bg-transparent hover:text-orange-600 hover:bg-transparent"
        }
      >
        <FaFire className="text-base sm:text-2xl" />
        <span className="renogare text-white text-[0.7rem] w-4">
          {countReactions("FIRE")}
        </span>
      </Button> */}
      <Button
        onClick={() => handleReaction(photoId, userId ?? "", "LIKE")}
        className={
          userReactions.LIKE
            ? "flex gap-1 items-center justify-center text-red-600 bg-transparent hover:text-red-700 hover:bg-transparent"
            : "flex gap-1 items-center justify-center text-white bg-transparent hover:text-red-600 hover:bg-transparent"
        }
      >
        <BsSuitHeartFill className="text-base sm:text-2xl" />
        <span className="renogare text-white text-[0.7rem] w-4">
          {countReactions("LIKE")}
        </span>
      </Button>
      {/* <Button
        onClick={() => handleReaction(photoId, userId ?? "", "THUMBS_UP")}
        className={
          userReactions.THUMBS_UP
            ? "flex gap-1 items-center justify-center text-primary bg-transparent hover:text-primary/80 hover:bg-transparent"
            : "flex gap-1 items-center justify-center text-white bg-transparent hover:text-primary/80 hover:bg-transparent"
        }
      >
        <FaThumbsUp className="text-base sm:text-2xl" />
        <span className="renogare text-white text-[0.7rem] w-4">
          {countReactions("THUMBS_UP")}
        </span>
      </Button> */}
    </div>
  );
};
