/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { BandeauMobile } from "./BandeauMobile";
import { toast } from "sonner";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoClose,
} from "react-icons/io5";
import { formUrlQuery } from "@/lib/utils";
import { TypewriterEffect } from "../ui/typewriter-effect";

const PHOTOS_PER_BLOCK = 16;
const FALLBACK_PHOTO_URL = "/images/nocap2.jpg";

const HERO_TYPEWRITER_WORDS = [
  {
    text: "it's everything, and nothing else.",
    className:
      "bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text !text-transparent dark:!text-transparent",
  },
];

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
}: AccueilProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePartyId = party?.[0]?.id;
  const photos = useMemo(() => party?.[0]?.photos ?? [], [party]);
  const partyName = party?.[0]?.name ?? "No Cap";
  // const staticBackgroundUrl = photos[0]?.url ?? FALLBACK_PHOTO_URL;

  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const [isLightboxMounted, setIsLightboxMounted] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [availableHeight, setAvailableHeight] = useState("100dvh");

  const photoBlocks = useMemo(() => {
    const basePhotos =
      photos.length > 0
        ? photos
        : [{ id: "fallback-photo", url: FALLBACK_PHOTO_URL }];

    const normalizedPhotos = [...basePhotos];

    while (normalizedPhotos.length % PHOTOS_PER_BLOCK !== 0) {
      normalizedPhotos.push(
        basePhotos[normalizedPhotos.length % basePhotos.length],
      );
    }

    const blocks: (typeof basePhotos)[] = [];

    for (let i = 0; i < normalizedPhotos.length; i += PHOTOS_PER_BLOCK) {
      blocks.push(normalizedPhotos.slice(i, i + PHOTOS_PER_BLOCK));
    }

    return blocks;
  }, [photos]);

  const activePhotoBlock = useMemo(
    () => photoBlocks[activeBlockIndex] ?? [],
    [photoBlocks, activeBlockIndex],
  );

  const handleMosaicPhotoClick = (photoUrl: string) => {
    setSelectedPhotoUrl(photoUrl);
  };

  const handleLightboxClose = () => {
    setSelectedPhotoUrl(null);
  };

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePartyPageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: targetPage.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  const formattedDate = party?.[0]?.startDateTime
    ? new Date(party[0].startDateTime).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const upcomingPartyName = lastParty?.name ?? partyName;
  const upcomingPartyDate = lastParty?.startDateTime
    ? new Date(lastParty.startDateTime).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : formattedDate;
  const desktopTickerText = `Prochaine soiree • ${upcomingPartyName} • ${upcomingPartyDate}`;
  const isUpcomingParty =
    !!lastParty?.startDateTime &&
    new Date(lastParty.startDateTime).getTime() > Date.now();

  useEffect(() => {
    setIsLightboxMounted(true);

    return () => {
      setIsLightboxMounted(false);
    };
  }, []);

  useEffect(() => {
    setActiveBlockIndex(0);
  }, [page, activePartyId]);

  useEffect(() => {
    if (photoBlocks.length <= 1) return;

    const timer = setInterval(() => {
      setActiveBlockIndex((currentIndex) =>
        currentIndex + 1 >= photoBlocks.length ? 0 : currentIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [photoBlocks.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 6000); // Masquer l'indicateur après 5 secondes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) {
      toast.info("Connecte-toi pour télécharger ta photo !");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePartyId, page]);

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
    <section
      className="relative min-h-0 w-full overflow-hidden text-white"
      style={{ height: availableHeight }}
    >
      {/* <motion.div
        key={page}
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
          backgroundImage: `url(${staticBackgroundUrl})`,
        }}
      ></motion.div> */}

      <div className="relative z-10 mx-auto h-full w-full max-w-[1600px] overflow-hidden px-4 py-4 md:px-8 lg:px-12 lg:py-0 lg:pb-6">
        <div className="relative h-full min-h-0 overflow-hidden lg:hidden">
          <div className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex h-full min-h-full snap-start items-center justify-center overflow-hidden border-y border-white/15 px-4 py-8"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative h-48 w-48">
                  <Image
                    src="/logo/logo_cancel.png"
                    alt=""
                    fill
                    className="object-contain opacity-[0.1] blur-sm"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 md:hidden">
                <BandeauMobile lastParty={lastParty} />
              </div>

              <div className="relative z-10 max-w-xl text-center">
                <h1 className="renogare text-center text-2xl font-bold uppercase leading-[1.12] text-white">
                  This cocktail of positive energy that you find in the evening
                  thanks to the people, the music, the beautiful outfits -
                </h1>
                <p className="renogare mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-2xl font-bold uppercase leading-[1.12] text-transparent">
                  it's everything, and nothing else.
                </p>
              </div>

              {showSwipeHint && (
                <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-white">
                  <p className="rounded-full border border-white/20 bg-black/65 px-4 py-2 text-center text-xs uppercase tracking-[0.14em]">
                    Swipe vers le haut
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              key={`${page}-mobile-mosaic`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative h-full min-h-full snap-start overflow-hidden border border-white/15 bg-white/[0.03] p-1.5"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
                <div className="pointer-events-auto flex items-center gap-2 border-t border-x border-white/20 bg-[#080a0d]/80 px-3 py-2 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => handlePartyPageChange(page - 1)}
                    disabled={!canGoPrev}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Soiree precedente"
                  >
                    <IoChevronBackOutline size={12} />
                  </button>

                  <div className="px-2">
                    <p className="renogare text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                      {partyName}
                    </p>
                    {formattedDate && (
                      <p className="mt-1 text-center text-[9px] uppercase tracking-[0.2em] text-white/70">
                        {formattedDate}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePartyPageChange(page + 1)}
                    disabled={!canGoNext}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Soiree suivante"
                  >
                    <IoChevronForwardOutline size={12} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${page}-${activeBlockIndex}-mobile`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="grid h-full grid-cols-4 grid-rows-4 gap-px bg-white/10"
                >
                  {activePhotoBlock.map((photo: any, index: number) => (
                    <button
                      key={`${photo.id ?? photo.url}-${index}-${activeBlockIndex}-mobile`}
                      type="button"
                      onClick={() => handleMosaicPhotoClick(photo.url)}
                      className="group relative overflow-hidden bg-black/35"
                      aria-label={`Ouvrir la photo ${index + 1}`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt ?? `Photo de soiree ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 23vw, 100vw"
                        className="object-cover saturate-75 contrast-110 transition duration-300 group-hover:scale-105 group-hover:saturate-100"
                      />
                      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35 opacity-70 transition-opacity duration-300 group-hover:opacity-40"></span>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <div className="hidden h-full min-h-0 overflow-hidden lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-6 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative col-span-7 min-h-0 border-y border-white/15"
          >
            {isUpcomingParty && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-[#080a0d]/55 backdrop-blur-sm">
                <div className="relative h-10 overflow-hidden">
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{
                      duration: 18,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="absolute top-1/2 whitespace-nowrap px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/80"
                    style={{ y: "-50%" }}
                  >
                    {desktopTickerText}
                    <span className="mx-8 text-white/40">|</span>
                    {desktopTickerText}
                  </motion.div>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative h-48 w-48 xl:h-[30rem] xl:w-[30rem]">
                <Image
                  src="/logo/logo_cancel.png"
                  alt=""
                  fill
                  className="object-contain opacity-[0.09] blur-sm"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="relative flex h-full items-center justify-center px-6 xl:px-12">
              <div className="w-full max-w-4xl text-center">
                {/* <span className="inline-flex items-center border border-white/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
                  No Cap
                </span> */}
                <h1 className="renogare mt-8 text-center text-2xl font-bold uppercase leading-[1.12] text-white xl:text-5xl 2xl:text-3xl">
                  This cocktail of positive energy that you find in the evening
                  thanks to the people, the music, the beautiful outfits –
                </h1>
                <TypewriterEffect
                  words={HERO_TYPEWRITER_WORDS}
                  className="renogare mt-1 !text-2xl !font-bold !leading-[1.12] uppercase xl:!text-5xl 2xl:!text-3xl"
                  cursorClassName="!h-5 !w-[3px] bg-orange-400/90 md:!h-6 lg:!h-8 xl:!h-10"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative col-span-5 min-h-0 border border-white/15 bg-white/[0.03] p-2"
          >
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
              <div className="pointer-events-auto flex items-center gap-2 border-t border-x border-white/20 bg-[#080a0d]/0 px-3 py-2 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => handlePartyPageChange(page - 1)}
                  disabled={!canGoPrev}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Soiree precedente"
                >
                  <IoChevronBackOutline size={12} />
                </button>

                <div className="px-2">
                  <p className="renogare text-center text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                    {partyName}
                  </p>
                  {formattedDate && (
                    <p className="mt-1 text-center text-[9px] uppercase tracking-[0.2em] text-white/70">
                      {formattedDate}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePartyPageChange(page + 1)}
                  disabled={!canGoNext}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Soiree suivante"
                >
                  <IoChevronForwardOutline size={12} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${page}-${activeBlockIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid h-full grid-cols-4 grid-rows-4 gap-px bg-white/10"
              >
                {activePhotoBlock.map((photo: any, index: number) => (
                  <button
                    key={`${photo.id ?? photo.url}-${index}-${activeBlockIndex}`}
                    type="button"
                    onClick={() => handleMosaicPhotoClick(photo.url)}
                    className="group relative overflow-hidden bg-black/35"
                    aria-label={`Ouvrir la photo ${index + 1}`}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt ?? `Photo de soirée ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, 100vw"
                      className="object-cover saturate-75 contrast-110 transition duration-300 group-hover:scale-105 group-hover:saturate-100"
                    />
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35 opacity-70 transition-opacity duration-300 group-hover:opacity-40"></span>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* <motion.div
            key={page}
            className="col-span-12 w-full shrink-0 flex gap-4 justify-center items-center pb-4"
          >
            {totalPages > 1 && (
              <div>
                <PartyList
                  party={allParties || []}
                  page={page}
                  totalPages={totalPages}
                  urlParamName={urlParamName}
                />
              </div>
            )}
          </motion.div> */}
        </div>
      </div>

      {selectedPhotoUrl &&
        isLightboxMounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={handleLightboxClose}
          >
            <button
              type="button"
              onClick={handleLightboxClose}
              className="absolute right-6 top-6 rounded-full border border-white/30 bg-black/60 p-3 text-white transition-colors hover:bg-black"
              aria-label="Fermer la photo"
            >
              <IoClose size={26} />
            </button>
            <div
              className="relative h-[85vh] w-[90vw] max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedPhotoUrl}
                alt="Photo de soirée agrandie"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};
