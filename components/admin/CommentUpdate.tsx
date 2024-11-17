"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  deleteAdminComment,
  updateAdminComment,
} from "@/lib/actions/comment.actions";
import { updateCommentSchema } from "@/lib/validator";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

import { IoClose } from "react-icons/io5";

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
        <div className="bg-dark border border-white/30 rounded-xl flex flex-col justify-start sm:grid sm:grid-cols-4 w-full p-1 sm:p-2 hover:bg-[#121212] cursor-pointer">
          <p className="font-bold text-white text-sm sm:text-xl border-b border-white/20 pb-1 sm:border-none sm:pb-0">
            {comment.user?.name || "Anonyme"}
          </p>
          <p className="sm:text-left text-white text-[0.8rem] border-b border-white/20 py-1 sm:border-none sm:py-0">
            &apos;&apos;{comment.content}&apos;&apos;
          </p>
          <p className="text-xs text-white sm:text-sm pt-1 sm:pt-0">
            Niveau{" "}
            <span className="font-bold text-white">{comment.importance}</span>
          </p>
          <p className="text-xs sm:text-sm text-white">
            Afficher : {comment.isValid ? "OUI" : "NON"}
          </p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-5/6 sm:w-1/2 bg-dark border-none">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="uppercase renogare text-white">
            Mettre à jour
          </AlertDialogTitle>
          <AlertDialogCancel className="text-white border-none hover:text-white/80">
            <IoClose size={20} />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-white border-b-2 pb-4">
          <p className="font-bold">{comment.user?.name || "Anonyme"}</p>
          <p>{comment.content}</p>
        </AlertDialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 items-center"
          >
            <div className="flex flex-grow flex-col sm:flex-row w-full gap-8 sm:justify-between items-center">
              <FormField
                control={form.control}
                name="importance"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="isValid"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 text-[0.8rem]"
                        >
                          Importance du commentaire :
                        </label>
                        <select
                          {...field}
                          className="w-full p-1 rounded-xl text-dark"
                        >
                          <option value="LOW">Faible</option>
                          <option value="MEDIUM">Normal</option>
                          <option value="HIGH">Haute</option>
                        </select>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isValid"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center">
                        <label
                          htmlFor="isValid"
                          className="text-white whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Afficher le commentaire :
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="isFree"
                          className="mr-2 h-4 w-4 border-2 border-primary"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-8">
              <AlertDialogAction
                onClick={() =>
                  startTransition(async () => {
                    await deleteAdminComment({
                      commentId: comment.id,
                      path: pathname,
                    });
                  })
                }
                className="text-white rubik bg-red-950 hover:bg-red-600 rounded-xl"
              >
                {isPending ? "Suppression..." : "Supprimer le commentaire"}
              </AlertDialogAction>
              <AlertDialogAction
                type="submit"
                className="text-white button bg-gradient w-full"
              >
                {isPending ? "..." : "Mettre à jour"}
              </AlertDialogAction>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
