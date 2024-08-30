import { DeleteConfirmationCommentUser } from "@/components/admin/DeleteConfirmationCommentUser";
import { CommentForm } from "@/components/shared/CommentForm";
import { getAllCommentsForPublic } from "@/lib/actions/comment.actions";
import { currentUser } from "@/lib/auth";

export default async function CommentairesPage() {
  const user = await currentUser();
  const userId = user?.id;

  const comments = await getAllCommentsForPublic();

  return (
    <>
      <div className="flex gap-2 justify-between">
        <div className="h-screen w-1/6 sm:w-1/3 bg-com backdrop-blur-lg fixed left-0"></div>

        <section className="wrapper pl-2 flex justify-end">
          <div className="mt-20 w-5/6 sm:w-2/3 flex flex-col gap-2">
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
                      "rounded-xl bg-gradient-to-t from-[#fc0010] to-[#FE9D01]  overflow-hidden p-2 flex flex-col justify-between";
                    pseudoClass =
                      "renogare text-2xl font-bold text-white border-b pb-1 flex justify-between";
                    commentClass = "text-[1.5rem] text-white sm:ml-8  p-2";
                    break;
                  case "MEDIUM":
                    entireDivClass =
                      "bg-gradient-to-t from-[#910019] to-[#5B142C] rounded-xl p-2 flex flex-col justify-between";
                    pseudoClass =
                      "renogare text-lg font-bold text-white border-b pb-1 flex justify-between";
                    commentClass =
                      " text-[1rem] text-white sm:ml-8 p-2 rounded-xl";
                    break;
                  case "LOW":
                    entireDivClass =
                      "bg-gradient-to-t from-transparent to-transparent border rounded-xl p-2 flex flex-col justify-between";
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
                        {comment.user.name}
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
      {/*  */}
    </>
  );
}
