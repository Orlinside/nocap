"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageCompression from "browser-image-compression";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useUploadThing } from "@/lib/uploadthing";
import { addPhotosToParty } from "@/lib/actions/photo.actions";

import { FaPlus, FaImages, FaTrash, FaCompress } from "react-icons/fa";

// Schéma pour plusieurs photos
const multiPhotoFormSchema = z.object({
  photos: z
    .array(
      z.object({
        file: z.any(),
        preview: z.string(),
        compressed: z.any().optional(),
      })
    )
    .min(1, "Au moins une photo est requise"),
});

type PhotoFormProps = {
  partyId: string;
  userId: string;
  type: "Ajouter" | "Modifier";
};

// Fonction pour compresser une image avec browser-image-compression
const compressImageWithLib = async (file: File): Promise<File> => {
  try {
    const options = {
      maxSizeMB: 1, // Taille maximale en MB
      maxWidthOrHeight: 1920, // Dimension maximale
      useWebWorker: true, // Utiliser un web worker pour de meilleures performances
      quality: 0.8, // Qualité de 0 à 1
      initialQuality: 0.8,
    };

    const compressedFile = await imageCompression(file, options);

    // Créer un nouveau fichier avec le nom original
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Erreur lors de la compression:", error);
    // En cas d'erreur, retourner le fichier original
    return file;
  }
};

export const PhotoForm = ({ partyId, type, userId }: PhotoFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  const [photos, setPhotos] = useState<
    Array<{
      file: File;
      preview: string;
      compressed?: File;
      isCompressing?: boolean;
    }>
  >([]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof multiPhotoFormSchema>>({
    resolver: zodResolver(multiPhotoFormSchema),
    defaultValues: { photos: [] },
  });

  // Fonction pour réinitialiser le state quand la modal se ferme
  const resetModalState = () => {
    setPhotos([]);
    form.reset();
    setIsUploading(false);
    setUploadProgress(0);
  };

  // Gérer la fermeture de la modal
  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      // Si on ferme la modal, réinitialiser le state
      resetModalState();
    }
  };

  // Gérer l'ajout de photos
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    for (const file of files) {
      const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Fichier trop volumineux: ${file.name} (max 8MB)`);
        continue;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(`Format non supporté: ${file.name}`);
        continue;
      }

      const preview = URL.createObjectURL(file);
      const newPhoto = {
        file,
        preview,
        isCompressing: true,
      };

      setPhotos((prev) => [...prev, newPhoto]);

      // Synchroniser immédiatement avec le form
      form.setValue("photos", [
        ...photos,
        {
          file,
          preview,
          compressed: undefined,
        },
      ]);

      // Compresser l'image en arrière-plan avec browser-image-compression
      try {
        const compressed = await compressImageWithLib(file);

        setPhotos((prev) =>
          prev.map((photo) =>
            photo.preview === preview
              ? { ...photo, compressed, isCompressing: false }
              : photo
          )
        );

        // Synchroniser avec le form
        const updatedPhotos = photos.map((photo) =>
          photo.preview === preview
            ? { ...photo, compressed, isCompressing: false }
            : photo
        );
        form.setValue(
          "photos",
          updatedPhotos.map((p) => ({
            file: p.file,
            preview: p.preview,
            compressed: p.compressed,
          }))
        );

        // Calculer le pourcentage de compression
        const compressionRatio = (
          ((file.size - compressed.size) / file.size) *
          100
        ).toFixed(1);
        // toast.success(`${file.name} compressée (-${compressionRatio}%)`);
      } catch (error) {
        console.error("Erreur de compression:", error);
        setPhotos((prev) =>
          prev.map((photo) =>
            photo.preview === preview
              ? { ...photo, compressed: file, isCompressing: false }
              : photo
          )
        );
        toast.warning(
          `${file.name}: compression échouée, fichier original conservé`
        );
      }
    }
  };

  // Supprimer une photo de la liste
  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos.splice(index, 1);

      // Synchroniser avec le form
      form.setValue(
        "photos",
        newPhotos.map((p) => ({
          file: p.file,
          preview: p.preview,
          compressed: p.compressed,
        }))
      );

      return newPhotos;
    });
  };

  // Soumission du formulaire
  async function onSubmit(values: z.infer<typeof multiPhotoFormSchema>) {
    if (photos.length === 0) {
      toast.error("Veuillez sélectionner au moins une photo");
      return;
    }

    setIsUploading(true);
    startTransition(async () => {
      try {
        // Filtrer les photos compressées prêtes
        const readyPhotos = photos.filter(
          (p) => p.compressed && !p.isCompressing
        );

        if (readyPhotos.length === 0) {
          toast.error("Veuillez attendre la fin de la compression");
          setIsUploading(false);
          return;
        }

        toast.info(
          `Démarrage de l'upload de ${readyPhotos.length} photo${
            readyPhotos.length > 1 ? "s" : ""
          }...`
        );

        // Uploader toutes les photos compressées
        const filesToUpload = readyPhotos.map((p) => p.compressed!);

        const uploadedImages = await startUpload(filesToUpload);

        if (!uploadedImages || uploadedImages.length === 0) {
          throw new Error("Échec de l'upload - Aucune image retournée");
        }

        toast.success(`Upload terminé ! Ajout en base de données...`);

        // Ajouter chaque photo à la base de données
        let successCount = 0;
        for (const uploadedImage of uploadedImages) {
          try {
            const newPhoto = await addPhotosToParty({
              photo: { url: uploadedImage.url },
              partyId,
              userId,
            });

            if (newPhoto && "id" in newPhoto) {
              successCount++;
            }
          } catch (error) {
            console.error("Erreur ajout photo:", error);
          }
        }

        if (successCount > 0) {
          setPhotos([]);
          form.reset();
          toast.success(
            `${successCount} photo${successCount > 1 ? "s" : ""} ajoutée${
              successCount > 1 ? "s" : ""
            } avec succès !`
          );

          // Fermer la modal après un délai pour laisser voir le toast de succès
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1500);

          router.push(`/admin/party/${partyId}`);
        } else {
          toast.error("Erreur lors de l'ajout des photos en base de données");
        }
      } catch (error) {
        console.error("❌ Erreur complète:", error);

        // Analyser le type d'erreur
        if (error instanceof Error) {
          if (error.message.includes("FileCountMismatch")) {
            toast.error("Trop de fichiers sélectionnés. Maximum autorisé: 30");
          } else if (error.message.includes("FileSizeMismatch")) {
            toast.error(
              "Un ou plusieurs fichiers sont trop volumineux (max 8MB)"
            );
          } else {
            toast.error(`Erreur: ${error.message}`);
          }
        } else {
          toast.error("Erreur lors de l'ajout des photos");
        }
      } finally {
        setIsUploading(false);
      }
    });
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        className="group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-300">
          <FaPlus
            size={20}
            className="text-white group-hover:text-white/80 transition-colors"
          />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Loading Overlay */}
          {(isUploading || isPending) && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <div className="text-white font-mono">
                  <p className="text-lg renogare tracking-wider">
                    {isUploading ? "UPLOAD EN COURS..." : "AJOUT EN COURS..."}
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    {isUploading
                      ? `Upload de ${
                          photos.filter((p) => p.compressed).length
                        } photo${
                          photos.filter((p) => p.compressed).length > 1
                            ? "s"
                            : ""
                        }...`
                      : "Finalisation..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <AlertDialogHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient p-3 rounded-xl">
                <FaImages className="text-white text-lg" />
              </div>
              <AlertDialogTitle className="text-white renogare text-xl font-bold tracking-wider">
                AJOUTER DES PHOTOS
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-white/70 font-mono text-sm">
              Sélectionnez une ou plusieurs photos. Elles seront compressées
              automatiquement.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              onSubmit={(e) => {
                console.log("🟡 FORM onSubmit déclenché !");
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
              }}
              className="space-y-6"
            >
              {/* Zone de sélection de fichiers */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:border-white/30">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FaImages className="text-4xl text-white/40" />
                  <div className="text-center">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="bg-gradient hover:opacity-80 px-6 py-3 rounded-xl text-white font-mono transition-all duration-300">
                        Sélectionner des photos
                      </div>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                  <p className="text-white/50 font-mono text-sm text-center">
                    Formats supportés: JPG, PNG, WEBP • Max 8MB par fichier •
                    Jusqu&apos;à 30 photos
                    <br />
                    <span className="text-white/40 text-xs">
                      Compression automatique jusqu&apos;à 1MB avec qualité
                      optimisée
                    </span>
                  </p>
                </div>
              </div>

              {/* Prévisualisation des photos */}
              {photos.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white renogare font-bold text-lg">
                      PHOTOS SÉLECTIONNÉES ({photos.length})
                    </h3>
                    {/* <div className="text-white/60 font-mono text-sm flex items-center space-x-2">
                      <FaCompress className="text-sm" />
                      <span>Compression en cours...</span>
                    </div> */}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={photo.preview} className="relative group">
                        <div className="aspect-square bg-black/30 rounded-xl overflow-hidden">
                          <Image
                            src={photo.preview}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />

                          {/* Overlay avec état */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full transition-colors duration-300"
                            >
                              <FaTrash className="text-white text-sm" />
                            </button>
                          </div>

                          {/* Indicateur de compression */}
                          {photo.isCompressing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="flex items-center space-x-2">
                                <FaCompress className="text-white animate-pulse" />
                                <span className="text-white font-mono text-xs">
                                  Compression...
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Badge de statut */}
                          <div className="absolute top-2 right-2">
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-mono ${
                                photo.isCompressing
                                  ? "bg-yellow-500/80 text-yellow-100"
                                  : photo.compressed
                                  ? "bg-green-500/80 text-green-100"
                                  : "bg-red-500/80 text-red-100"
                              }`}
                            >
                              {photo.isCompressing
                                ? "En cours"
                                : photo.compressed
                                ? "Prêt"
                                : "Erreur"}
                            </div>
                          </div>
                        </div>

                        {/* Infos du fichier */}
                        <div className="mt-2 text-center">
                          <p className="text-white/70 font-mono text-xs truncate">
                            {photo.file.name}
                          </p>
                          <p className="text-white/50 font-mono text-xs">
                            {(photo.file.size / 1024 / 1024).toFixed(1)}MB
                            {photo.compressed &&
                              ` → ${(
                                photo.compressed.size /
                                1024 /
                                1024
                              ).toFixed(1)}MB`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <AlertDialogFooter className="flex gap-3 pt-6">
                <AlertDialogCancel
                  disabled={isUploading || isPending}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-300 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annuler
                </AlertDialogCancel>

                <Button
                  type="button"
                  onClick={(e) => {
                    console.log("🔴 BOUTON CLIQUÉ !");
                    console.log("Photos dans le state:", photos.length);
                    e.preventDefault();

                    // Déclencher manuellement la soumission
                    const formData = {
                      photos: photos.map((p) => ({
                        file: p.file,
                        preview: p.preview,
                        compressed: p.compressed,
                      })),
                    };
                    console.log("🟢 Données du formulaire:", formData);
                    onSubmit(formData);
                  }}
                  disabled={
                    photos.length === 0 ||
                    photos.some((p) => p.isCompressing) ||
                    isUploading ||
                    isPending
                  }
                  className="flex-1 bg-gradient hover:opacity-80 disabled:opacity-50 text-white rounded-xl transition-all duration-300 renogare font-bold disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>UPLOAD...</span>
                    </div>
                  ) : isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>AJOUT...</span>
                    </div>
                  ) : (
                    `AJOUTER ${photos.length} PHOTO${
                      photos.length > 1 ? "S" : ""
                    }`
                  )}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
