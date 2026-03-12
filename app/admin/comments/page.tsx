import { CommentAdmin } from "@/components/admin/CommentAdmin";
import { RoleGate } from "@/components/auth/RoleGate";
import { getAllComments } from "@/lib/actions/comment.actions";
import { ImportanceComment, Role } from "@prisma/client";
import { FaSearch } from "react-icons/fa";

export default async function GestionCommentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;
  const searchNameParam = Array.isArray(searchParams?.name)
    ? searchParams.name[0]
    : searchParams?.name;

  const page = Number(pageParam) || 1;
  const searchName = searchNameParam?.trim() ?? "";

  const comments = (await getAllComments({
    limit: 10,
    page,
    searchName,
  })) as {
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
        <div className="mt-20 sm:mt-24">
          {/* Header */}
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="renogare mb-1 text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
                COMMENTAIRES
              </h1>
              <p className="font-mono text-sm text-white/70">
                Modération et gestion des commentaires
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-xs text-white/60">
                {comments.data.length} résultat
                {comments.data.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <form
            method="get"
            className="mb-4 flex flex-col gap-2 rounded-lg border border-white/10 bg-black/25 p-2.5 backdrop-blur-sm sm:flex-row sm:items-center"
          >
            <div className="relative w-full">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-white/45" />
              <input
                type="text"
                name="name"
                defaultValue={searchName}
                placeholder="Rechercher un commentaire par nom..."
                className="h-9 w-full border border-white/20 bg-black/35 pl-9 pr-3 text-xs text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="h-9 whitespace-nowrap border border-white/20 px-3 text-[11px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              Rechercher
            </button>

            {searchName && (
              <a
                href="/admin/comments"
                className="inline-flex h-9 items-center justify-center whitespace-nowrap border border-white/15 px-3 text-[11px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
              >
                Effacer
              </a>
            )}
          </form>

          {/* Comments Section */}
          <div className="rounded-xl border border-white/10 bg-black/20 p-3 backdrop-blur-sm">
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
