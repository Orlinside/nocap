"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
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

import { deleteParty } from "@/lib/actions/party.actions";

export const DeleteConfirmation = ({ partyId }: { partyId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p>Supprimer</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark rounded-sm border-second">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Etes-vous sûr de vouloir supprimer cette soirée ?
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
                await deleteParty({ partyId, path: pathname });
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
