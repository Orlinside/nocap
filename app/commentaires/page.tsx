import { CommentForm } from "@/components/shared/CommentForm";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function CommentairesPage() {
  const user = await currentUser();
  const userId = user?.id;

  return (
    <div className="wrapper">
      <CommentForm userId={userId || ""} />
    </div>
  );
}
