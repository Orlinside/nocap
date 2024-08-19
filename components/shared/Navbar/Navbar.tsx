"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { headerLinks } from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth.actions";

import { revalidatePath } from "next/cache";

export const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();
  const router = useRouter();

  //! BURGER TO CROSS
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    setNavActive(!navActive);
  };

  const currentUser = useCurrentUser();
  const [user, setUser] = useState(currentUser);

  console.log("NAVBAR", user);

  const onClick = () => {
    logout();
    router.push("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className="flex flex-col justify-between">
        <div
          className={`flex flex-col justify-center items-center gap-y-1 cursor-pointer relative ${
            isActive ? "active" : ""
          }`}
          onClick={handleClick}
        >
          <p className="z-10">{isActive ? "FERMER" : "MENU"}</p>
        </div>

        <div
          className={`w-full h-[85vh] flex flex-col justify-between fixed left-0 p-6 px-4 pt-32 bg-[rgba(33,33,33,0.78)] backdrop-blur-lg transition-all duration-500 ease opacity-0 z-[0] ${
            navActive ? "bottom-0 opacity-100 z-20" : "bottom-[-100vh]"
          }`}
        >
          <div className="flex flex-col gap-8">
            {headerLinks.map((item, index) => {
              const active =
                item.route === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.route);
              return (
                <div
                  className="w-full flex flex-col justify-center items-center"
                  key={index}
                  onClick={() => {
                    setActiveLink(item.route),
                      setIsActive(!isActive),
                      setNavActive(false);
                  }}
                >
                  <Link
                    href={item.route}
                    className={`${styles.nav__item} ${
                      active ? styles.activeLink : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}

            {user ? (
              <div className="flex-center flex-col gap-2 z-10">
                <Button
                  onClick={onClick}
                  className="button w-full sm:w-1/3 text-[1rem] text-center uppercase  py-4 rounded-sm hover:bg-red-400 transition-all ease duration-300 "
                >
                  Se Déconnecter
                </Button>
              </div>
            ) : (
              <div className="flex-center flex-col gap-2 z-10">
                <Link
                  href="/connexion"
                  className={`w-full sm:w-1/3 text-[1rem] text-center uppercase bg-black py-2 rounded-xl hover:bg-gray-400 transition-all ease duration-300 `}
                >
                  Se Connecter
                </Link>
                {/* <div className="flex flex-col gap-20 justify-between"> */}
                <p className="w-full sm:w-1/3 text-[0.8rem] sm:text-sm text-center">
                  Tu en as besoin pour mettre ton commentaires ! Pas de panique,
                  ca ne dure que 2 minutes...
                </p>
              </div>
            )}
          </div>
          <div className="text-[0.6rem] flex-center gap-8 z-10">
            <Link href="/mentions-legales" className="hover:text-gray-300">
              Mentions Légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-gray-300"
            >
              Politique de confidentialité
            </Link>
            <Link
              target="_blank"
              href={"https://www.inthegleam.com/"}
              className="hover:text-gray-300"
            >
              Website by inTheGleam
            </Link>
          </div>
        </div>
        {/* </div> */}
      </nav>
    </div>
  );
};
