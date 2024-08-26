import { currentUser } from "@/lib/auth";
import { getReactionsByUserId } from "@/lib/actions/user.actions";

import { Carousel } from "./Carousel/Swiper";
import { Pagination } from "./Pagination";
import { AccueilBackground } from "./AccueilBackground";

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
    <>
      <AccueilBackground
        user={user}
        party={party}
        totalPages={totalPages}
        urlParamName={urlParamName}
        page={page}
        isReact={isReact}
      />
    </>
  );
};
