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
      <AlertDialogTrigger
        // onClick={handleDialogOpen}
        className="bg-gradient uppercase text-white renogare rounded-xl p-2 text-sm"
      >
        <p>écrire un commentaire</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark w-5/6 sm:w-1/2 rounded-xl border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare uppercase">
            écrire un commentaire
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="rounded-xl">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="h-2">
                      <Textarea
                        placeholder="Met un commentaire ici..."
                        {...field}
                        className=" border-none bg-white backdrop-blur-md text-dark font-bold rounded-xl placeholder:text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="text-white rounded-xl">
                Annuler
              </AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                className="text-white renogare bg-gradient-to-t from-[#fc0010] to-[#FE9D01] rounded-xl hover:bg-primary/80"
              >
                {isPending ? "Envoie..." : "Envoyer"}
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
