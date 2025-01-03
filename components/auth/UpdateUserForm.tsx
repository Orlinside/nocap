"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { updateUserSchema } from "@/lib/validator";
import { updateUser } from "@/lib/actions/user.actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function UpdateUserForm({ user }: { user: any }) {
  console.log(user);
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  const initialValues = {
    name: user?.name,
  };

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      console.log("VALUUUUUE", values);
      startTransition(() => {
        updateUser({
          userId: user.id,
          user: {
            name: values.name,
          },
          path: "/compte",
        });
        toast.success("Votre nom a bien été mis à jour");
        router.push("/compte");
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel htmlFor="name">Pseudo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pseudo"
                    {...field}
                    className="input-field text-dark"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-col gap-3">
          <FormLabel htmlFor="">Email</FormLabel>
          <Input
            placeholder="Pseudo"
            defaultValue={user.email}
            className="input-field text-dark"
            disabled
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="rounded-xl h-10 renogare uppercase tracking-widest text-xs hover:bg-slate-800 w-full"
        >
          Modifier le pseudo
        </Button>
      </form>
    </Form>
  );
}
