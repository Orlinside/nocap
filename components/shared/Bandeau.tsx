"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

interface LastParty {
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}

export const Bandeau = ({ lastParty }: { lastParty: any }) => {
  const [countTimer, setCountTimer] = useState({
    jours: "00",
    heures: "00",
    minutes: "00",
    secondes: "00",
  });

  const now = new Date();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!lastParty.startDateTime) return;

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = lastParty.startDateTime.getTime() - now;

      if (distance < 0) {
        setCountTimer({
          jours: "00",
          heures: "00",
          minutes: "00",
          secondes: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountTimer({
        jours: days.toString().padStart(2, "0"),
        heures: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        secondes: seconds.toString().padStart(2, "0"),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lastParty.startDateTime]);

  //! Si la date de fin est dépassée, je ne veux pas afficher le bandeau
  if (lastParty.endDateTime && now > lastParty.endDateTime) {
    return null;
  }

  let countdownString = `${lastParty.name} - ${countTimer.jours} JOURS - ${countTimer.heures}h ${countTimer.minutes}m ${countTimer.secondes}s`;

  //! Si la date est en cours, j'affiche le message
  if (
    now >= new Date(lastParty.startDateTime) &&
    now <= new Date(lastParty.endDateTime)
  ) {
    countdownString = `${lastParty.name} - ça commence maintenant !!!`;
  }

  //! Si elle est définie, je veux afficher le bandeau avec le compte à rebours
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { ease: "easeOut", duration: 3 },
        },
      }}
      className="w-full flex items-center justify-center gap-20 h-[30px]"
    >
      <motion.p
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
          delay: 3,
        }}
        className="w-full text-sm md:text-lg lg:text-md text-center leading-[1.6] text-white renogare flex md:gap-32 lg:gap-40 uppercase"
      >
        <span className="w-full">{countdownString}</span>
        <span className="w-full hidden sm:flex">{countdownString}</span>
        <span className="w-full hidden lg:flex">{countdownString}</span>
      </motion.p>
    </motion.div>
  );
};
