import { CommentAdmin } from "@/components/admin/CommentAdmin";
import { RoleGate } from "@/components/auth/RoleGate";
import { getAllComments } from "@/lib/actions/comment.actions";
import { ImportanceComment, Role } from "@prisma/client";

export default async function GestionCommentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;

  const comments = (await getAllComments({ limit: 10, page })) as {
    data: ({ user: { name: string | null } } & {
      id: string;
      content: string;
      createdAt: Date;
      userId: string;
      isValid: boolean;
      importance: ImportanceComment;
    })[];
    totalPages: number;
  };
  // console.log(comments);
  return (
    <RoleGate allowedRole={Role.admin}>
      <section>
        <div className="wrapper">
          <div className="mt-20"></div>
          <h1 className="uppercase renogare bg-linear-text">
            Gestion des commentaires
          </h1>
          <div>
            <CommentAdmin
              comments={comments.data}
              page={page}
              totalPages={comments.totalPages}
              urlParamName={""}
            />
          </div>
        </div>
      </section>
    </RoleGate>
  );
}
