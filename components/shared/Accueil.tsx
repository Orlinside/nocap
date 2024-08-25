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
    <section className="h-full flex flex-col justify-between pb-8 items-center overflow-hidden">
      {/* <div className="block lg:hidden xl:hidden"></div> */}
      <h2 className="text-xl mt-28 lg:hidden ">{party[0].name}</h2>
      <div className="lg:mt-32 xl:mt-24">
        <div className="w-full overflow-x-hidden flex-1">
          <Carousel photos={party[0].photos} user={user} isReact={isReact} />
        </div>
      </div>
      <div className="w-full wrapper flex justify-center lg:justify-between">
        <h2 className="text-xl hidden lg:block">{party[0].name}</h2>
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
    </section>
  );
};
