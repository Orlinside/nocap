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

  const formattedDate = new Date(party[0].startDateTime).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="h-full flex flex-col justify-between pb-8 items-center overflow-hidden relative">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${activePhotoUrl ?? party[0].photos[0].url})`,
        }}
      ></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <h2 className="text-xl renogare tracking-widest text-center mt-28 flex flex-col justify-center items-center lg:hidden ">
          {party[0].name}{" "}
          <span className="text-sm font-mono">{formattedDate}</span>
        </h2>
        <div className="lg:mt-32 xl:mt-24">
          <div className="w-full flex-1">
            <Carousel
              photos={party[0].photos}
              user={user}
              isReact={isReact}
              onPhotoChange={handlePhotoChange}
            />
          </div>
        </div>
        <div className="w-full wrapper flex flex-col gap-2 justify-center items-center">
          <h2 className="text-2xl renogare tracking-widest hidden lg:flex lg:flex-col lg:justify-center items-center">
            {party[0].name}{" "}
            <span className="text-sm font-mono">{formattedDate}</span>
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
