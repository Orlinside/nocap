"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

import { ResetSchema } from "@/lib/validator";
import { reset } from "@/lib/actions/auth.actions";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-5 py-4"
    >
      {error && (
        <div className="border border-rose-400/35 bg-rose-400/10 px-4 py-3 backdrop-blur-sm">
          <p className="renogare text-xs uppercase tracking-[0.18em] text-rose-300">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="border border-emerald-300/40 bg-emerald-400/10 px-4 py-3 backdrop-blur-sm">
          <p className="renogare text-xs uppercase tracking-[0.18em] text-emerald-200">
            {success}
          </p>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
          <FaEnvelope className="text-xs" />
          Adresse email
        </label>
        <input
          type="email"
          placeholder="nocap@email.fr"
          {...form.register("email")}
          disabled={isPending}
          className="w-full border border-white/20 bg-black/35 px-3 py-2.5 text-sm text-white placeholder:text-white/45 transition-colors duration-300 hover:bg-black/45 focus:border-white/40 focus:bg-black/55 focus:outline-none disabled:opacity-50"
        />
        {form.formState.errors.email && (
          <p className="text-[11px] uppercase tracking-[0.15em] text-rose-400">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="renogare flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#fc0010] to-[#FE9D01] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <FaPaperPlane className="text-xs" />
        {isPending ? "Envoi en cours..." : "Envoyer le lien"}
      </button>
    </form>
  );
};
