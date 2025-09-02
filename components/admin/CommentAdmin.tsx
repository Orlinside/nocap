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
    <div className="space-y-6">
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-16">
          <FaCommentSlash className="text-5xl text-white/20 mx-auto mb-4" />
          <h3 className="text-xl text-white renogare font-bold tracking-wider mb-2">
            AUCUN COMMENTAIRE
          </h3>
          <p className="text-white/60 font-mono">
            Aucun commentaire à modérer pour le moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {comments.map((comment: any) => (
            <CommentUpdate key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
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
