"use client";
import React, { startTransition, useState } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "../ui/button";
import { addOrRemoveReaction } from "@/lib/actions/reactions.actions";

export const BtnReactions = ({
  photoId,
  nbReaction,
}: {
  photoId: string;
  nbReaction: number;
}) => {
  const user = useCurrentUser();
  const userId = user?.id;

  const [reactions, setReactions] = useState<{ [key: number]: string }>({});
  const [isReact, setIsreact] = useState(false);
  console.log(reactions);

  const handleReaction = (
    photoId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      if (userId === null || userId === "") {
        throw new Error("Vous devez être connecté pour réagir à une photo");
      }
      console.log(reactionType);

      startTransition(async () => {
        const response = await addOrRemoveReaction({
          photoId,
          userId,
          reactionType,
        });
        setReactions({ ...reactions, [photoId]: reactionType });
        setIsreact(!isReact);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => handleReaction(photoId, userId ?? "", "LIKE")}
        className={isReact ? "bg-orange-500" : ""}
      >
        Like
      </Button>
      <Button
        onClick={() => handleReaction(photoId, userId ?? "", "FIRE")}
        className={isReact ? "bg-orange-500" : ""}
      >
        Fire
      </Button>
      <Button
        onClick={() => handleReaction(photoId, userId ?? "", "THUMBS_UP")}
        className={isReact ? "bg-orange-500" : ""}
      >
        Pouce
      </Button>
    </div>
  );
};
