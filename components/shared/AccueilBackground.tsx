"use client";
import { useState, useEffect } from "react";

import { Carousel } from "./Carousel/Swiper";
import { Pagination } from "./Pagination";

import { motion, AnimatePresence } from "framer-motion";
import { AnnoncesMobile } from "./AnnoncesMobile";

type AccueilProps = {
  user: any;
  party: any;
  totalPages: number;
  page: number;
  urlParamName: string;
  isReact: boolean;
};

export const AccueilBackground = ({
  user,
  party,
  totalPages,
  page,
  urlParamName = "",
  isReact,
}: AccueilProps) => {
  const [activePhotoUrl, setActivePhotoUrl] = useState(party[0].photos[0].url);

  const handlePhotoChange = (newPhotoUrl: string) => {
    setActivePhotoUrl(newPhotoUrl);
  };

  const formattedDate = new Date(party[0].startDateTime).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="h-full w-full flex flex-col justify-between pb-6 items-center overflow-hidden relative">
      <motion.div
        key={page} // Utilisez la clé pour déclencher l'animation à chaque changement de page
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: "grayscale(100%),  blur(2px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "grayscale(100%),  blur(2px)",
        }}
        exit={{ opacity: 0, scale: 0.8, filter: "grayscale(100%), blur(5px)" }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute inset-0 bg-cover bg-center blur-lg transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${activePhotoUrl ?? party[0].photos[0].url})`,
        }}
      ></motion.div>

      <div className="relative z-10 w-full h-full flex flex-col justify-around md:justify-between md:gap-4 lg:gap-0">
        <h2 className="text-xl text-white renogare tracking-widest text-center mt-32 flex flex-col justify-center items-center lg:hidden ">
          {party[0].name}{" "}
          <span className="text-sm font-mono text-white">{formattedDate}</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={page} // Utilisez la clé pour déclencher l'animation à chaque changement de page
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="lg:mt-32 xl:mt-28"
          >
            <div className="w-full h-full flex-1 items-center justify-center">
              <Carousel
                photos={party[0].photos}
                user={user}
                isReact={isReact}
                onPhotoChange={handlePhotoChange}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          key={page}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full wrapper flex gap-8 justify-center lg:justify-between items-center"
        >
          <h2 className="text-2xl text-white renogare tracking-widest hidden lg:flex lg:justify-center items-center gap-4">
            {party[0].name}{" "}
            <span className="text-sm font-mono text-white">
              {formattedDate}
            </span>
          </h2>

          {totalPages > 1 && (
            <div className="">
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
