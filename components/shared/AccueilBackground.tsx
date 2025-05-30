"use client";
import { useEffect, useState } from "react";

import { Carousel } from "./Carousel/Swiper";
import { Pagination } from "./Pagination";

import { motion, AnimatePresence } from "framer-motion";
import { PartyList } from "./PartyList";
import { AnnoncesMobile } from "./AnnoncesMobile";
import { BandeauMobile } from "./BandeauMobile";

type AccueilProps = {
  user: any;
  allParties?: any[];
  party: any;
  totalPages: number;
  page: number;
  urlParamName: string;
  isReact: boolean;
  lastParty?: any;
};

export const AccueilBackground = ({
  user,
  allParties,
  party,
  lastParty,
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

  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 6000); // Masquer l'indicateur après 5 secondes
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-full w-full flex flex-col justify-between pb-0 items-center overflow-hidden relative">
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
        className="absolute inset-0 bg-cover bg-center blur-lg transition-all duration-500 ease-in-out "
        style={{
          backgroundImage: `url(${activePhotoUrl ?? party[0].photos[0].url})`,
        }}
      ></motion.div>

      <div className="relative z-10 w-full h-screen flex flex-col justify-center md:justify-between gap-8 md:gap-4 lg:gap-0">
        <div className="w-full h-auto flex items-center justify-center bg-transparent md:hidden">
          <BandeauMobile lastParty={lastParty} />
        </div>

        {/* <h2 className="text-xl text-white renogare tracking-widest text-center mt-32 flex flex-col justify-center items-center lg:hidden ">
          {party[0].name}{" "}
          <span className="text-sm font-mono text-white">{formattedDate}</span>
        </h2> */}
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
          // initial={{ opacity: 0, scale: 0 }}
          // animate={{ opacity: 1, scale: 1 }}
          // transition={{
          //   duration: 0.8,
          //   delay: 0.8,
          //   ease: [0, 0.71, 0.2, 1.01],
          // }}
          className="w-full flex gap-4 justify-center items-center"
        >
          {totalPages > 1 && (
            <div className="">
              <PartyList
                party={allParties || []}
                page={page}
                totalPages={totalPages}
                urlParamName={urlParamName}
              />
            </div>
          )}
        </motion.div>

        {/* <motion.div
          key={page}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full flex gap-4 justify-center items-center"
        >
          <h2 className="text-[0.8rem] uppercase text-white renogare tracking-widest hidden bg-black/60 shadow-2xl rounded-t-full px-6 py-2 w-fit lg:flex lg:justify-center items-center">
            {party[0].name}{" "}
            <span className="text-sm font-mono text-white">
            {party[0].name} | {formattedDate}
            </span>
          </h2>
        </motion.div> */}

        {showSwipeHint && (
          <div className="absolute bottom-5 md:bottom-20 lg:bottom-11 w-full text-white flex justify-center">
            <p className="md:renogare bg-black px-4 py-2 rounded-full text-sm lg:text-xs text-center">
              Swipez de gauche à droite pour voir plus de photos
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
