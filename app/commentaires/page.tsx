import { DeleteConfirmationCommentUser } from "@/components/admin/DeleteConfirmationCommentUser";
import { CommentForm } from "@/components/shared/CommentForm";
import { getAllCommentsForPublic } from "@/lib/actions/comment.actions";
import { currentUser } from "@/lib/auth";

import { Transition } from "@/components/shared/Transition";

import {
  FaQuoteLeft,
  FaUser,
  FaCrown,
  FaStar,
  FaComment,
} from "react-icons/fa";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commentaires | No Cap",
  description:
    "La page des commentaires de No Cap, pour donner votre avis sur les soirées.",
  openGraph: {
    images: [
      { url: "https://www.nocap.fr/api/opengraph", width: 1200, height: 630 },
    ],
  },
};

export default async function CommentairesPage() {
  const user = await currentUser();
  const userId = user?.id;

  const comments = await getAllCommentsForPublic();

  return (
    <>
      <Transition>
        <div className="flex gap-2 justify-between">
          <div className="h-screen hidden sm:flex md:1/4 lg:w-1/3 bg-com backdrop-blur-lg fixed left-0"></div>

          <section className="wrapper pl-2 flex justify-end">
            <div className="mt-28 sm:mt-20 w-7/8 md:w-3/4 lg:w-2/3 flex flex-col gap-6">
              {/* Header avec formulaire */}
              <div className="sm:flex justify-between items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <FaComment className="text-white/60 text-xl" />
                  <h1 className="text-white renogare text-2xl font-bold tracking-wider">
                    COMMENTAIRES
                  </h1>
                </div>
                <CommentForm userId={userId || ""} />
              </div>

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {Array.isArray(comments) ? (
                  comments.map((comment: any) => {
                    const formattedDate = new Date(
                      comment.createdAt
                    ).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    });

                    // Configuration moderne basée sur l'importance
                    let containerClass = "";
                    let iconComponent = null;
                    let textSize = "";

                    switch (comment.importance) {
                      case "HIGH":
                        containerClass = "bg-gradient border-white/40";
                        iconComponent = <FaCrown className="text-yellow-400" />;
                        textSize = "text-lg";
                        break;
                      case "MEDIUM":
                        containerClass = "bg-white/15 border-white/25";
                        iconComponent = <FaStar className="text-blue-400" />;
                        textSize = "text-base";
                        break;
                      case "LOW":
                        containerClass = "bg-white/10 border-white/20";
                        iconComponent = <FaUser className="text-gray-400" />;
                        textSize = "text-sm";
                        break;
                      default:
                        containerClass = "bg-white/10 border-white/20";
                        iconComponent = <FaUser className="text-white/60" />;
                        textSize = "text-base";
                    }

                    return (
                      <div
                        key={comment.id}
                        className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-white/40 hover:bg-white/5 ${containerClass}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Avatar et icône */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                {iconComponent}
                              </div>
                            </div>

                            {/* Contenu */}
                            <div className="flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-white renogare font-bold tracking-wider">
                                  {comment.user?.name || "Anonyme"}
                                </h3>
                                <span className="text-white/50 font-mono text-xs">
                                  {formattedDate}
                                </span>
                              </div>

                              {/* Citation */}
                              <div className="relative">
                                <FaQuoteLeft className="absolute -top-1 -left-1 text-white/20 text-sm" />
                                <blockquote
                                  className={`pl-6 pr-4 text-white/90 italic leading-relaxed ${textSize}`}
                                >
                                  {comment.content}
                                </blockquote>
                              </div>
                            </div>
                          </div>

                          {/* Bouton supprimer */}
                          {comment.userId === userId && (
                            <div className="flex-shrink-0 ml-4">
                              <DeleteConfirmationCommentUser
                                commentId={comment.id}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                    <FaComment className="mx-auto text-white/40 text-3xl mb-4" />
                    <p className="text-white/70 font-mono">
                      Chargement des commentaires...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </>
  );
}
