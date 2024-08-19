"use client";

import { logout } from "@/lib/actions/auth.actions";
import { currentUser } from "@/lib/auth";
import Link from "next/link";
import { Button } from "../ui/button";

export const BtnConnect = async () => {
  const user = await currentUser();
  console.log("BTN", user);

  const onClick = () => {
    logout();
    window.location.reload();
  };

  return (
    <div>
      {user !== null ? (
        <div className="flex-center flex-col gap-2 z-10">
          <Button
            onClick={onClick}
            className="button w-full sm:w-1/3 text-[1rem] sm:text-[1rem] text-center uppercase  py-4 rounded-sm hover:bg-red-400 transition-all ease duration-300 "
          >
            Se Déconnecter
          </Button>
        </div>
      ) : (
        <div className="flex-center flex-col gap-2 z-10">
          <Link
            href="/connexion"
            className={`w-full sm:w-1/3 text-[1.2rem] sm:text-[1.5rem] text-center uppercase  bg-black py-2 rounded-sm hover:bg-red-400 transition-all ease duration-300 `}
          >
            Se Connecter
          </Link>
          <p className="w-full sm:w-1/3 text-[0.8rem] sm:text-sm text-center">
            Tu en as besoin pour mettre ton commentaires ! Pas de panique, ca ne
            dure que 2 minutes...
          </p>
        </div>
      )}
    </div>
  );
};
