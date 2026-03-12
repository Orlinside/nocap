import { Pagination } from "../shared/Pagination";
import { CommentUpdate } from "./CommentUpdate";
import { FaComment, FaCommentSlash } from "react-icons/fa";

type CommentAdminProps = {
  comments: any;
  totalPages: number;
  urlParamName: string;
  page: number;
};

export const CommentAdmin = ({
  comments,
  totalPages,
  urlParamName = "",
  page,
}: CommentAdminProps) => {
  return (
    <div className="space-y-4">
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="py-10 text-center">
          <FaCommentSlash className="mx-auto mb-3 text-3xl text-white/20" />
          <h3 className="renogare mb-1 text-lg font-bold tracking-[0.12em] text-white">
            AUCUN COMMENTAIRE
          </h3>
          <p className="font-mono text-sm text-white/60">
            Aucun commentaire à modérer pour le moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {comments.map((comment: any) => (
            <CommentUpdate key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-3">
          <Pagination
            urlParamName={urlParamName}
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};
