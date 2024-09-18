import { ContactForm } from "@/components/shared/ContactForm";

import { Transition } from "@/components/shared/Transition";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | No Cap",
  description: "Contactez l'équipe de No Cap pour toute question ou demande.",
};

export default function ContactPage() {
  return (
    <>
      <Transition>
        <section className="wrapper">
          <div className="mt-28 sm:mt-20"></div>
          <h1 className="text-center text-white renogare text-2xl uppercase">
            Contactez-nous
          </h1>
        </section>
        <section className="wrapper flex justify-center">
          <ContactForm />
        </section>
      </Transition>
    </>
  );
}
