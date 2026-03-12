import { LogoutBtn } from "@/components/auth/LogoutBtn";

import { Transition } from "@/components/shared/Transition";
import { RemainingViewportHeight } from "@/components/shared/RemainingViewportHeight";
import { currentUser } from "@/lib/auth";
import { getCommentsByUserId } from "@/lib/actions/user.actions";
import UpdateUserForm from "@/components/auth/UpdateUserForm";
import { DeleteCommentUser } from "@/components/shared/DeleteCommentUser";
import { DeleteUser } from "@/components/shared/DeleteUser";
import Image from "next/image";

import {
  FaComment,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserCog,
  FaUser,
  FaUserShield,
  FaTrash,
} from "react-icons/fa";

export default async function Compte() {
  const user = await currentUser();
  const comments = (user?.id ? await getCommentsByUserId(user.id) : []) ?? [];

  return (
    <Transition>
      <RemainingViewportHeight className="relative w-full overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(252,0,16,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(254,157,1,0.04) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

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

                <div className="relative flex h-full min-h-0 flex-col">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      No Cap Community
                    </p>
                    <h1 className="renogare mt-4 text-3xl uppercase leading-[1.05] text-white sm:text-4xl">
                      Mon compte
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                      Gère tes informations personnelles et retrouve
                      l&apos;historique de tes commentaires.
                    </p>

                    <div className="mt-7 flex flex-col gap-2 text-white/75">
                      <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                        <FaUserShield className="text-sm text-white/60" />
                        <p className="text-xs uppercase tracking-[0.22em]">
                          Espace privé
                        </p>
                      </div>

                      <div className="inline-flex w-fit items-center gap-3 border border-white/20 bg-white/[0.03] px-4 py-2">
                        <FaComment className="text-sm text-white/60" />
                        <p className="text-xs uppercase tracking-[0.22em]">
                          {comments.length} commentaire
                          {comments.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-white/15 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <LogoutBtn>
                        <div className="inline-flex h-8 items-center gap-2 border border-white/20 px-3 text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                          <FaSignOutAlt className="text-[10px]" />
                          Se deconnecter
                        </div>
                      </LogoutBtn>

                      {user && (
                        <div className="inline-flex h-8 items-center border border-red-400/30 bg-red-500/10 px-3 text-[10px] uppercase tracking-[0.16em] text-red-200">
                          <FaTrash className="mr-2 text-[10px]" />
                          <DeleteUser userId={user.id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <section className="min-h-0 lg:col-span-8">
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/15 bg-white/[0.03] px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
                  <div className="border-b border-x border-white/20 bg-[#080a0d]/95 px-5 py-2 backdrop-blur-md">
                    <p className="renogare text-center text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                      Gestion du compte
                    </p>
                  </div>
                </div>

                <div className="mb-3 shrink-0 border-b border-white/10 pb-3 lg:hidden">
                  <div className="flex items-center gap-2 text-white/70">
                    <FaUser className="text-sm" />
                    <p className="text-xs uppercase tracking-[0.2em]">
                      Mon compte
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Mets à jour ton profil et gère tes commentaires.
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <div className="space-y-3">
                    <div className="border border-white/15 bg-black/25 p-4">
                      <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
                        <FaUserCog className="text-sm text-white/60" />
                        <h2 className="renogare text-sm uppercase tracking-[0.15em] text-white/90">
                          Informations personnelles
                        </h2>
                      </div>
                      <UpdateUserForm user={user} />
                    </div>

                    <div className="border border-white/15 bg-black/25 p-4">
                      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <FaComment className="text-sm text-white/60" />
                          <h2 className="renogare text-sm uppercase tracking-[0.15em] text-white/90">
                            Mes commentaires
                          </h2>
                        </div>
                        <span className="border border-white/15 bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                          {comments.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {comments.length > 0 ? (
                          comments.map((comment: any) => {
                            const formattedDate = new Date(
                              comment.createdAt,
                            ).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            });

                            return (
                              <div
                                key={comment.id}
                                className="border border-white/10 bg-black/20 px-3 py-2.5 transition-colors duration-300 hover:bg-black/30 hover:border-white/20"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-white/60">
                                    <FaCalendarAlt className="text-[10px]" />
                                    <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
                                      {formattedDate}
                                    </span>
                                  </div>
                                  <div className="text-white/70 hover:text-white">
                                    <DeleteCommentUser commentId={comment.id} />
                                  </div>
                                </div>

                                <p className="font-mono text-sm leading-relaxed text-white/85">
                                  {comment.content}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="border border-white/10 bg-black/20 px-4 py-8 text-center">
                            <FaComment className="mx-auto mb-2 text-xl text-white/30" />
                            <p className="font-mono text-sm text-white/60">
                              Vous n&apos;avez encore ecrit aucun commentaire
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 shrink-0 border-t border-white/15 pt-2 lg:hidden">
                  <div className="flex flex-wrap items-center gap-2">
                    <LogoutBtn>
                      <div className="inline-flex h-8 items-center gap-2 border border-white/20 px-3 text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                        <FaSignOutAlt className="text-[10px]" />
                        Se deconnecter
                      </div>
                    </LogoutBtn>

                    {user && (
                      <div className="inline-flex h-8 items-center border border-red-400/30 bg-red-500/10 px-3 text-[10px] uppercase tracking-[0.16em] text-red-200">
                        <FaTrash className="mr-2 text-[10px]" />
                        <DeleteUser userId={user.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </RemainingViewportHeight>
    </Transition>
  );
}
