"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { headerLinks } from "@/constants";

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

  return (
    <div>
      <nav className="flex flex-col justify-between">
        <div
          className={`flex flex-col justify-center items-center gap-y-1 cursor-pointer relative ${
            isActive ? "active" : ""
          }`}
          onClick={handleClick}
        >
          <p className="z-[110] h-8 w-20 text-[0.8rem] renogare bg-transparent flex-center tex-dark bg-gray-500 hover:text-white/80 tracking-widest">
            {isActive ? "FERMER" : "MENU"}
          </p>
        </div>

        <div
          className={`w-full h-[100vh] flex flex-col justify-between fixed left-0 pb-6 pt-32 sm:pt-28 bg-[rgba(33,33,33,0.29)] backdrop-blur-lg transition-all duration-500 ease opacity-0 z-[100] ${
            navActive ? "bottom-0 opacity-100 z-[100]" : "bottom-[-100vh]"
          }`}
        >
          <div className="flex flex-col">
            {headerLinks.map((item, index) => {
              const active =
                item.route === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.route);
              return (
                <div
                  className={`w-full h-full flex flex-col justify-left p-8 border-gray-300 hover:bg-dark transition-all ease-in-out duration-300 ${
                    active ? "bg-com text-second font-bold" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveLink(item.route),
                      setIsActive(!isActive),
                      setNavActive(false);
                  }}
                >
                  <Link
                    href={item.route}
                    className={`relative renogare wrapper text-2xl sm:text-[2rem] uppercase tracking-widest transition-all ease duration-300 ${
                      active ? styles.activeLink : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
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
      </nav>
    </div>
  );
};
