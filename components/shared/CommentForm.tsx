"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

// type CommentFormProps = {
//   userId: string | undefined;
// };

export const CommentForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const initialValues = {
    content: "",
  };

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  //! SUBMIT FORM
  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      const newComment = await createComment({
        userId,
        content: values.content,
        path: "/commentaires",
      });
      if (newComment) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-10"
      >
        <div className="col-span-9">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-4">
                  <Textarea
                    placeholder="Met un commentaire ici..."
                    {...field}
                    className="h-8 border-none bg-gray-400 text-dark font-bold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitted}
          className="h-full col-span-1 w-full uppercase"
        >
          {form.formState.isSubmitted ? "En cours..." : `Envoyer`}
        </Button>
      </form>
    </Form>
  );
};
