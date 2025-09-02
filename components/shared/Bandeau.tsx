"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMusic } from "react-icons/fa";

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

  //! Si elle est définie, je veux afficher le bandeau avec le compte à rebours
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ease: "easeOut", duration: 0.6 },
        },
      }}
      className="fixed top-6 left-0 right-0 z-40 border-white/5 "
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-4">
          {/* Icône animée */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex-shrink-0"
          >
            <FaMusic className="text-white/80 text-lg" />
          </motion.div>

          {/* Contenu principal */}
          <div className="flex items-center gap-4 overflow-hidden">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{
                ease: "linear",
                duration: 15,
                repeat: Infinity,
              }}
              className="flex items-center gap-6 whitespace-nowrap"
            >
              {/* Nom de l'événement */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-white/60 text-sm" />
                <span className="text-white renogare font-bold tracking-wider uppercase text-sm">
                  {lastParty.name}
                </span>
              </div>

              {/* Séparateur */}
              <div className="w-px h-4 bg-white/30"></div>

              {/* Compte à rebours ou statut */}
              <div className="flex items-center gap-3">
                <FaClock className="text-white/60 text-sm" />
                {now >= new Date(lastParty.startDateTime) &&
                now <= new Date(lastParty.endDateTime) ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-mono text-sm font-bold">
                      EN COURS MAINTENANT !
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-white/90">{countTimer.jours}</span>
                    <span className="text-white/60">j</span>
                    <span className="text-white/90">{countTimer.heures}</span>
                    <span className="text-white/60">h</span>
                    <span className="text-white/90">{countTimer.minutes}</span>
                    <span className="text-white/60">m</span>
                    <span className="text-white/90">{countTimer.secondes}</span>
                    <span className="text-white/60">s</span>
                  </div>
                )}
              </div>

              {/* Répétition pour assurer la continuité */}
              <div className="w-px h-4 bg-white/30"></div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-white/60 text-sm" />
                <span className="text-white renogare font-bold tracking-wider uppercase text-sm">
                  {lastParty.name}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
