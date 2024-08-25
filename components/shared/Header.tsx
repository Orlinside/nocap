import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { currentUser } from "@/lib/auth";

import { Navbar } from "./Navbar/Navbar";
import { Annonces } from "./Annonces";
import { LogoutBtn } from "../auth/LogoutBtn";
import { LoginForm } from "../auth/Card/LoginForm";

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-full bg-transparent">
      {/* <Annonces /> */}
      <div className="wrapper w-full h-full p-6 flex justify-center items-center bg-transparent">
        <div></div>
        <Link href="/">
          <Image
            src="/logo/Logo_NoCapR.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex justify-end bg-transparent">
          <Navbar />
          {user ? (
            <div className="h-8 text-[0.8rem] p-2 z-10">
              <LogoutBtn>Out</LogoutBtn>
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
