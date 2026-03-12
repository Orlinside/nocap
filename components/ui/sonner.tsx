"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ position, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncIsDesktop = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncIsDesktop();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncIsDesktop);

      return () => {
        mediaQuery.removeEventListener("change", syncIsDesktop);
      };
    }

    mediaQuery.addListener(syncIsDesktop);

    return () => {
      mediaQuery.removeListener(syncIsDesktop);
    };
  }, []);

  const resolvedPosition =
    position ?? (isDesktop ? "bottom-left" : "top-center");

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={resolvedPosition}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:relative group-[.toaster]:overflow-hidden group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:bg-black/85 group-[.toaster]:text-white group-[.toaster]:backdrop-blur-xl group-[.toaster]:shadow-[0_12px_32px_rgba(0,0,0,0.45)] group-[.toaster]:before:absolute group-[.toaster]:before:inset-0 group-[.toaster]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_55%)] group-[.toaster]:before:content-['']",
          content: "group-[.toast]:relative group-[.toast]:z-10",
          title:
            "group-[.toast]: group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-[0.18em] group-[.toast]:text-white",
          description:
            "group-[.toast]:mt-1 group-[.toast]:text-sm group-[.toast]:leading-relaxed group-[.toast]:text-white/75",
          icon: "group-[.toast]:text-white/80",
          closeButton:
            "group-[.toast]:border group-[.toast]:border-white/20 group-[.toast]:bg-black/45 group-[.toast]:text-white/80 group-[.toast]:transition-colors group-[.toast]:hover:bg-white/10 group-[.toast]:hover:text-white",
          actionButton:
            "group-[.toast]:renogare group-[.toast]:rounded-none group-[.toast]:border group-[.toast]:border-white/25 group-[.toast]:bg-gradient-to-r group-[.toast]:from-[#fc0010] group-[.toast]:to-[#FE9D01] group-[.toast]:px-3 group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-[0.14em] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:renogare group-[.toast]:rounded-none group-[.toast]:border group-[.toast]:border-white/25 group-[.toast]:bg-white/5 group-[.toast]:px-3 group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-[0.14em] group-[.toast]:text-white/80",
          success:
            "group-[.toast]:border-emerald-300/35 group-[.toast]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.2),transparent_55%)]",
          error:
            "group-[.toast]:border-rose-400/35 group-[.toast]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(251,113,133,0.2),transparent_55%)]",
          info: "group-[.toast]:border-blue-400/35 group-[.toast]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.22),transparent_55%)]",
          warning:
            "group-[.toast]:border-amber-300/35 group-[.toast]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(252,211,77,0.22),transparent_55%)]",
          loading:
            "group-[.toast]:border-white/30 group-[.toast]:before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
