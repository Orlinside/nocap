"use client";

import { useTransition } from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deletePhoto } from "@/lib/actions/photo.actions";

export const DeleteConfirmationPhoto = ({ photoId }: { photoId: string }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="button px-2">
        <Image
          src="/assets/icons/delete.svg"
          alt="edit"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark rounded-sm border-second">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Etes-vous sûr de vouloir supprimer cette photo ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-second">
            La suppression est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-white">Annuler</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deletePhoto(photoId);
              })
            }
            className="text-white rubik bg-second hover:bg-third"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
