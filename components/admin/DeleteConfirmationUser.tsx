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
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";

import { deleteUser } from "@/lib/actions/user.actions";

export const DeleteConfirmationUser = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white">
        <MdDeleteForever size={18} className="hover:text-red-700" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-primary w-full sm:w-1/3 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare">
            Etes-vous sûr de vouloir supprimer cet utilisateur ?
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
                await deleteUser({ userId, path: pathname });
                toast.success("Commentaire supprimé");
              })
            }
            className="text-white renogare bg-gradient hover:bg-primary/80 rounded-xl"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
