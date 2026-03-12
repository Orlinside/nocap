import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { currentUser } from "@/lib/auth";

import { Navbar } from "./Navbar/Navbar";
import { LoginForm } from "../auth/Card/LoginForm";

import { MdOutlineAccountCircle } from "react-icons/md";

export const Header = async () => {
  const user = await currentUser();
  const role = user?.role;

  return (
    <header className="w-full bg-transparent">
      <div className="flex items-center justify-between bg-transparent px-4 pt-3 lg:px-12 lg:py-4">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo/Logo_NoCapR_white.png"
            alt="logo"
            width={140}
            height={100}
            className="cursor-pointer w-20 h-auto object-contain"
          />
        </Link>
        <div className="flex items-center justify-end gap-4 bg-transparent lg:gap-6">
          <Navbar />
          {user ? (
            <div className="flex justify-center items-center gap-4">
              <Link
                href="/compte"
                className="renogare uppercase text-white text-sm hover:text-white/80 z-[200]"
              >
                <MdOutlineAccountCircle
                  size={25}
                  className="text-white hover:text-white/80 z-[200]"
                  aria-label="Mon Compte"
                />
              </Link>
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="renogare uppercase text-white text-sm hover:text-white/80 z-[200]"
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

