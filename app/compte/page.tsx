import { LogoutBtn } from "@/components/auth/LogoutBtn";

import { Transition } from "@/components/shared/Transition";
import { currentUser } from "@/lib/auth";
import { getCommentsByUserId } from "@/lib/actions/user.actions";
import UpdateUserForm from "@/components/auth/UpdateUserForm";
import { DeleteCommentUser } from "@/components/shared/DeleteCommentUser";
import { DeleteUser } from "@/components/shared/DeleteUser";

import {
  FaUser,
  FaComment,
  FaQuoteLeft,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

export default async function Compte() {
  const user = await currentUser();
  const comments = user?.id ? await getCommentsByUserId(user.id) : null;

  return (
    <>
      <Transition>
        <div className="flex gap-2 justify-between">
          <div className="h-screen hidden sm:flex md:1/4 lg:w-1/3 bg-com backdrop-blur-lg fixed left-0"></div>

          <section className="wrapper pl-2 flex justify-end">
            <div className="mt-28 sm:mt-20 w-7/8 md:w-3/4 lg:w-2/3 flex flex-col gap-6">
              {/* Section informations utilisateur */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                    <FaUserCog className="text-white/60 text-lg" />
                  </div>
                  <h1 className="text-white renogare text-xl font-bold tracking-wider uppercase">
                    Mes informations
                  </h1>
                </div>
                <div className="pl-2">
                  <UpdateUserForm user={user} />
                </div>
              </div>

              {/* Section commentaires */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                    <FaComment className="text-white/60 text-lg" />
                  </div>
                  <h2 className="text-white renogare text-xl font-bold tracking-wider uppercase">
                    Mes commentaires
                  </h2>
                  {comments && (
                    <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs font-mono">
                      {comments.length}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {comments && comments.length > 0 ? (
                    comments.map((comment: any) => {
                      const formattedDate = new Date(
                        comment.createdAt
                      ).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });

                      return (
                        <div
                          key={comment.id}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          {/* Header du commentaire */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-white/60">
                              <FaCalendarAlt className="text-xs" />
                              <span className="font-mono text-xs">
                                {formattedDate}
                              </span>
                            </div>
                            <DeleteCommentUser commentId={comment.id} />
                          </div>

                          {/* Contenu du commentaire */}
                          <div className="relative">
                            <FaQuoteLeft className="absolute -top-1 -left-1 text-white/20 text-xs" />
                            <blockquote className="pl-6 pr-4 text-white/90 italic leading-relaxed">
                              {comment.content}
                            </blockquote>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                      <FaComment className="mx-auto text-white/30 text-2xl mb-3" />
                      <p className="text-white/60 font-mono text-sm">
                        Vous n&apos;avez encore écrit aucun commentaire
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section actions */}
              <div className="flex justify-end items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 flex items-center gap-4">
                  <LogoutBtn>
                    <div className="flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-300">
                      <FaSignOutAlt className="text-sm" />
                      <span className="font-mono font-bold text-xs tracking-wider">
                        Se déconnecter
                      </span>
                    </div>
                  </LogoutBtn>

                  {user && <div className="w-px h-6 bg-white/20"></div>}

                  {user && <DeleteUser userId={user.id} />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </>
  );
}
