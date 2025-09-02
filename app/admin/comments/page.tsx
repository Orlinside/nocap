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

  return (
    <RoleGate allowedRole={Role.admin}>
      <section className="wrapper min-h-screen">
        <div className="mt-28 sm:mt-32">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl text-white renogare font-bold tracking-widest mb-2">
                COMMENTAIRES
              </h1>
              <p className="text-white/70 font-mono text-lg">
                Modération et gestion des commentaires
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2">
                <span className="text-white/60 font-mono text-sm">
                  {comments.data.length} commentaire
                  {comments.data.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
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
