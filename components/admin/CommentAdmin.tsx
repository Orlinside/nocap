import { CommentUpdate } from "./CommentUpdate";

export const CommentAdmin = ({ comments }: { comments: any }) => {
  return (
    <div className="wrapper">
      {comments.map((comment: any) => (
        <CommentUpdate key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
