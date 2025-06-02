"use client";

// On importe signIn depuis next-auth/react quand on est dans un client component
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export function Social() {
  const onClick = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <button
        className="w-full h-[35px] flex justify-center items-center bg-dark p-2 rounded-[5px] hover:bg-dark/60 transition-all ease-in-out duration-200"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </button>
      {/* <button
        className="w-full h-[40px] flex justify-center items-center bg-gray-300 p-2 rounded-xl hover:bg-slate-300 transition-all ease-in-out duration-200"
        onClick={() => onClick("instagram")}
      >
        <FaInstagram className="h-5 w-5" />
      </button> */}
    </div>
  );
}
