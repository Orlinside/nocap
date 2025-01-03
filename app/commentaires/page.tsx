import { DeleteConfirmationCommentUser } from "@/components/admin/DeleteConfirmationCommentUser";
import { CommentForm } from "@/components/shared/CommentForm";
import { getAllCommentsForPublic } from "@/lib/actions/comment.actions";
import { currentUser } from "@/lib/auth";

import { Transition } from "@/components/shared/Transition";

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
            <div className="mt-28 sm:mt-20 w-7/8 md:w-3/4 lg:w-2/3 flex flex-col gap-4">
              <div className="w-full text-right mb-4">
                <CommentForm userId={userId || ""} />
              </div>
              {Array.isArray(comments) ? (
                comments.map((comment: any) => {
                  let entireDivClass = "";
                  let pseudoClass = "";
                  let commentClass = "";
                  switch (comment.importance) {
                    case "HIGH":
                      entireDivClass =
                        "rounded-xl bg-gradient overflow-hidden p-2 flex flex-col justify-between";
                      pseudoClass =
                        "renogare text-2xl font-bold text-white border-b pb-1 flex justify-between";
                      commentClass =
                        "text-[1.5rem] font-bold text-white sm:ml-8  p-2";
                      break;
                    case "MEDIUM":
                      entireDivClass =
                        "bg-gradient-to-t from-transparent to-transparent border rounded-xl p-2 flex flex-col justify-between boxShadow";
                      pseudoClass =
                        "renogare text-lg font-bold text-white border-b pb-1 flex justify-between";
                      commentClass =
                        " text-[1rem] text-white font-bold sm:ml-8 p-2 rounded-xl";
                      break;
                    case "LOW":
                      entireDivClass =
                        "bg-gradient-to-t from-transparent to-transparent border rounded-xl p-2 flex flex-col justify-between boxShadow";
                      pseudoClass =
                        "renogare text-sm font-bold text-white border-b pb-1 flex justify-between";
                      commentClass =
                        "text-[0.8rem] text-white sm:ml-8 p-2 rounded-xl";
                      break;
                    default:
                      entireDivClass = "comment-default";
                  }

                  const formattedDate = new Date(
                    comment.createdAt
                  ).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <div key={comment.id} className={entireDivClass}>
                      <div className="flex flex-col">
                        <h2 className={pseudoClass}>
                          {comment.user?.name || "Anonyme"}
                          <span className="font-mono text-[0.7rem] text-white/50">
                            {formattedDate}
                          </span>
                        </h2>
                        <p className={commentClass}>
                          &apos;&apos; {comment.content} &apos;&apos;
                        </p>
                      </div>
                      {comment.userId === userId && (
                        <DeleteConfirmationCommentUser commentId={comment.id} />
                      )}
                    </div>
                  );
                })
              ) : (
                <p>Chargement des commentaires.</p>
              )}
            </div>
          </section>
        </div>
      </Transition>
    </>
  );
}
