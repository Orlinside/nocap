"use client";
import * as z from "zod";
import { userLoginSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { login } from "@/lib/actions/auth.actions";

import { useState, useTransition } from "react";
import { Social } from "./Social";

import { RightPanel } from "@/components/ui/right-panel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RegisterForm from "./RegisterForm";
import { toast } from "sonner";

import { IoMdLogIn } from "react-icons/io";
import { ImCross } from "react-icons/im";

export const LoginForm = () => {
  const router = useRouter();
  //! Prendre l'erreur depuis l'URL lors des connexion avec le provider Google
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OauthAccountNotLinked"
      ? "L'email est déjà utilisé par un autre compte"
      : "";

  //! TVa permettre d'inititer un état de chargement lors de la soumission du formulaire et permettra de désactiver les boutons au submit du formulaire
  const [isPending, startTransition] = useTransition();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [view, setView] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //! Fonction de soumission du formulaire
  const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
    setError("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
            toast.error("Email ou mot de passe incorrect");
          }

          if (data?.success) {
            form.reset();
            setIsLoginOpen(false);
            router.push("/");
            router.refresh();
            toast.success("Vous êtes connecté !");
          }
        })
        .catch(() =>
          setError("Une erreur s'est produite. Veuillez réessayer."),
        );
    });
  };

  return (
    <RightPanel
      open={isLoginOpen}
      onOpenChange={(open) => {
        setIsLoginOpen(open);

        if (!open) {
          setView("login");
          setError("");
        }
      }}
      triggerClassName="renogare z-[200] text-sm uppercase text-white"
      overlayClassName="bg-black/30 backdrop-blur-none"
      panelClassName="inset-x-0 right-0 top-0 h-[100dvh] w-full max-w-none border-x-0 border-y-0 bg-black/95 p-4 backdrop-blur-xl sm:inset-x-auto sm:w-[92vw] sm:max-w-[560px] sm:border-l sm:border-white/15 sm:p-6 lg:w-[560px]"
      trigger={
        <IoMdLogIn
          size={25}
          className="text-white hover:text-white/80"
          aria-label="Connexion"
        />
      }
    >
      {({ close }) => (
        <div className="relative h-full min-h-0 overflow-hidden">
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            {view === "register" ? (
              <RegisterForm onBack={() => setView("login")} />
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <p className="renogare text-[11px] uppercase tracking-[0.24em] text-white/80">
                    Se connecter
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-8 w-8 items-center justify-center border border-white/20 text-white transition hover:bg-white/10"
                    aria-label="Fermer"
                  >
                    <ImCross className="text-[11px]" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <div className="mb-6 mt-6 flex flex-col items-center text-center">
                    <Image
                      src="/logo/Logo_NoCapR_white.png"
                      alt="No Cap"
                      width={180}
                      height={102}
                      className="h-auto w-36 object-contain"
                    />
                    <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/55">
                      Feelings, for the real lovers
                    </p>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">
                              Email
                            </label>
                            <FormControl>
                              <Input
                                type="email"
                                id="email"
                                placeholder="Email ou nom d'utilisateur"
                                {...field}
                                disabled={isPending}
                                className="h-10 rounded-none border-white/20 bg-black/35 text-sm text-white placeholder:text-white/45 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">
                              Mot de passe
                            </label>
                            <FormControl>
                              <Input
                                type="password"
                                id="password"
                                placeholder="Mot de passe"
                                {...field}
                                disabled={isPending}
                                className="h-10 rounded-none border-white/20 bg-black/35 text-sm text-white placeholder:text-white/45 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </FormControl>
                            <Link
                              href="/reset"
                              className="mt-2 inline-block text-[11px] uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
                            >
                              Mot de passe oublié ?
                            </Link>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {(error || urlError) && (
                        <div className="border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                          {error || urlError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="group relative w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:from-orange-400 hover:to-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Se connecter
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/55">
                      Continuer avec
                    </p>
                    <Social />
                  </div>
                </div>

                <div className="mt-4 shrink-0 border-t border-white/15 pt-3 text-center">
                  <button
                    type="button"
                    onClick={() => setView("register")}
                    className="renogare text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
                  >
                    Pas encore de compte ? Créer un compte
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </RightPanel>
  );
};
