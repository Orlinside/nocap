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
      <section className="wrapper">
        {Array.isArray(comments) ? (
          comments.map((comment: any) => {
            let commentClass = "";
            switch (comment.importance) {
              case "HIGH":
                commentClass =
                  "bg-green-500 flex flex-col sm:flex-row justify-between";
                break;
              case "MEDIUM":
                commentClass =
                  "bg-blue-500 flex flex-col sm:flex-row justify-between";
                break;
              case "LOW":
                commentClass =
                  "bg-gray-500 flex flex-col sm:flex-row justify-between";
                break;
              default:
                commentClass = "comment-default";
            }

            return (
              <div key={comment.id} className={commentClass}>
                <div className="flex gap-8">
                  <h2>{comment.user.name}</h2>
                  <p>{comment.content}</p>
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
      </section>
      <section className="wrapper">
        <CommentForm userId={userId || ""} />
      </section>
    </>
  );
}
