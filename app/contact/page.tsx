import { ContactForm } from "@/components/shared/ContactForm";

import { Transition } from "@/components/shared/Transition";
import { RemainingViewportHeight } from "@/components/shared/RemainingViewportHeight";
import Image from "next/image";

import { FaEnvelope, FaComments, FaClock, FaPaperPlane } from "react-icons/fa";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | No Cap",
  description:
    "Contactez l'équipe de No Cap pour toutes questions ou demandes.",
  openGraph: {
    images: [
      { url: "https://www.nocap.fr/api/opengraph", width: 1200, height: 630 },
    ],
  },
};

import { FaEnvelope, FaComments } from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | No Cap",
  description:
    "Contactez l'équipe de No Cap pour toutes questions ou demandes.",
  openGraph: {
    images: [
      { url: "https://www.nocap.fr/api/opengraph", width: 1200, height: 630 },
    ],
  },
};

export default function ContactPage() {
  return (
    <Transition>
      <RemainingViewportHeight className="relative w-full overflow-hidden text-white">
        <div className="relative z-10 mx-auto h-full min-h-0 w-full max-w-[1600px] px-4 py-4 md:px-8 lg:px-12 lg:py-6">
          <div className="grid h-full min-h-0 gap-4 lg:grid-cols-12 xl:gap-8">
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

                <div className="relative flex h-full min-h-0 flex-col">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      No Cap Community
                    </p>
                    <h1 className="renogare mt-4 text-3xl uppercase leading-[1.05] text-white sm:text-4xl">
                      Contact
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                      Une question, une suggestion ou une proposition ? Notre
                      equipe est disponible pour echanger avec toi.
                    </p>

                    <div className="mt-7 flex flex-col gap-2 text-white/75">
                      <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                        <FaComments className="text-sm text-white/60" />
                        <p className="text-xs uppercase tracking-[0.22em]">
                          Reponse rapide
                        </p>
                      </div>

                      <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                        <FaClock className="text-sm text-white/60" />
                        <p className="text-xs uppercase tracking-[0.22em]">
                          Sous 48h
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-1 pt-6 text-[10px] text-white/70">
                    <Link
                      href="/mentions-legales"
                      className="transition-colors hover:text-white"
                    >
                      Mentions Légales
                    </Link>
                    <Link
                      href="/politique-de-confidentialite"
                      className="transition-colors hover:text-white"
                    >
                      Politique de confidentialité
                    </Link>
                    <Link
                      target="_blank"
                      href={"https://www.inthegleam.com/"}
                      className="transition-colors hover:text-white"
                    >
                      Website by inTheGleam
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <section className="min-h-0 lg:col-span-8">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/15 bg-white/[0.03] px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
                  <div className="border-b border-x border-white/20 bg-[#080a0d]/95 px-5 py-2 backdrop-blur-md">
                    <p className="renogare text-center text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                      Envoyer un message
                    </p>
                  </div>
                </div>

                <div className="mb-3 shrink-0 border-b border-white/10 pb-3 lg:hidden">
                  <div className="flex items-center gap-2 text-white/70">
                    <FaEnvelope className="text-sm" />
                    <p className="text-xs uppercase tracking-[0.2em]">
                      Contact
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Ecris-nous directement via ce formulaire.
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <ContactForm />
                </div>

                <div className="mt-2 shrink-0 border-t border-white/15 pt-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                    <FaPaperPlane className="text-[11px]" />
                    Vos donnees sont utilisees uniquement pour vous repondre.
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

