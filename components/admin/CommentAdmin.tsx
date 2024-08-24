import { Pagination } from "../shared/Pagination";
import { CommentUpdate } from "./CommentUpdate";

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
    <>
      <div className="wrapper flex flex-col gap-2">
        {comments.map((comment: any) => (
          <CommentUpdate key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="wrapper">
        {totalPages > 1 && (
          <Pagination
            urlParamName={urlParamName}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};
