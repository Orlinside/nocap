"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { userRegisterSchema } from "@/lib/validator";
import { login, register } from "@/lib/actions/auth.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";
import { FaArrowLeft, FaUserPlus } from "react-icons/fa";

interface RegisterFormProps {
  onBack?: () => void;
}

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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

  const onSubmit = (values: z.infer<typeof userRegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then(async (data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          const loginResult = await login({
            email: values.email,
            password: values.password,
          });

          if (loginResult?.success) {
            toast.success("Vous êtes connecté !");
            window.location.href = "/";
          }
        } else if (!data.error) {
          toast.success("Vous pouvez maintenant vous connecter");
        }
      });
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
        >
          <FaArrowLeft className="text-[9px]" />
          Retour
        </button>
        <p className="renogare text-[11px] uppercase tracking-[0.24em] text-white/80">
          Créer un compte
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            {/* Pseudo */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">
                Pseudo
              </label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ton pseudo"
                        {...field}
                        disabled={isPending}
                        className="h-10 rounded-none border-white/20 bg-black/35 text-sm text-white placeholder:text-white/45 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">
                Email
              </label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nocap@email.fr"
                        {...field}
                        disabled={isPending}
                        className="h-10 rounded-none border-white/20 bg-black/35 text-sm text-white placeholder:text-white/45 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">
                Mot de passe
              </label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mot de passe"
                        {...field}
                        disabled={isPending}
                        className="h-10 rounded-none border-white/20 bg-black/35 text-sm text-white placeholder:text-white/45 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Newsletter */}
            <FormField
              control={form.control}
              name="isNewsletterSubscribed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        id="newsletter"
                        className="h-4 w-4 rounded-none border-white/40"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-[10px] uppercase tracking-[0.18em] text-white/60"
                      >
                        Être au courant des nouveautés
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {error && (
              <div className="border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                {error}
              </div>
            )}
            {success && (
              <div className="border border-emerald-300/40 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="group relative w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:from-orange-400 hover:to-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaUserPlus className="mr-2 inline-block text-xs" />
              Créer mon compte
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
