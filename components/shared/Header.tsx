import Image from "next/image";
import Link from "next/link";

import { currentUser } from "@/lib/auth";

import { Navbar } from "./Navbar/Navbar";
import { Annonces } from "./Annonces";
import { LogoutBtn } from "../auth/LogoutBtn";

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="w-full border-b-2 border-black bg-dark">
      <Annonces />
      <div className="wrapper w-full h-full p-6 flex justify-between items-center bg-transparent">
        <Link href="/">
          <Image
            src="/logo/Logo_NoCapR.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex justify-end bg-dark">
          <Navbar />
          {user ? (
            <div className="h-8 text-[0.8rem] p-2 z-10">
              <LogoutBtn>Out</LogoutBtn>
            </div>
          ) : (
            <Link
              href="/connexion"
              className="h-8 text-[0.8rem] p-2 z-10 hover:text-primary"
            >
              In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
