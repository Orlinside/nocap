"use client";

import { useState, useTransition } from "react";

import emailjs from "@emailjs/browser";

import { Button } from "../ui/button";

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
    <form
      onSubmit={sendEmail}
      className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 "
    >
      {confirmationMessage && (
        <p className="text-white bg-emerald-400 p-4 rounded-xl renogare text-center">
          {confirmationMessage}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white renogare">Nom & Prénom</label>
          <input
            type="text"
            name="name"
            placeholder="Stephen King"
            onChange={handleChange}
            value={form.name}
            required
            minLength={2}
            maxLength={30}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white renogare">Email</label>
          <input
            type="text"
            name="mail"
            placeholder="mail@mail.fr"
            onChange={handleChange}
            value={form.mail}
            required
            minLength={2}
            maxLength={40}
            className="input-field"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-white renogare">Objet</label>
          <input
            type="text"
            name="object"
            placeholder="Objet de votre message"
            onChange={handleChange}
            value={form.object}
            required
            minLength={2}
            maxLength={30}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white renogare">Message</label>
        <textarea
          name="message"
          placeholder="Ecrire votre message ici..."
          onChange={handleChange}
          value={form.message}
          required
          minLength={2}
          maxLength={350}
          className="text-dark dark:text-dark bg-grey-50 flex flex-1 placeholder:text-grey-500 p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent rounded-xl"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="button bg-gradient uppercase renogare col-span-2 w-full"
      >
        {isPending ? "Envoie..." : "Envoyer"}
      </Button>
    </form>
  );
};
