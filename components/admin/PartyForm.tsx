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

import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
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
      <AlertDialogTrigger
        aria-describedby={type}
        className="bg-linear-text text-white hover:text-white/70"
      >
        {type === "Créer" ? (
          <FaPlus size={25} className="" />
        ) : type === "Modifier" ? (
          <FaEdit size={25} className="" />
        ) : null}
      </AlertDialogTrigger>

      <AlertDialogContent
        aria-describedby={type}
        className="bg-dark w-4/5 sm:w-1/2 rounded-xl border-none"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white renogare">
            {type}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Nom de l'événement"
                      {...field}
                      className="input-field text-dark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="w-full flex-center h-[40px] overflow-hidden rounded-sm bg-grey-50 px-4 py-2">
                        <p className="mr-3 whitespace-nowrap text-white">
                          Début
                        </p>
                        <DatePicker
                          locale="fr"
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Heure :" //! Label pour l'heure
                          dateFormat="dd/MM/yyyy - HH:mm" //! Format de la date
                          wrapperClassName="datePicker"
                          className="input-field w-full text-black"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="w-full flex-center h-[40px] overflow-hidden rounded-sm bg-grey-50 px-4 py-2">
                        <p className="mr-3 whitespace-nowrap text-white">Fin</p>
                        <DatePicker
                          locale="fr"
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Heure :" //! Label pour l'heure
                          dateFormat="dd/MM/yyyy - HH:mm" //! Format de la date
                          wrapperClassName="datePicker"
                          className="input-field w-full text-black"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel className="text-white rounded-xl">
                Annuler
              </AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                className="text-white rounded-xl renogare bg-gradient"
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
