"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

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

  const initialValues =
    photo && type === "Modifier" ? { ...photo } : photoDefaultValues;

  const { startUpload } = useUploadThing("imageUploader"); //! Hook pour uploader des images

  const form = useForm<z.infer<typeof photoFormSchema>>({
    resolver: zodResolver(photoFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof photoFormSchema>) {
    console.log(values);
    let uploadedUrl = values.url;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedUrl = uploadedImages[0].url;
    }

    if (type === "Ajouter") {
      try {
        const newPhoto = await addPhotosToParty({
          photo: { url: uploadedUrl },
          partyId,
          userId,
        });
        if (newPhoto && "id" in newPhoto) {
          form.reset();
          router.push(`/admin/party/${partyId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="button renogare bg-gradient px-2">
        <p>Ajouter une photo</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark w-5/6 sm:w-2/3 rounded-xl border-none">
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
                {isPending ? "Ajout..." : type}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
