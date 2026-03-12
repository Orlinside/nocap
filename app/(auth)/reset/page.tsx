/* eslint-disable react/no-unescaped-entities */
import { ResetForm } from "@/components/auth/ResetForm";
import { RemainingViewportHeight } from "@/components/shared/RemainingViewportHeight";
import { Transition } from "@/components/shared/Transition";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaLock, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

export default function ResetRoute() {
  return (
    <Transition>
      <RemainingViewportHeight className="relative w-full overflow-hidden text-white">
        {/* Background texturé */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(252,0,16,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(254,157,1,0.04) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto h-full min-h-0 w-full max-w-[1600px] px-4 py-4 md:px-8 lg:px-12 lg:py-6">
          <div className="grid h-full min-h-0 gap-4 lg:grid-cols-12 xl:gap-8">
            {/* Aside gauche - panel éditorial */}
            <aside className="hidden min-h-0 lg:col-span-4 lg:block">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border-y border-white/15 px-5 py-7 sm:px-7">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative h-40 w-40 xl:h-52 xl:w-52">
                    <Image
                      src="/logo/logo_cancel.png"
                      alt=""
                      fill
                      className="object-contain opacity-[0.08]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="relative">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    No Cap Community
                  </p>
                  <h1 className="renogare mt-4 text-3xl uppercase leading-[1.05] text-white sm:text-4xl">
                    Mot de passe oublié
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                    Saisis ton adresse email et nous t'enverrons un lien pour
                    réinitialiser ton mot de passe.
                  </p>

                  <div className="mt-7 flex flex-col gap-2 text-white/75">
                    <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                      <FaShieldAlt className="text-sm text-white/60" />
                      <p className="text-xs uppercase tracking-[0.22em]">
                        Lien sécurisé
                      </p>
                    </div>
                    <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                      <FaLock className="text-sm text-white/60" />
                      <p className="text-xs uppercase tracking-[0.22em]">
                        Valable 1 heure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Section droite - formulaire */}
            <section className="min-h-0 lg:col-span-8">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/15 bg-white/[0.03] px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                {/* Onglet header */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
                  <div className="border-x border-b border-white/20 bg-[#080a0d]/95 px-5 py-2 backdrop-blur-md">
                    <p className="renogare text-center text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                      Réinitialiser le mot de passe
                    </p>
                  </div>
                </div>

                {/* Header mobile */}
                <div className="mb-3 shrink-0 border-b border-white/10 pb-3 lg:hidden">
                  <div className="flex items-center gap-2 text-white/70">
                    <FaLock className="text-sm" />
                    <p className="text-xs uppercase tracking-[0.2em]">
                      Mot de passe oublié
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Saisis ton email pour recevoir un lien de réinitialisation.
                  </p>
                </div>

                {/* Zone formulaire */}
                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <Suspense>
                    <ResetForm />
                  </Suspense>
                </div>

                {/* Footer */}
                <div className="mt-2 shrink-0 border-t border-white/15 pt-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/55">
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt className="text-[9px]" />
                      <span>Lien de réinitialisation chiffré</span>
                    </div>
                    <Link
                      href="/"
                      className="flex items-center gap-1.5 transition-colors hover:text-white/80"
                    >
                      <FaArrowLeft className="text-[9px]" />
                      <span>Retour à l'accueil</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </RemainingViewportHeight>
    </Transition>
  );
}
