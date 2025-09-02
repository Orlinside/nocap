"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { FaCalendarAlt, FaClock, FaMusic } from "react-icons/fa";

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

  //! Si elle est définie, je veux afficher le bandeau avec le compte à rebours
  return (
    isVisible &&
    isHomePage && ( // Afficher le compteur uniquement si isVisible est true et si nous sommes sur la page d'accueil
      <div className="w-full space-y-2 mt-10 sm:mt-16">
        {/* En-tête compact */}

        {/* Compteur ultra-compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="px-2 grid grid-cols-4 gap-2"
        >
          {/* Jours */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-1 text-center hover:bg-white/12 transition-all duration-300"
          >
            <div className="text-lg font-bold text-white renogare">
              {countTimer.jours}
            </div>
            <div className="text-white/50 text-xs font-mono uppercase">J</div>
          </motion.div>

          {/* Heures */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-1 text-center hover:bg-white/12 transition-all duration-300"
          >
            <div className="text-lg font-bold text-white renogare">
              {countTimer.heures}
            </div>
            <div className="text-white/50 text-xs font-mono uppercase">H</div>
          </motion.div>

          {/* Minutes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-1 text-center hover:bg-white/12 transition-all duration-300"
          >
            <div className="text-lg font-bold text-white renogare">
              {countTimer.minutes}
            </div>
            <div className="text-white/50 text-xs font-mono uppercase">M</div>
          </motion.div>

          {/* Secondes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-1 text-center hover:bg-white/12 transition-all duration-300"
          >
            <motion.div
              key={countTimer.secondes}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold text-white renogare"
            >
              {countTimer.secondes}
            </motion.div>
            <div className="text-white/50 text-xs font-mono uppercase">S</div>
          </motion.div>
        </motion.div>
      </div>
    )
  );
};
