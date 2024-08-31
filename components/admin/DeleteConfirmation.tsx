"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

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

import { deleteParty } from "@/lib/actions/party.actions";

import { MdDeleteForever } from "react-icons/md";
import { revalidatePath } from "next/cache";

export const DeleteConfirmation = ({ partyId }: { partyId: string }) => {
  const router = useRouter();
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
                try {
                  const response = await deleteParty({
                    partyId,
                    path: "/admin/party",
                  });
                  if (!response.ok) {
                    throw new Error("Erreur lors de la suppression de la fête");
                  }
                  toast.success("Party supprimée avec succès");
                  router.push("/admin/party"); // Rediriger vers la page des fêtes
                  revalidatePath("/admin/party"); // Revalider la page des fêtes
                } catch (error) {
                  console.error("Error deleting party:", error);
                  toast.error("Supprimée");
                }
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
