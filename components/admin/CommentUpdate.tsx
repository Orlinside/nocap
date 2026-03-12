"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ImportanceComment } from "@prisma/client";
import { toast } from "sonner";

import {
  deleteAdminComment,
  updateAdminComment,
} from "@/lib/actions/comment.actions";

import {
  FaUser,
  FaComment,
  FaExclamationTriangle,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

type CommentRecord = {
  id: string;
  content: string;
  createdAt: Date;
  isValid: boolean;
  importance: ImportanceComment;
  user?: {
    name: string | null;
  } | null;
};

const getImportanceLabel = (importance: ImportanceComment) => {
  if (importance === "HIGH") return "HAUTE";
  if (importance === "MEDIUM") return "NORMALE";
  return "FAIBLE";
};

const getImportanceBadgeClass = (importance: ImportanceComment) => {
  if (importance === "HIGH") return "bg-red-500/20 text-red-400";
  if (importance === "MEDIUM") return "bg-yellow-500/20 text-yellow-400";
  return "bg-green-500/20 text-green-400";
};

export const CommentUpdate = ({ comment }: { comment: CommentRecord }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [importance, setImportance] = useState<ImportanceComment>(
    comment.importance,
  );
  const [isVisible, setIsVisible] = useState(comment.isValid);
  const [isDeleted, setIsDeleted] = useState(false);

  const updateComment = (
    nextImportance: ImportanceComment,
    nextVisibility: boolean,
    successMessage: string,
  ) => {
    startTransition(async () => {
      try {
        const updatedComment = await updateAdminComment({
          commentId: comment.id,
          importance: nextImportance,
          isValid: nextVisibility,
          path: pathname,
        });

        if (updatedComment?.status) {
          setImportance(nextImportance);
          setIsVisible(nextVisibility);
          toast.success(successMessage);
          return;
        }

        toast.error("Erreur lors de la mise à jour du commentaire");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la mise à jour du commentaire");
      }
    });
  };

  const handleImportanceChange = (value: ImportanceComment) => {
    if (value === importance) return;
    updateComment(value, isVisible, "Niveau d'importance mis a jour");
  };

  const handleVisibilityToggle = () => {
    const nextVisibility = !isVisible;
    updateComment(
      importance,
      nextVisibility,
      nextVisibility ? "Commentaire affiche" : "Commentaire masque",
    );
  };

  const handleDelete = () => {
    if (!window.confirm("Supprimer ce commentaire de facon definitive ?")) {
      return;
    }

    startTransition(async () => {
      try {
        const deletedComment = await deleteAdminComment({
          commentId: comment.id,
          path: pathname,
        });

        if (deletedComment?.status) {
          setIsDeleted(true);
          toast.success("Commentaire supprime");
          router.refresh();
          return;
        }

        toast.error("Erreur lors de la suppression du commentaire");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la suppression du commentaire");
      }
    });
  };

  if (isDeleted) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/50">
      {/* Header */}
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="rounded-md bg-gradient p-1.5">
            <FaUser className="text-xs text-white" />
          </div>

          <div className="min-w-0">
            <p className="renogare truncate text-left text-sm font-bold uppercase tracking-[0.08em] text-white">
              {comment.user?.name || "ANONYME"}
            </p>
            <p className="font-mono text-[11px] text-white/60">
              {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${getImportanceBadgeClass(
              importance,
            )}`}
          >
            {getImportanceLabel(importance)}
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
              isVisible
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {isVisible ? (
              <FaEye className="text-[9px]" />
            ) : (
              <FaEyeSlash className="text-[9px]" />
            )}
            <span>{isVisible ? "VISIBLE" : "MASQUE"}</span>
          </div>
        </div>
      </div>

      {/* Comment content */}
      <div className="mb-2.5 rounded-lg bg-black/20 p-2.5">
        <div className="flex items-start gap-2">
          <FaComment className="mt-0.5 flex-shrink-0 text-xs text-white/40" />
          <p className="line-clamp-2 font-mono text-xs leading-relaxed text-white/80">
            &quot;{comment.content}&quot;
          </p>
        </div>
      </div>

      {/* Inline actions */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div className="flex items-center gap-2 rounded-md border border-white/15 bg-black/20 px-2 py-1.5">
          <FaExclamationTriangle className="text-[11px] text-white/60" />
          <select
            value={importance}
            onChange={(event) =>
              handleImportanceChange(event.target.value as ImportanceComment)
            }
            disabled={isPending}
            className="w-full bg-transparent text-[11px] uppercase tracking-[0.08em] text-white outline-none disabled:opacity-50"
          >
            <option value="LOW" className="bg-black text-white">
              Faible
            </option>
            <option value="MEDIUM" className="bg-black text-white">
              Normale
            </option>
            <option value="HIGH" className="bg-black text-white">
              Haute
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleVisibilityToggle}
          disabled={isPending}
          className="inline-flex h-8 items-center justify-center gap-1.5 border border-white/15 px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/75 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          {isVisible ? (
            <FaEyeSlash className="text-[10px]" />
          ) : (
            <FaEye className="text-[10px]" />
          )}
          {isVisible ? "Masquer" : "Afficher"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex h-8 items-center justify-center gap-1.5 border border-red-500/35 bg-red-500/10 px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200 disabled:opacity-50"
        >
          <FaTrash className="text-[10px]" />
          Supprimer
        </button>
      </div>
    </div>
  );
};
