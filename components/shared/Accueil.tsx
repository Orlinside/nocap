import Image from "next/image";

import { BtnReactions } from "./BtnReactions";
import { Pagination } from "./Pagination";

type AccueilProps = {
  party: any;
  totalPages: number;
  page: number;
  urlParamName: string;
  limit: number;
};

export const Accueil = ({
  party,
  totalPages,
  limit,
  page,
  urlParamName = "",
}: AccueilProps) => {
  return (
    <section className="wrapper bg-dark h-screen">
      <div className="">
        <h2>{party.name}</h2>
        <div className="grid grid-cols-3 gap-4 items-center">
          {party[0].photos.map((photo: any, idx: any) => (
            <div key={idx} className="relative bg-black">
              <Image
                src={photo.url}
                alt={photo.url}
                width={500}
                height={300}
                className=""
              />
              <div className="absolute right-2 bottom-2">
                <BtnReactions
                  photoId={photo.id}
                  nbReaction={photo.reactions.length}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end mt-12">
          <Pagination
            urlParamName={urlParamName}
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};
