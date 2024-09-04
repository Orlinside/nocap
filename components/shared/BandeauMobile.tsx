"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface LastParty {
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}

export const BandeauMobile = ({ lastParty }: { lastParty: any }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [countTimer, setCountTimer] = useState({
    jours: "00",
    heures: "00",
    minutes: "00",
    secondes: "00",
  });
  const [isVisible, setIsVisible] = useState(true);

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
        setIsVisible(false); // Masquer le compteur lorsque le temps est écoulé
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

  // Vérifier si nous sommes sur la page d'accueil
  const isHomePage = pathname === "/";

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
    isVisible &&
    isHomePage && ( // Afficher le compteur uniquement si isVisible est true et si nous sommes sur la page d'accueil
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="grid auto-cols-max grid-flow-col gap-5 text-center"
      >
        <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2 font-mono">
          <span className="countdown renogare text-sm">
            <span>{countTimer.jours}</span>
          </span>
          jours
        </div>
        <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2 font-mono">
          <span className="countdown renogare text-sm">
            <span>{countTimer.heures}</span>
          </span>
          heures
        </div>
        <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2 font-mono">
          <span className="countdown renogare text-sm">
            <span>{countTimer.minutes}</span>
          </span>
          min
        </div>
        <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2 font-mono">
          <span className="countdown renogare text-sm">
            <span>{countTimer.secondes}</span>
          </span>
          sec
        </div>
      </motion.div>
    )
  );
};
