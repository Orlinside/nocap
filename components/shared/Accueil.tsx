import Image from "next/image";

import { BtnReactions } from "./BtnReactions";
import { Pagination } from "./Pagination";
import { currentUser } from "@/lib/auth";
import { getReactionsByUserId } from "@/lib/actions/user.actions";
import { Carousel } from "./Carousel/Swiper";

type AccueilProps = {
  party: any;
  totalPages: number;
  page: number;
  urlParamName: string;
  limit: number;
};

export const Accueil = async ({
  party,
  totalPages,
  limit,
  page,
  urlParamName = "",
}: AccueilProps) => {
  const user = await currentUser();
  const userId = user?.id;

  let isReact = false;

  if (userId !== null || userId !== undefined) {
    const reactionsCurrentUser = await getReactionsByUserId(userId || "");

    // Dans les réactions du user, je veux voir si la photoId est égale à la photoId de la photo actuelle
    if (reactionsCurrentUser !== null && reactionsCurrentUser !== undefined) {
      isReact = reactionsCurrentUser.some(
        (reaction: any) => reaction.photoId === party[0].photos[0].id
      );
    }
  }

  return (
    <section className="flex flex-col justify-center items-center bg-dark">
      <div className="">
        {/* <h2 className="wrapper text-xl">{party[0].name}</h2> */}
        <div className="w-full overflow-x-hidden">
          {/* {party[0].photos.map((photo: any, idx: any) => (
            <div key={idx} className="relative bg-black z-0">
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
                  reaction={photo.reactions}
                  user={user}
                  isReact={isReact}
                />
              </div>
            </div>
          ))} */}
          <Carousel photos={party[0].photos} user={user} isReact={isReact} />
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
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
