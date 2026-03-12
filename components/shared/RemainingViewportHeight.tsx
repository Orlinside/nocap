"use client";

import { useEffect, useState } from "react";

type RemainingViewportHeightProps = {
  children: React.ReactNode;
  className?: string;
};

export const RemainingViewportHeight = ({
  children,
  className = "",
}: RemainingViewportHeightProps) => {
  const [availableHeight, setAvailableHeight] = useState("100dvh");

  useEffect(() => {
    const updateAvailableHeight = () => {
      const headerElement =
        document.querySelector<HTMLElement>("[data-site-header]");
      const headerHeight = headerElement?.getBoundingClientRect().height ?? 0;
      setAvailableHeight(`calc(100dvh - ${Math.round(headerHeight)}px)`);
    };

    updateAvailableHeight();

    const headerElement =
      document.querySelector<HTMLElement>("[data-site-header]");
    const resizeObserver =
      headerElement && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateAvailableHeight)
        : null;

    if (headerElement && resizeObserver) {
      resizeObserver.observe(headerElement);
    }

    window.addEventListener("resize", updateAvailableHeight);

    return () => {
      window.removeEventListener("resize", updateAvailableHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className={className} style={{ height: availableHeight }}>
      {children}
    </div>
  );
};
