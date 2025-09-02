"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  deleteAdminComment,
  updateAdminComment,
} from "@/lib/actions/comment.actions";
import { updateCommentSchema } from "@/lib/validator";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

import { IoClose } from "react-icons/io5";
import {
  FaUser,
  FaComment,
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export const CommentUpdate = ({ comment }: { comment: any }) => {
  const router = useRouter();

  const pathname = usePathname();

  let [isPending, startTransition] = useTransition();

  const initialValues = {
    content: comment.content,
    importance: comment.importance,
    isValid: comment.isValid,
  };

  const form = useForm<z.infer<typeof updateCommentSchema>>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof updateCommentSchema>) {
    console.log("SUBMIT", values);

    try {
      const updatedComment = await updateAdminComment({
        commentId: comment.id,
        importance: values.importance,
        isValid: values.isValid,
        path: "/admin/comments",
      });
      if (updatedComment.status) {
        toast.success("Commentaire mis à jour");
      } else {
        toast.error("Erreur lors de la mise à jour du commentaire");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du commentaire");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full group">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-black/50 hover:border-white/20 hover:scale-[1.02] cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient p-2 rounded-lg">
                <FaUser className="text-white text-sm" />
              </div>
              <div>
                <p className="font-bold text-white text-left renogare text-lg">
                  {comment.user?.name || "ANONYME"}
                </p>
                <p className="text-white/60 font-mono text-xs">
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>

            {/* Status badges */}
            <div className="flex items-center space-x-2">
              <div
                className={`px-2 py-1 rounded-full text-xs font-mono ${
                  comment.importance === "HIGH"
                    ? "bg-red-500/20 text-red-400"
                    : comment.importance === "MEDIUM"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {comment.importance === "HIGH"
                  ? "HAUTE"
                  : comment.importance === "MEDIUM"
                  ? "NORMALE"
                  : "FAIBLE"}
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-mono flex items-center space-x-1 ${
                  comment.isValid
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {comment.isValid ? (
                  <FaEye className="text-xs" />
                ) : (
                  <FaEyeSlash className="text-xs" />
                )}
                <span>{comment.isValid ? "VISIBLE" : "MASQUÉ"}</span>
              </div>
            </div>
          </div>

          {/* Comment content */}
          <div className="bg-black/20 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-2">
              <FaComment className="text-white/40 text-sm mt-1 flex-shrink-0" />
              <p className="text-white/80 font-mono text-sm leading-relaxed">
                &quot;{comment.content}&quot;
              </p>
            </div>
          </div>

          {/* Action hint */}
          <div className="flex items-center justify-center space-x-2 text-white/40 group-hover:text-white/60 transition-colors">
            <FaEdit className="text-sm" />
            <span className="font-mono text-xs">Cliquer pour modifier</span>
          </div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl mx-4">
        <AlertDialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient p-3 rounded-xl">
                <FaEdit className="text-white text-lg" />
              </div>
              <AlertDialogTitle className="uppercase renogare text-white text-xl font-bold tracking-wider">
                MODÉRATION COMMENTAIRE
              </AlertDialogTitle>
            </div>
            <AlertDialogCancel className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-300 rounded-xl p-2">
              <IoClose size={20} />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        {/* Comment Display */}
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient p-2 rounded-lg">
              <FaUser className="text-white text-sm" />
            </div>
            <div>
              <p className="font-bold text-white renogare text-lg">
                {comment.user?.name || "ANONYME"}
              </p>
              <p className="text-white/60 font-mono text-sm">
                {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="bg-black/20 rounded-xl p-4">
            <p className="text-white/80 font-mono leading-relaxed">
              &quot;{comment.content}&quot;
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Importance Field */}
              <FormField
                control={form.control}
                name="importance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 focus-within:border-white/40">
                        <label className="text-white/70 font-mono text-sm mb-3 flex items-center space-x-2">
                          <FaExclamationTriangle className="text-sm" />
                          <span>Niveau d&apos;importance</span>
                        </label>
                        <select
                          {...field}
                          className="w-full bg-transparent border-none text-white focus:outline-none font-mono"
                        >
                          <option value="LOW" className="bg-black text-white">
                            Faible
                          </option>
                          <option
                            value="MEDIUM"
                            className="bg-black text-white"
                          >
                            Normal
                          </option>
                          <option value="HIGH" className="bg-black text-white">
                            Haute
                          </option>
                        </select>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-mono" />
                  </FormItem>
                )}
              />

              {/* Visibility Field */}
              <FormField
                control={form.control}
                name="isValid"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 focus-within:border-white/40">
                        <label className="text-white/70 font-mono text-sm mb-3 flex items-center space-x-2">
                          {field.value ? (
                            <FaEye className="text-sm" />
                          ) : (
                            <FaEyeSlash className="text-sm" />
                          )}
                          <span>Visibilité du commentaire</span>
                        </label>
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            id="isValid"
                            className="border-2 border-white/40 data-[state=checked]:bg-gradient data-[state=checked]:border-white"
                          />
                          <span className="text-white font-mono text-sm">
                            {field.value
                              ? "Commentaire visible"
                              : "Commentaire masqué"}
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs font-mono" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <AlertDialogAction
                onClick={() =>
                  startTransition(async () => {
                    await deleteAdminComment({
                      commentId: comment.id,
                      path: pathname,
                    });
                  })
                }
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 font-mono font-bold flex items-center justify-center space-x-2"
              >
                <FaTrash className="text-sm" />
                <span>{isPending ? "Suppression..." : "Supprimer"}</span>
              </AlertDialogAction>

              <AlertDialogAction
                type="submit"
                className="flex-1 bg-gradient hover:opacity-80 text-white rounded-xl transition-all duration-300 renogare font-bold flex items-center justify-center space-x-2"
              >
                <FaEdit className="text-sm" />
                <span>{isPending ? "..." : "Mettre à jour"}</span>
              </AlertDialogAction>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
