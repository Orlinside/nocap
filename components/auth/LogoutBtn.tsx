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
    router.refresh();
    toast.success("Déconnexion réussie");
    setTimeout(() => {
      redirectToHome();
    }, 300); // petit délai pour laisser le refresh s'effectuer
  };

  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <span
      onClick={onClick}
      className="flex-center cursor-pointer text-white text-[12px] hover:text-white/80"
    >
      {children}
    </span>
  );
};
