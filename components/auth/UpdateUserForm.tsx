"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { updateUserSchema } from "@/lib/validator";
import { updateUser } from "@/lib/actions/user.actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { FaUser, FaEnvelope, FaEdit, FaLock } from "react-icons/fa";

export default function UpdateUserForm({ user }: { user: any }) {
  console.log(user);
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  const initialValues = {
    name: user?.name,
  };

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      console.log("VALUUUUUE", values);
      startTransition(() => {
        updateUser({
          userId: user.id,
          user: {
            name: values.name,
          },
          path: "/compte",
        });
        toast.success("Votre nom a bien été mis à jour");
        router.push("/compte");
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champ Pseudo */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    <FormLabel className="flex items-center gap-2 text-white/70 font-mono text-sm mb-3">
                      <FaUser className="text-xs" />
                      Pseudo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre pseudo..."
                        {...field}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 focus:border-white/40 text-white rounded-lg px-3 py-2 placeholder:text-white/50 transition-all duration-300 focus:bg-white/15 hover:bg-white/5"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-400 text-xs ml-1" />
                </FormItem>
              );
            }}
          />

          {/* Champ Email (lecture seule) */}
          <div className="w-full">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 opacity-75">
              <FormLabel className="flex items-center gap-2 text-white/50 font-mono text-sm mb-3">
                <FaEnvelope className="text-xs" />
                Email
                <FaLock className="text-xs ml-1" />
              </FormLabel>
              <Input
                defaultValue={user?.email}
                className="bg-white/5 border border-white/10 text-white/60 rounded-lg px-3 py-2 cursor-not-allowed"
                disabled
              />
            </div>
            <p className="text-white/40 text-xs ml-1 mt-1 font-mono">
              L&apos;email ne peut pas être modifié
            </p>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="group relative overflow-hidden bg-gradient-to-r from-[#fc0010] to-[#FE9D01] hover:from-[#fc0010]/90 hover:to-[#FE9D01]/90 text-white font-mono text-[10px] tracking-wider rounded-xl px-4 py-1 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  Mise à jour...
                </>
              ) : (
                <>
                  <FaEdit className="text-sm" />
                  Modifier le pseudo
                </>
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
