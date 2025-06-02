import React from "react";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className=" bg-gradient 5 p-2 rounded-xl uppercase flex items-center justify-center gap-x-2 text-xs text-emerald-500">
      <p className="">{message}</p>
    </div>
  );
};
