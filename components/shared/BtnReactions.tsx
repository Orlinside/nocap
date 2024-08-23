"use client";
import React, { startTransition, useEffect, useState } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button } from "../ui/button";
import {
  addOrRemoveReaction,
  getReactions,
} from "@/lib/actions/reactions.actions";
import Link from "next/link";

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
  console.log(reactions);

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
        throw new Error("Vous devez être connecté pour réagir à une photo");
      }

      startTransition(async () => {
        const response = await addOrRemoveReaction({
          photoId,
          userId,
          reactionType,
        });
        const reactions = await getReactions(photoId);
        console.log("Objet REACTION", reactions);

        setReactions(reactions);
        setIsReaction(!isReact);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <Link href="/connexion" className="button">
            Like ({countReactions("LIKE")})
          </Link>
          <Link href="/connexion" className="button">
            Fire ({countReactions("FIRE")})
          </Link>
          <Link href="/connexion" className="button">
            Pouce ({countReactions("THUMBS_UP")})
          </Link>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => handleReaction(photoId, userId ?? "", "LIKE")}
            className={userReactions.LIKE ? "bg-orange-500" : ""}
          >
            Like ({countReactions("LIKE")})
          </Button>
          <Button
            onClick={() => handleReaction(photoId, userId ?? "", "FIRE")}
            className={userReactions.FIRE ? "bg-orange-500" : ""}
          >
            Fire ({countReactions("FIRE")})
          </Button>
          <Button
            onClick={() => handleReaction(photoId, userId ?? "", "THUMBS_UP")}
            className={userReactions.THUMBS_UP ? "bg-orange-500" : ""}
          >
            Pouce ({countReactions("THUMBS_UP")})
          </Button>
        </div>
      )}
    </div>
  );
};
