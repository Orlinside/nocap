"use client";

import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

interface LogoutBtnProps {
  children?: React.ReactNode;
}

export const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const router = useRouter();

  const onClick = () => {
    logout();
    router.push("/");
  };
  return (
    <span
      onClick={onClick}
      className="flex-center cursor-pointer hover:text-primary"
    >
      {children}
    </span>
  );
};
