"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

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

import { photoDefaultValues } from "@/constants";
import { FileUploader } from "../shared/FileUploader";
import { photoFormSchema } from "@/lib/validator";
import { useUploadThing } from "@/lib/uploadthing";
import { addPhotosToParty } from "@/lib/actions/photo.actions";

type PhotoFormProps = {
  partyId: string;
  userId: string;
  type: "Ajouter" | "Modifier";
  photo?: {
    url: string;
  };
};

export const PhotoForm = ({ partyId, type, photo, userId }: PhotoFormProps) => {
  const router = useRouter();

  const pathname = usePathname();

  let [isPending, startTransition] = useTransition();

  const [files, setFiles] = useState<File[]>([]); // Pour la gestion des fichiers (images)

  const [isLoading, setIsLoading] = useState(false);

  const initialValues =
    photo && type === "Modifier" ? { ...photo } : photoDefaultValues;

  const { startUpload } = useUploadThing("imageUploader"); //! Hook pour uploader des images

  const form = useForm<z.infer<typeof photoFormSchema>>({
    resolver: zodResolver(photoFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof photoFormSchema>) {
    let uploadedUrl = values.url;

    if (files.length > 0) {
      const file = files[0];
      const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Erreur : la taille du fichier dépasse 8MB.");
        return;
      }

      if (files.length > 0) {
        setIsLoading(true); // Début du chargement
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) return;

        uploadedUrl = uploadedImages[0].url;
      }
    }

    if (type === "Ajouter") {
      try {
        const newPhoto = await addPhotosToParty({
          photo: { url: uploadedUrl },
          partyId,
          userId,
        });
        if (newPhoto && "id" in newPhoto) {
          setIsLoading(false); // Fin du chargement
          form.reset();
          router.push(`/admin/party/${partyId}`);
          toast.success("Photo ajoutée");
        } else {
          setIsLoading(false); // Fin du chargement
          toast.error(
            "Erreur lors de l'ajout de la photo. Veuillez réessayer."
          );
        }
      } catch (error) {
        setIsLoading(false); // Fin du chargement
        toast.error("Erreur lors de l'ajout de la photo. Veuillez réessayer.");
        console.log(error);
      }
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          aria-describedby="Ajouter une photo"
          className="button text-white renogare bg-gradient px-2"
        >
          <p>Ajouter une photo</p>
        </AlertDialogTrigger>

        <AlertDialogContent
          aria-describedby="Ajouter une photo"
          className="bg-dark w-5/6 sm:w-2/3 rounded-xl border-none"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white renogare">
              Ajouter une photo
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="h-72">
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel className="text-white rounded-xl">
                  Annuler
                </AlertDialogCancel>

                <AlertDialogAction
                  type="submit"
                  className="text-white rounded-xl renogare bg-gradient"
                >
                  {isLoading ? "Chargement..." : isPending ? "Ajout..." : type}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex-center">
          <p className="text-white renogare">Chargement...</p>
        </div>
      )}
    </>
  );
};
