"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      try {
        const newComment = await createComment({
          userId,
          content: values.content,
          path: "/commentaires",
        });

        if (newComment) {
          form.reset({ content: "" });
          toast.success("Commentaire envoye");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'envoi du commentaire");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border border-white/20 p-3 backdrop-blur-xl"
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="renogare text-[11px] uppercase tracking-[0.2em] text-white/80">
            Ecrire un commentaire
          </p>
          <p className="text-[10px] font-mono text-white/50">
            {form.watch("content")?.length || 0}/500
          </p>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Partage ton ressenti..."
                  {...field}
                  rows={2}
                  className="min-h-[74px] border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/45 focus:border-white/40"
                />
              </FormControl>
              <FormMessage className="mt-1 text-xs text-red-400" />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="group relative overflow-hidden border border-white/30 bg-gradient-to-l from-orange-800 to-orange-400 rounded-none px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Envoi..." : "Envoyer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
