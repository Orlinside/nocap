import { DeleteConfirmationCommentUser } from "@/components/admin/DeleteConfirmationCommentUser";
import { CommentForm } from "@/components/shared/CommentForm";
import { getAllCommentsForPublic } from "@/lib/actions/comment.actions";
import { currentUser } from "@/lib/auth";
import Image from "next/image";

import { Transition } from "@/components/shared/Transition";
import { RemainingViewportHeight } from "@/components/shared/RemainingViewportHeight";

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
  const hasComments = Array.isArray(comments) && comments.length > 0;
  const totalComments = Array.isArray(comments) ? comments.length : 0;

  return (
    <Transition>
      <RemainingViewportHeight className="relative w-full overflow-hidden text-white">
        <div className="relative z-10 mx-auto h-full min-h-0 w-full max-w-[1600px] px-4 py-4 md:px-8 lg:px-12 lg:py-6">
          <div className="grid h-full min-h-0 gap-4 lg:grid-cols-12 xl:gap-8">
            <aside className="hidden min-h-0 lg:col-span-4 lg:block">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border-y border-white/15 px-5 py-7 sm:px-7">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative h-40 w-40 xl:h-52 xl:w-52">
                    <Image
                      src="/logo/logo_cancel.png"
                      alt=""
                      fill
                      className="object-contain opacity-[0.08]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="relative">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                    No Cap Community
                  </p>
                  <h1 className="renogare mt-4 text-3xl uppercase leading-[1.05] text-white sm:text-4xl">
                    Commentaires
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                    Laisse ton ressenti sur les soirees passees et retrouve les
                    retours de la communaute dans un mur epure, inspire de la
                    page d&apos;accueil.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                    <FaComment className="text-sm text-white/60" />
                    <p className="text-xs uppercase tracking-[0.22em] text-white/75">
                      {totalComments} avis publics
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <section className="min-h-0 lg:col-span-8">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/15 bg-white/[0.03] px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
                  <div className="border-b border-x border-white/20 bg-[#080a0d]/95 px-5 py-2 backdrop-blur-md">
                    <p className="renogare text-center text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                      Mur des commentaires
                    </p>
                  </div>
                </div>

                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 sm:space-y-3">
                  {hasComments ? (
                    comments.map((comment: any) => {
                      const formattedDate = new Date(
                        comment.createdAt,
                      ).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });

                      let containerClass = "border-white/20 bg-white/[0.04]";
                      let iconComponent = <FaUser className="text-white/60" />;
                      let textSize = "text-sm";

                      switch (comment.importance) {
                        case "HIGH":
                          containerClass =
                            "border-yellow-300/45 bg-yellow-300/[0.07]";
                          iconComponent = (
                            <FaCrown className="text-yellow-300" />
                          );
                          textSize = "text-sm sm:text-base";
                          break;
                        case "MEDIUM":
                          containerClass =
                            "border-blue-400/45 bg-blue-500/[0.08]";
                          iconComponent = <FaStar className="text-blue-300" />;
                          textSize = "text-sm";
                          break;
                        case "LOW":
                          containerClass = "border-white/20 bg-white/[0.03]";
                          iconComponent = <FaUser className="text-white/55" />;
                          textSize = "text-xs sm:text-sm";
                          break;
                        default:
                          break;
                      }

                      return (
                        <article
                          key={comment.id}
                          className={`border px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07] sm:px-4 sm:py-3 ${containerClass}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 bg-black/30 sm:h-9 sm:w-9">
                                {iconComponent}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                  <h3 className="renogare text-xs uppercase tracking-[0.14em] text-white sm:text-sm">
                                    {comment.user?.name || "Anonyme"}
                                  </h3>
                                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                                    {formattedDate}
                                  </span>
                                </div>

                                <div className="relative">
                                  <FaQuoteLeft className="absolute left-0 top-0 text-xs text-white/25" />
                                  <blockquote
                                    className={`pl-4 pr-1 leading-relaxed text-white/90 ${textSize}`}
                                  >
                                    {comment.content}
                                  </blockquote>
                                </div>
                              </div>
                            </div>

                            {comment.userId === userId && (
                              <div className="shrink-0 pt-0.5">
                                <DeleteConfirmationCommentUser
                                  commentId={comment.id}
                                />
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <div className="border border-white/15 bg-white/[0.03] px-6 py-12 text-center">
                      <FaComment className="mx-auto mb-4 text-3xl text-white/35" />
                      <p className="text-sm uppercase tracking-[0.2em] text-white/65">
                        Aucun commentaire pour le moment
                      </p>
                      <p className="mt-2 text-white/50">
                        Lance le premier message pour demarrer la conversation.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-2 shrink-0 border-t border-white/15 pt-2">
                  <CommentForm userId={userId || ""} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </RemainingViewportHeight>
    </Transition>
  );
}
