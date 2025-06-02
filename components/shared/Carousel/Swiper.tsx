"use client";
import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper.css";

import { GlareCard } from "@/components/ui/glare-card";
import { BtnReactions } from "../BtnReactions";

import { IoClose } from "react-icons/io5";
import { IoDownload } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";

export const Carousel = ({
  photos,
  user,
  isReact,
  onPhotoChange,
}: {
  photos: any;
  user: any;
  isReact: boolean;
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
    <div className="h-full w-full -z-0">
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
        modules={[EffectCoverflow, Pagination, Navigation]}
        // navigation={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="mx-auto h-auto relative"
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
      >
        {photos.map((photo: any, idx: any) => (
          <SwiperSlide
            key={idx}
            className="relative max-w-[90%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[750px] h-auto rounded-sm"
          >
            <div
              key={idx}
              className="relative z-0 swiper-slide swiper-slide-active flex items-center justify-center"
              onClick={() => handlePhotoClick(photo.url)}
            >
              <GlareCard className="w-full h-full max-w-full max-h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-full max-h-full overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.url}
                    width={1000}
                    height={1000}
                    className="object-contain"
                    style={{ aspectRatio: photo.width / photo.height }}
                  />
                </div>
              </GlareCard>
            </div>

            <div className="absolute z-10 right-1 bottom-1 sm:right-2 sm:bottom-2">
              <BtnReactions
                photoId={photo.id}
                reaction={photo.reactions}
                photoUrl={photo.url}
                user={user}
                isReact={isReact}
              />
            </div>
            {photos.length > 1 && (
              <>
                <button className="hidden sm:block custom-prev absolute top-1/2 -left-12 z-10 w-10 h-10 rounded-full text-center bg-black/50 hover:bg-black/80 transition-colors duration-300">
                  <GrPrevious className="mx-auto" />
                </button>
                <button className="hidden sm:block custom-next absolute top-1/2 -right-12 z-10 w-10 h-10 rounded-full text-center bg-black/50 hover:bg-black/80 transition-colors duration-300">
                  <GrNext className="mx-auto" />
                </button>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md">
          <div
            className={`relative fade-in ${isClosing ? "fade-out" : "fade-in"}`}
          >
            <button
              className="absolute top-5 right-3 text-white text-sm sm:text-xl hover:text-white/80"
              onClick={handleClose}
            >
              <IoClose size={30} />
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
