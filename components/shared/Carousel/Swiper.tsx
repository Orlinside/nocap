"use client";
import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { GlareCard } from "@/components/ui/glare-card";
import { BtnReactions } from "../BtnReactions";

export const Carousel = ({
  photos,
  user,
  isReact,
  onPhotoChange,
}: {
  photos: any;
  user: any;
  isReact: any;
  onPhotoChange: any;
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handlePhotoClick = (url: string) => {
    setSelectedPhoto(url);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPhoto(null);
      setIsClosing(false);
    }, 300); // Durée de l'animation
  };

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.realIndex;
    if (photos && photos.length > 0 && activeIndex < photos.length) {
      const activePhoto = photos[activeIndex];
      onPhotoChange(activePhoto.url ? activePhoto.url : photos[0].url);
    } else {
      console.error("Invalid activeIndex or empty photos array");
    }
  };

  return (
    <div className="w-full h-full -z-0">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 200,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        modules={[EffectCoverflow, Pagination]}
        className="mx-auto overflow-x-hidden swiper-slide swiper-slide-active"
        onSlideChange={handleSlideChange}
      >
        {photos.map((photo: any, idx: any) => (
          <SwiperSlide
            key={idx}
            className="relative w-full max-w-[350px] h-auto overflow-hidden rounded-sm object-cover lg:max-w-[700px] md:max-w-[700px] sm:max-w-[300px]"
          >
            <div
              key={idx}
              className="relative z-0 overflow-x-hidden"
              onClick={() => handlePhotoClick(photo.url)}
            >
              <GlareCard>
                <Image
                  src={photo.url}
                  alt={photo.url}
                  width={1000}
                  height={1000}
                  className="relative object-cover"
                />
              </GlareCard>
            </div>
            <div className="absolute z-10 right-2 bottom-2 overflow-x-hidden">
              <BtnReactions
                photoId={photo.id}
                reaction={photo.reactions}
                user={user}
                isReact={isReact}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md">
          <div
            className={`relative fade-in ${isClosing ? "fade-out" : "fade-in"}`}
          >
            <button
              className="absolute bottom-2 right-3 text-white text-sm sm:text-xl"
              onClick={handleClose}
            >
              FERMER
            </button>
            <Image
              src={selectedPhoto}
              alt="Selected photo"
              width={820}
              height={1000}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
