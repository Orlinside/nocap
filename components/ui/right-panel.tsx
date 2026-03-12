"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type RightPanelRenderProps = {
  close: () => void;
};

type RightPanelProps = {
  trigger: React.ReactNode;
  triggerClassName?: string;
  panelClassName?: string;
  overlayClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children:
    | React.ReactNode
    | ((props: RightPanelRenderProps) => React.ReactNode);
};

export const RightPanel = ({
  trigger,
  triggerClassName,
  panelClassName,
  overlayClassName,
  open,
  onOpenChange,
  children,
}: RightPanelProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, setOpen]);

  const close = () => {
    setOpen(false);
  };

  const content =
    typeof children === "function" ? children({ close }) : children;

  return (
    <>
      <button
        type="button"
        aria-label="Ouvrir le panneau"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[250]">
                <motion.button
                  type="button"
                  aria-label="Fermer le panneau"
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "absolute inset-0 bg-black/35",
                    overlayClassName,
                  )}
                />

                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "absolute right-0 top-0 h-[100dvh] w-[95vw] max-w-[640px] overflow-y-auto border-l border-white/15 bg-black/90 p-4 text-white shadow-2xl sm:p-6",
                    panelClassName,
                  )}
                >
                  {content}
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};
