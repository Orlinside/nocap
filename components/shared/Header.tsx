import React from "react";
import { Navbar } from "./Navbar/Navbar";
import { Annonces } from "./Annonces";

export const Header = () => {
  return (
    <header className="w-full">
      <div className="w-full h-full p-2 flex-center flex-col bg-slate-400">
        {/* LOGO */}
        <h1 className="text-[40px] font-bold">No Cap</h1>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Annonces />
        <Navbar />
      </div>
    </header>
  );
};
