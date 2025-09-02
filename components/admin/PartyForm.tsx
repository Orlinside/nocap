"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { partyDefaultValues } from "@/constants";
import { partyFormSchema } from "@/lib/validator";

import { createParty, updateParty } from "@/lib/actions/party.actions";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
import DatePicker from "react-datepicker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FaEdit, FaPlus, FaCalendarAlt, FaClock } from "react-icons/fa";
import { toast } from "sonner";

type PartyFormProps = {
  userId: string | undefined;
  type: "Créer" | "Modifier";
  party?: {
    name: string;
    startDateTime: Date;
    endDateTime: Date;
  };
  partyId?: string;
};

export const PartyForm = ({ userId, type, party, partyId }: PartyFormProps) => {
  const router = useRouter();

  let [isPending, startTransition] = useTransition();

  registerLocale("fr", fr); // On enregistre la locale fr pour les dates

  const initialValues =
    party && type === "Modifier"
      ? {
          ...party,
          startDateTime: new Date(party.startDateTime),
          endDateTime: new Date(party.endDateTime),
        }
      : partyDefaultValues;

  const form = useForm<z.infer<typeof partyFormSchema>>({
    resolver: zodResolver(partyFormSchema),
    defaultValues: initialValues,
  });

  //! SUBMIT FORM
  async function onSubmit(values: z.infer<typeof partyFormSchema>) {
    if (type === "Créer") {
      try {
        const newParty = await createParty({
          party: values,
          userId,
          path: "/admin/party",
        });
        if (newParty && "id" in newParty) {
          form.reset();
          router.push(`/admin/party/${newParty.id}`);
          toast.success("Création réussie");
        }
      } catch (error) {
        toast.error("Erreur lors de la création de la soirée.");
        console.error(error);
      }
    }

    if (type === "Modifier") {
      if (!partyId) {
        router.back();
        return;
      }

      try {
        const updatedParty = await updateParty({
          party: {
            ...values,
            partyId,
          },
          userId,
          path: `/admin/party/${partyId}`,
        });
        if (updatedParty) {
          form.reset();
          router.push(`/admin/party/${partyId}`);
          toast.success("Modification réussie");
        }
      } catch (error) {
        toast.error("Erreur lors de la modification de la soirée.");
        console.error("Error updating party:", error);
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger aria-describedby={type} className="group">
        <div className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 backdrop-blur-sm rounded-xl p-3 transition-all duration-300">
          {type === "Créer" ? (
            <FaPlus
              size={20}
              className="text-white group-hover:text-white/80 transition-colors"
            />
          ) : type === "Modifier" ? (
            <FaEdit
              size={20}
              className="text-white group-hover:text-white/80 transition-colors"
            />
          ) : null}
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent
        aria-describedby={type}
        className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-lg mx-4"
      >
        <AlertDialogHeader className="pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient p-3 rounded-xl">
              {type === "Créer" ? (
                <FaPlus className="text-white text-lg" />
              ) : (
                <FaEdit className="text-white text-lg" />
              )}
            </div>
            <AlertDialogTitle className="text-white renogare text-xl font-bold tracking-wider">
              {type.toUpperCase()} UNE SOIRÉE
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 focus-within:border-white/40">
                        <label className="text-white/70 font-mono text-sm mb-2 block">
                          Nom de l&apos;événement
                        </label>
                        <Input
                          placeholder="Entrez le nom de la soirée..."
                          {...field}
                          className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs font-mono" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 focus-within:border-white/40">
                        <label className="text-white/70 font-mono text-sm mb-2 flex items-center space-x-2">
                          <FaCalendarAlt className="text-sm" />
                          <span>Date de début</span>
                        </label>
                        <DatePicker
                          locale="fr"
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Heure :"
                          dateFormat="dd/MM/yyyy - HH:mm"
                          wrapperClassName="w-full"
                          className="bg-transparent border-none text-white placeholder:text-white/40 focus:outline-none w-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-mono" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 focus-within:border-white/40">
                        <label className="text-white/70 font-mono text-sm mb-2 flex items-center space-x-2">
                          <FaClock className="text-sm" />
                          <span>Date de fin</span>
                        </label>
                        <DatePicker
                          locale="fr"
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Heure :"
                          dateFormat="dd/MM/yyyy - HH:mm"
                          wrapperClassName="w-full"
                          className="bg-transparent border-none text-white placeholder:text-white/40 focus:outline-none w-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-mono" />
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter className="flex gap-3 pt-6">
              <AlertDialogCancel className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-300 font-mono">
                Annuler
              </AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                className="flex-1 bg-gradient hover:opacity-80 text-white rounded-xl transition-all duration-300 renogare font-bold"
              >
                {isPending ? "..." : type}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
