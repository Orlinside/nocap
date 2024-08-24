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
      <AlertDialogTrigger className="button px-2">
        <p>Supprimer</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark w-1/3 rounded-sm border-second">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Etes-vous sûr de vouloir supprimer votre commentaire ?
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
                await deleteAdminComment({ commentId, path: pathname });
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
