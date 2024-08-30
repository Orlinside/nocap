"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

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

import { deleteAdminComment } from "@/lib/actions/comment.actions";

export const DeleteConfirmationCommentUser = ({
  commentId,
}: {
  commentId: string;
}) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="">
        <p className="text-[0.8rem] font-mono">Supprimer</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark w-1/3 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare">
            Etes-vous sûr de vouloir supprimer votre commentaire ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            La suppression est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-white rounded-xl">
            Annuler
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteAdminComment({ commentId, path: pathname });
              })
            }
            className="text-white renogare bg-primary hover:bg-primary/80 rounded-xl"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
