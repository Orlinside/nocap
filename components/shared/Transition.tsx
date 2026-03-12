"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

export const Transition = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const previousOverflowRef = useRef<{
    htmlOverflowY: string;
    bodyOverflowY: string;
  } | null>(null);

  const lockWindowScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    if (!previousOverflowRef.current) {
      previousOverflowRef.current = {
        htmlOverflowY: html.style.overflowY,
        bodyOverflowY: body.style.overflowY,
      };
    }

    html.style.overflowY = "hidden";
    body.style.overflowY = "hidden";
  }, []);

  const unlockWindowScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    if (!previousOverflowRef.current) return;

    html.style.overflowY = previousOverflowRef.current.htmlOverflowY;
    body.style.overflowY = previousOverflowRef.current.bodyOverflowY;
    previousOverflowRef.current = null;
  }, []);

  useEffect(() => {
    lockWindowScroll();

    return () => {
      unlockWindowScroll();
    };
  }, [lockWindowScroll, unlockWindowScroll]);

  const anim = (variants: any) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };

  const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
    exit: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={className}
      {...anim(opacity)}
      onAnimationStart={lockWindowScroll}
      onAnimationComplete={unlockWindowScroll}
    >
      {children}
    </motion.div>
  );
};
