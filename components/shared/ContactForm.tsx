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
          }
        );
    });
  };

  return (
    <form onSubmit={sendEmail} className="w-full space-y-6">
      {confirmationMessage && (
        <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-4 text-center">
          <p className="text-emerald-300 renogare font-bold">
            {confirmationMessage}
          </p>
        </div>
      )}

      {/* Première ligne - Nom */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white/70 font-mono text-sm">
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
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-xl px-4 py-3 placeholder:text-white/50 transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
          />
        </div>
      </div>

      {/* Deuxième ligne - Email et Objet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/70 font-mono text-sm">
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
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-xl px-4 py-3 placeholder:text-white/50 transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-white/70 font-mono text-sm">
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
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-xl px-4 py-3 placeholder:text-white/50 transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white/70 font-mono text-sm">
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
            rows={5}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-xl px-4 py-3 placeholder:text-white/50 resize-none transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
          />
          <div className="absolute bottom-3 right-3 text-white/40 text-xs font-mono">
            {form.message.length}/350
          </div>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="group relative overflow-hidden bg-gradient-to-r from-[#fc0010] to-[#FE9D01] hover:from-[#fc0010]/90 hover:to-[#FE9D01]/90 text-white renogare text-xs tracking-wider rounded-xl px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
