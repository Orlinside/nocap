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

import { MdDeleteForever } from "react-icons/md";

export const DeleteConfirmation = ({ partyId }: { partyId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="">
        <MdDeleteForever size={25} className="hover:text-red-700" />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-2/3 sm:w-1/2 bg-dark rounded-xl border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare">
            Etes-vous sûr de vouloir supprimer cette soirée ?
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
                await deleteParty({ partyId, path: pathname });
              })
            }
            className="text-white renogare bg-gradient rounded-xl"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
