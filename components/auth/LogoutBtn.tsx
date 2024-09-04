"use client";

import { logout } from "@/lib/actions/auth.actions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface LogoutBtnProps {
  children?: React.ReactNode;
}

export const LogoutBtn = ({ children }: LogoutBtnProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    logout(pathname);
    // router.push("/");
    toast.success("Déconnection réussie");
  };
  return (
    <span
      onClick={onClick}
      className="flex-center cursor-pointer text-white hover:text-primary"
    >
      {children}
    </span>
  );
};
