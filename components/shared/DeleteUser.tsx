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

import { deleteUser } from "@/lib/actions/user.actions";
import { LogoutBtn } from "../auth/LogoutBtn";

export const DeleteUser = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="">
        <p className="text-[0.8rem] font-mono">Supprimer mon compte</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark w-1/3 border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare">
            Etes-vous sûr de vouloir supprimer votre compte ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            La suppression est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-white rounded-xl">
            Annuler
          </AlertDialogCancel>

          <LogoutBtn>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteUser({ userId, path: "/" });

                  toast.success("Votre compte est supprimé");
                })
              }
              className="text-white renogare bg-gradient hover:bg-primary/80 rounded-xl"
            >
              {isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </LogoutBtn>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
