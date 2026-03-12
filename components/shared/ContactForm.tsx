"use client";

import { useState, useTransition } from "react";

import emailjs from "@emailjs/browser";

import { Button } from "../ui/button";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";

export const ContactForm = () => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: "",
    object: "",
    mail: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    startTransition(() => {
      emailjs
        .sendForm("service_rp99p7f", "template_nag8q4d", e.target, {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        })
        .then(
          (result) => {
            console.log(result.text);
            setForm({
              name: "",
              object: "",
              mail: "",
              message: "",
            });
            setConfirmationMessage("Email envoyé avec succès !");
            setTimeout(() => {
              setConfirmationMessage("");
            }, 10000);
            console.log("SUCCESS!");
          },
          (error: any) => {
            console.log("FAILED...", error.text);
          },
        );
    });
  };

  return (
    <form onSubmit={sendEmail} className="w-full space-y-4">
      {confirmationMessage && (
        <div className="border border-emerald-300/40 bg-emerald-400/10 px-4 py-3 backdrop-blur-sm">
          <p className="renogare text-xs uppercase tracking-[0.18em] text-emerald-200">
            {confirmationMessage}
          </p>
        </div>
      )}

      {/* Première ligne - Nom */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
          <FaUser className="text-xs" />
          Nom & Prénom
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Votre nom complet..."
            onChange={handleChange}
            value={form.name}
            required
            minLength={2}
            maxLength={30}
            className="w-full border border-white/20 bg-black/35 px-3 py-2.5 text-sm text-white placeholder:text-white/45 transition-colors duration-300 hover:bg-black/45 focus:border-white/40 focus:bg-black/55"
          />
        </div>
      </div>

      {/* Deuxième ligne - Email et Objet */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
            <FaEnvelope className="text-xs" />
            Email
          </label>
          <input
            type="email"
            name="mail"
            placeholder="votre@email.com"
            onChange={handleChange}
            value={form.mail}
            required
            minLength={2}
            maxLength={40}
            className="w-full border border-white/20 bg-black/35 px-3 py-2.5 text-sm text-white placeholder:text-white/45 transition-colors duration-300 hover:bg-black/45 focus:border-white/40 focus:bg-black/55"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
            <FaTag className="text-xs" />
            Objet
          </label>
          <input
            type="text"
            name="object"
            placeholder="Objet de votre message"
            onChange={handleChange}
            value={form.object}
            required
            minLength={2}
            maxLength={30}
            className="w-full border border-white/20 bg-black/35 px-3 py-2.5 text-sm text-white placeholder:text-white/45 transition-colors duration-300 hover:bg-black/45 focus:border-white/40 focus:bg-black/55"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
          <FaCommentDots className="text-xs" />
          Message
        </label>
        <div className="relative">
          <textarea
            name="message"
            placeholder="Écrivez votre message ici..."
            onChange={handleChange}
            value={form.message}
            required
            minLength={2}
            maxLength={350}
            rows={4}
            className="w-full resize-none border border-white/20 bg-black/35 px-3 py-2.5 text-sm text-white placeholder:text-white/45 transition-colors duration-300 hover:bg-black/45 focus:border-white/40 focus:bg-black/55"
          />
          <div className="absolute bottom-2 right-2 text-[10px] text-white/40">
            {form.message.length}/350
          </div>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="group relative overflow-hidden border border-white/30 bg-gradient-to-l from-orange-800 to-orange-400 rounded-none px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300  disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            {isPending ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                <FaPaperPlane className="text-sm" />
                Envoyer le message
              </>
            )}
          </span>
        </Button>
      </div>
    </form>
  );
};
