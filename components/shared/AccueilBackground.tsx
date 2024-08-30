"use client";
import { useState, useEffect } from "react";

import { Carousel } from "./Carousel/Swiper";
import { Pagination } from "./Pagination";

type AccueilProps = {
  user: any;
  party: any;
  totalPages: number;
  page: number;
  urlParamName: string;
  isReact: boolean;
};

export const AccueilBackground = ({
  user,
  party,
  totalPages,
  page,
  urlParamName = "",
  isReact,
}: AccueilProps) => {
  const [activePhotoUrl, setActivePhotoUrl] = useState(party[0].photos[0].url);

  const handlePhotoChange = (newPhotoUrl: string) => {
    setActivePhotoUrl(newPhotoUrl);
  };

  useEffect(() => {
    console.log(activePhotoUrl);
  }, [activePhotoUrl]);

  return (
    <section className="h-full flex flex-col justify-between pb-8 items-center overflow-hidden relative">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${activePhotoUrl ?? party[0].photos[0].url})`,
        }}
      ></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <h2 className="text-xl renogare tracking-widest text-center mt-28 lg:hidden ">
          {party[0].name}
        </h2>
        <div className="lg:mt-32 xl:mt-24">
          <div className="w-full overflow-x-hidden flex-1">
            <Carousel
              photos={party[0].photos}
              user={user}
              isReact={isReact}
              onPhotoChange={handlePhotoChange}
            />
          </div>
        </div>
        <div className="w-full wrapper flex justify-center items-center lg:justify-between">
          <h2 className="text-xl renogare tracking-widest hidden lg:block">
            {party[0].name}
          </h2>
          {totalPages > 1 && (
            <div className="">
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
