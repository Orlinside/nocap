"use client";

import { useTransition, useState } from "react";
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
import { toast } from "sonner";

import { MdDeleteForever } from "react-icons/md";
import { FaExclamationTriangle, FaImage } from "react-icons/fa";

export const DeleteConfirmationPhoto = ({ photoId }: { photoId: string }) => {
  let [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    startTransition(async () => {
      toast.info("Suppression de la photo en cours...");

      const result = await deletePhoto(photoId);

      // Vérifier si c'est un NextResponse
      if (result && typeof result === "object" && "status" in result) {
        if (result.status === 204) {
          // Succès
          toast.success("Photo supprimée avec succès !");

          // Fermer la modal après un délai
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1000);
        } else {
          // Erreur avec status code
          console.error(
            "Erreur lors de la suppression, status:",
            result.status
          );
          toast.error("Erreur lors de la suppression de la photo");
        }
      } else {
        // Cas imprévu
        console.error("Réponse inattendue:", result);
        toast.error("Erreur lors de la suppression de la photo");
      }
    });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger
        className="group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 backdrop-blur-sm rounded-xl p-2 transition-all duration-300">
          <MdDeleteForever
            size={18}
            className="text-red-400 group-hover:text-red-300 transition-colors"
          />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md mx-4">
        <div className="relative">
          {/* Loading Overlay */}
          {isPending && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mx-auto"></div>
                <div className="text-white font-mono">
                  <p className="text-lg renogare tracking-wider text-red-400">
                    SUPPRESSION...
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    Suppression de la photo en cours
                  </p>
                </div>
              </div>
            </div>
          )}

          <AlertDialogHeader className="text-center pb-4">
            <div className="mx-auto mb-4 bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-400 text-2xl" />
            </div>
            <AlertDialogTitle className="text-white renogare text-xl font-bold tracking-wider">
              SUPPRIMER LA PHOTO
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70 font-mono text-sm mt-3">
              Cette action est irréversible. La photo sera supprimée
              définitivement de la galerie et du stockage.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-3 pt-4">
            <AlertDialogCancel
              disabled={isPending}
              className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                  <span>SUPPRESSION...</span>
                </div>
              ) : (
                "SUPPRIMER"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
