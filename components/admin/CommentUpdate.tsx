"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
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
import { updateAdminComment } from "@/lib/actions/comment.actions";
import { updateCommentSchema } from "@/lib/validator";
import { toast } from "sonner";

export const CommentUpdate = ({ comment }: { comment: any }) => {
  const router = useRouter();

  const pathname = usePathname();

  let [isPending, startTransition] = useTransition();

  const initialValues = {
    content: comment.content,
    importance: comment.importance,
    isValid: comment.isValid,
  };

  const form = useForm<z.infer<typeof updateCommentSchema>>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof updateCommentSchema>) {
    console.log("SUBMIT", values);

    try {
      const updatedComment = await updateAdminComment({
        commentId: comment.id,
        importance: values.importance,
        isValid: values.isValid,
        path: "/admin/comments",
      });
      if (updatedComment.status) {
        toast.success("Commentaire mis à jour");
      } else {
        toast.error("Erreur lors de la mise à jour du commentaire");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du commentaire");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <div
          className="grid grid-cols-4 w-full p-2 hover:bg-[#121212] cursor-pointer"
          key={comment.id}
        >
          <p>{comment.user.name}</p>
          <p>{comment.content}</p>
          <p>Importance - {comment.importance}</p>
          <p>Affichage - {comment.isValid ? "OUI" : "NON"}</p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-1/2">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Mettre à jour le commentaire</AlertDialogTitle>
          <AlertDialogCancel className="text-white">Annuler</AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-second">
          <p className="font-bold">{comment.user.name}</p>
          <p>{comment.content}</p>
        </AlertDialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-8 items-center"
          >
            <FormField
              control={form.control}
              name="importance"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select {...field} className="w-full text-dark">
                      <option value="LOW">Faible</option>
                      <option value="MEDIUM">Normal</option>
                      <option value="HIGH">Haute</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importance"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <select {...field} className="w-full text-dark">
                      <option value="true">Afficher le commentaire</option>
                      <option value="false">Cacher le commentaire</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <AlertDialogAction type="submit" className="text-white button ">
              {isPending ? "..." : "Mettre à jour"}
            </AlertDialogAction>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
