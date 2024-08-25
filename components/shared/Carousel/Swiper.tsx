"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { BtnReactions } from "../BtnReactions";

export const Carousel = ({
  photos,
  user,
  isReact,
}: {
  photos: any;
  user: any;
  isReact: any;
}) => {
  return (
    <div className="w-full box-content overflow-x-hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 200,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        modules={[EffectCoverflow, Pagination]}
        className="mx-auto overflow-x-hidden swiper-slide swiper-slide-active"
      >
        {photos.map((photo: any, idx: any) => (
          <SwiperSlide
            key={idx}
            className="overflow-x-hidden relative w-full max-w-[350px] h-auto overflow-hidden rounded-sm object-cover md:max-w-[750px] sm:max-w-[300px]"
          >
            <div key={idx} className="relative z-0 overflow-x-hidden">
              <Image
                src={photo.url}
                alt={photo.url}
                width={1000}
                height={1000}
                className="object-cover"
              />
              <div className="absolute right-2 bottom-2 overflow-x-hidden">
                <BtnReactions
                  photoId={photo.id}
                  reaction={photo.reactions}
                  user={user}
                  isReact={isReact}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
