import React from "react";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-700 uppercase font-bold tracking-widest 5 p-3 rounded-xl rubik flex items-center justify-center gap-x-2 text-sm text-destructive">
      <p className="">{message}</p>
    </div>
  );
};
