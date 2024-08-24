import { CommentAdmin } from "@/components/admin/CommentAdmin";
import { RoleGate } from "@/components/auth/RoleGate";
import { getAllComments } from "@/lib/actions/comment.actions";
import { Role } from "@prisma/client";

export default async function GestionCommentPage() {
  const comments = await getAllComments({ limit: 10, page: 1 });
  // console.log(comments);
  return (
    <RoleGate allowedRole={Role.admin}>
      <section>
        <div className="wrapper">
          <h1 className="uppercase">Gestion des commentaires</h1>
          <div>
            <CommentAdmin comments={comments.data} />
          </div>
        </div>
      </section>
    </RoleGate>
  );
}
