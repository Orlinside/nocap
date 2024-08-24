"use client";
import { useEffect, useState } from "react";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

interface LastParty {
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}

interface BandeauProps {
  lastParty?: LastParty | null;
}

export const Bandeau = ({ lastParty }: { lastParty: any }) => {
  const [countTimer, setCountTimer] = useState({
    jours: "00",
    heures: "00",
    minutes: "00",
    secondes: "00",
  });

  if (
    !lastParty ||
    !lastParty.endDateTime ||
    new Date(lastParty.endDateTime) <= new Date()
  ) {
    return null;
  }

  // Je veux vérifier si j'ai bien la lastParty et qu'elle nest pas null ou undefined
  // Si elle est null ou undefined, je ne veux pas afficher le bandeau
  // Si elle est définie, je veux afficher le bandeau avec le compte à rebours
  // Si la date de fin est dépassée, je ne veux pas afficher le bandeau

  const now = new Date();
  const startDateTime = new Date(lastParty.startDateTime);
  const endDateTime = new Date(lastParty.endDateTime);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!startDateTime) return;

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = startDateTime.getTime() - now;

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

    updateTime(); // Call updateTime immediately to set initial state
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateTime, endDateTime]);

  if (endDateTime && now > endDateTime) {
    return null; // Party is finished, do not display the banner
  }

  const countdownString = `${lastParty.name} - ${countTimer.jours} JOURS - ${countTimer.heures}h ${countTimer.minutes}m ${countTimer.secondes}s`;

  const testimonial = [{ quote: countdownString }, { quote: countdownString }];

  return (
    <div className="w-full flex items-center justify-center gap-20 bg-dark z-10">
      <InfiniteMovingCards
        items={testimonial}
        direction="right"
        speed="normal"
        className="h-full w-full"
      />
    </div>
  );
};
