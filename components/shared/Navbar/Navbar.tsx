"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useState } from "react";

import { headerLinks } from "@/constants";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (route: string) => {
    return route === "/" ? pathname === "/" : pathname.startsWith(route);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-transparent">
      <nav className="flex items-center bg-transparent">
        <button
          type="button"
          className="relative z-[110] flex w-20 cursor-pointer flex-col items-center justify-center text-[0.8rem] tracking-widest text-white hover:text-white/80 lg:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className="renogare bg-transparent py-1.5">
            {isMenuOpen ? "FERMER" : "MENU"}
          </span>
        </button>

        <div
          className={`fixed left-0 h-[100vh] w-full flex-col justify-between bg-com3 pb-6 pt-32 opacity-0 backdrop-blur-lg transition-all duration-500 ease sm:pt-28 lg:hidden ${
            isMenuOpen
              ? "top-0 z-[100] flex opacity-100"
              : "-top-[100vh] -z-50 flex"
          }`}
        >
          <div className="flex flex-col">
            {headerLinks.map((item, index) => {
              const active = isActiveRoute(item.route);

              return (
                <div
                  className={`w-full h-full flex flex-col justify-left p-10 sm:p-12 border-gray-300 hover:bg-dark/50 hover:backdrop-blur-sm transition-all ease-in-out duration-300 ${
                    active
                      ? "bg-dark/50 backdrop-blur-sm text-white font-bold"
                      : ""
                  }`}
                  key={index}
                  onClick={closeMenu}
                >
                  <Link
                    href={item.route}
                    className={`relative renogare wrapper text-2xl text-white sm:text-[2rem] uppercase tracking-widest transition-all ease duration-300 ${
                      active ? styles.activeLink : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-[0.5rem] sm:text-[0.6rem] flex-center gap-4 sm:gap-8 z-10">
            <Link
              onClick={closeMenu}
              href="/mentions-legales"
              className="text-white hover:text-gray-300"
            >
              Mentions Légales
            </Link>
            <Link
              onClick={closeMenu}
              href="/politique-de-confidentialite"
              className="text-white hover:text-gray-300"
            >
              Politique de confidentialité
            </Link>
            <Link
              target="_blank"
              href={"https://www.inthegleam.com/"}
              className="text-white hover:text-gray-300"
            >
              Website by inTheGleam
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-6 bg-transparent lg:flex xl:gap-8">
          {headerLinks.map((item) => {
            const active = isActiveRoute(item.route);

            return (
              <Link
                key={item.route}
                href={item.route}
                className={`renogare text-xs uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:text-white/75 ${
                  active ? styles.activeLink : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
