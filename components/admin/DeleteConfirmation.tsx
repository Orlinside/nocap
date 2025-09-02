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
import { FaExclamationTriangle } from "react-icons/fa";
import { revalidatePath } from "next/cache";

export const DeleteConfirmation = ({ partyId }: { partyId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="group">
        <div className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 backdrop-blur-sm rounded-xl p-2 transition-all duration-300">
          <MdDeleteForever
            size={20}
            className="text-red-400 group-hover:text-red-300 transition-colors"
          />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md mx-4">
        <AlertDialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-400 text-2xl" />
          </div>
          <AlertDialogTitle className="text-white renogare text-xl font-bold tracking-wider">
            SUPPRIMER LA SOIRÉE
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/70 font-mono text-sm mt-3">
            Cette action est irréversible. Toutes les photos associées seront
            également supprimées définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 pt-4">
          <AlertDialogCancel className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-300 font-mono">
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
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 font-mono font-bold"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
