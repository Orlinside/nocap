import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { currentUser } from "@/lib/auth";

import { Navbar } from "./Navbar/Navbar";
import { LogoutBtn } from "../auth/LogoutBtn";
import { LoginForm } from "../auth/Card/LoginForm";

import { IoMdLogOut } from "react-icons/io";

export const Header = async () => {
  const user = await currentUser();
  const role = user?.role;

  return (
    <header className="w-full bg-transparent">
      <div className="wrapper flex justify-between items-center w-full h-full p-6 bg-transparent">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo/Logo_NoCapR_white.png"
            alt="logo"
            width={175}
            height={100}
            className="cursor-pointer z-[200]"
          />
        </Link>
        <div className="flex items-center justify-end bg-transparent">
          <Navbar />
          {user ? (
            <div className="flex justify-center items-center gap-4">
              <LogoutBtn>
                <IoMdLogOut
                  size={25}
                  className="text-white hover:text-white/80"
                  aria-label="Déconnexion"
                />
              </LogoutBtn>
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="renogare uppercase text-white text-sm hover:text-white/80"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <Suspense>
              <LoginForm />
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
};
