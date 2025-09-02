import { ContactForm } from "@/components/shared/ContactForm";

import { Transition } from "@/components/shared/Transition";

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
    <>
      <Transition>
        <div className="flex gap-2 justify-between">
          <div className="h-screen hidden sm:flex md:1/4 lg:w-1/3 bg-com backdrop-blur-lg fixed left-0"></div>

          <section className="wrapper pl-2 flex justify-end">
            <div className="mt-28 sm:mt-20 w-7/8 md:w-3/4 lg:w-2/3 flex flex-col gap-6">
              
              {/* Header */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white/60 text-xl" />
                  </div>
                  <h1 className="text-white renogare text-2xl font-bold tracking-wider uppercase">
                    Contactez-nous
                  </h1>
                </div>
                <p className="text-white/70 max-w-md mx-auto leading-relaxed">
                  Une question, une suggestion ou envie de rejoindre l&apos;aventure ? 
                  Nous sommes là pour vous écouter !
                </p>
              </div>

              {/* Formulaire de contact */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaComments className="text-white/60 text-xl" />
                  <h2 className="text-white renogare text-xl font-bold tracking-wider">
                    ENVOYEZ-NOUS UN MESSAGE
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </>
  );
}
