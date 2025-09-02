"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { commentFormSchema } from "@/lib/validator";
import { createComment } from "@/lib/actions/comment.actions";
import { toast } from "sonner";

// type CommentFormProps = {
//   userId: string | undefined;
// };

export const CommentForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  const initialValues = {
    content: "",
  };

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  //! HANDLE DIALOG OPEN
  // const handleDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   if (!userId) {
  //     event.preventDefault();
  //     toast.error("Vous devez être connecté pour écrire un commentaire");
  //   }
  // };

  //! SUBMIT FORM
  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      const newComment = await createComment({
        userId,
        content: values.content,
        path: "/commentaires",
      });
      if (newComment) {
        form.reset({ content: "" });
        toast.success("Commentaire envoyé");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="group relative overflow-hidden bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 uppercase text-white renogare rounded-2xl px-6 py-3 text-sm font-bold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fc0010]/20 to-[#FE9D01]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center gap-2 text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          écrire un commentaire
        </span>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black/20 backdrop-blur-xl border border-white/20 w-5/6 sm:w-1/2 max-w-lg rounded-3xl shadow-2xl">
        <AlertDialogHeader className="pb-4">
          <AlertDialogTitle className="text-white renogare uppercase text-xl font-bold tracking-wider flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            écrire un commentaire
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/60 text-sm">
            Partagez votre expérience et votre avis sur les soirées
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Votre commentaire..."
                          {...field}
                          rows={4}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-2xl px-4 py-3 placeholder:text-white/50 resize-none transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
                        />
                        <div className="absolute bottom-3 right-3 text-white/40 text-xs font-mono">
                          {field.value?.length || 0}/500
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter className="flex gap-3 pt-2">
              <AlertDialogCancel className="bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white rounded-2xl px-6 py-2 transition-all duration-300 hover:scale-105">
                Annuler
              </AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                disabled={isPending}
                className="relative overflow-hidden bg-gradient-to-r from-[#fc0010] to-[#FE9D01] hover:from-[#fc0010]/90 hover:to-[#FE9D01]/90 text-white renogare font-bold tracking-wider rounded-2xl px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  {isPending && (
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isPending ? "Envoi en cours..." : "Envoyer"}
                </span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>

    // <Button
    //   type="submit"
    //   size="lg"
    //   disabled={form.formState.isSubmitted}
    //   className="h-full col-span-1 w-full uppercase rounded-xl"
    // >
    //   {form.formState.isSubmitted ? "En cours..." : `Envoyer`}
    // </Button>
  );
};
