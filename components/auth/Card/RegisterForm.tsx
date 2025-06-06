"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { userRegisterSchema } from "@/lib/validator";
import { login, register } from "@/lib/actions/auth.actions";

import { CardWrapper } from "./CardWrapper";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

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
      isNewsletterSubscribed: false,
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
      register(values).then(async (data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          // Connexion automatique après inscription
          const loginResult = await login({
            email: values.email,
            password: values.password,
          });

          if (loginResult?.success) {
            toast.success("Vous êtes connecté !");
            window.location.href = "/"; // Redirige vers la page d'accueil ou celle de ton choix
          }
        } else {
          toast.success("Vous pouvez maintenant vous connecter");
        }
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="renogare text-white text-xs tracking-widest hover:text-white/80">
        Pas encore de compte ? Créer un compte
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-transparent backdrop-blur-xl w-full lg:w-fit border-none rounded-sm">
        <AlertDialogHeader className="w-full flex flex-row justify-between items-center gap-8">
          <AlertDialogTitle className="renogare text-white tracking-widest">
            S&apos;INSCRIRE
          </AlertDialogTitle>
          <AlertDialogCancel className="text-white border-none">
            <ImCross className="hover:text-primary" />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <CardWrapper
          headerLabel=""
          backButtonLabel=""
          backButtonHref=""
          showSocial
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full text-dark"
            >
              <div className="space-y-2">
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

                <div className="space-y-4">
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

                  {/* <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="passwordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              id="passwordConfirmation"
                              placeholder="Confirmation du mot de passe (facultatif)"
                              {...field}
                              disabled={isPending}
                              className="input-field text-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                  <div className="flex-grow ">
                    <FormField
                      control={form.control}
                      name="isNewsletterSubscribed"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex sm:justify-end items-center">
                              <label
                                htmlFor="isNewsletterSubscribed"
                                className="text-white font-mono text-xs tracking-widest whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Etre au courant des nouveautés :
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-4 w-4 sm:h-6 sm:w-6 border-2 border-white"
                              />
                            </div>
                          </FormControl>
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
