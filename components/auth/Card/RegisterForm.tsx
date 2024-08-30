"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { userRegisterSchema } from "@/lib/validator";
import { register } from "@/lib/actions/auth.actions";

import { CardWrapper } from "./CardWrapper";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSucess";

import { ImCross } from "react-icons/im";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "user",
    },
  });

  //! Fonction de soumission du formulaire
  const onSubmit = (values: z.infer<typeof userRegisterSchema>) => {
    // Reset des messages d'erreur et de succès
    setError("");
    setSuccess("");

    // Server Action (je peux aussi utiliser fetch ici)
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="renogare text-sm tracking-widest hover:text-primary">
        Pas encore de compte ? Créer un compte
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-transparent backdrop-blur-xl  w-full lg:w-fit border-none rounded-sm">
        <AlertDialogHeader className="w-full flex flex-row justify-between items-center gap-8">
          <AlertDialogTitle>S&apos;INSCRIRE</AlertDialogTitle>
          <AlertDialogCancel className="text-white border-none">
            <ImCross className="hover:text-primary" />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <CardWrapper
          headerLabel="Créer un compte"
          backButtonLabel=""
          backButtonHref=""
          showSocial
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full text-dark"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              id="firstName"
                              placeholder="Pseudo"
                              {...field}
                              disabled={isPending}
                              className="input-field w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              id="email"
                              placeholder="Email"
                              {...field}
                              disabled={isPending}
                              className="input-field"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              id="password"
                              placeholder="Mot de passe"
                              {...field}
                              disabled={isPending}
                              className="input-field text-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="passwordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              id="passwordConfirmation"
                              placeholder="Confirmation du mot de passe"
                              {...field}
                              disabled={isPending}
                              className="input-field text-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                disabled={isPending}
                className="button uppercase renogare tracking-widest w-full"
              >
                Créer mon compte
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </AlertDialogContent>
    </AlertDialog>
  );
}
