import { Photo } from "@prisma/client";

//! ====== USER PARAMS
export type CreateUserParams = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

export type GetUserParams = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type GetAllUserParams = {
  id: string;
  name: string;
  email: string;
};

export type UpdateUserParams = {
  userId: string;
  user: {
    name: string;
  };
  path: string;
};

export type DeleteUserParams = {
  userId: string;
  path: string;
};

//! ====== PARTY PARAMS
export type PartyProps = {
  id: string;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
  photos: Photo[];
};

export type CreatePartyParams = {
  userId?: string;
  party: {
    name: string;
    startDateTime: Date;
    endDateTime: Date;
  };
  path: string;
};

export type UpdatePartyParams = {
  userId?: string;
  party: {
    partyId: string;
    name: string;
    startDateTime: Date;
    endDateTime: Date;
  };
  path: string;
};

export type DeletePartyParams = {
  partyId: string;
  path: string;
};

export type GetPartiesHomeParams = {
  limit: number;
  page: number;
};

//! ====== PHOTO PARAMS
export type AddPhotoToPartyParams = {
  partyId: string;
  userId: string;
  photo: {
    url: string;
  };
};

export type AddReactionToPhotoParams = {
  photoId: string;
  userId: string;
  reactionType: string;
};

//! ====== COMMENTS PARAMS
// export type Comment = {
//   commentId: string;
//   content: string;

// }

export type AddComment = {
  userId: string;
  content: string;
  path: string;
};

export type DeleteComment = {
  commentId: string;
  path: string;
};

export type GetCommentsParams = {
  limit: number;
  page: number;
};

export type UpdateCommentParams = {
  // userId: string;
  commentId: string;
  importance: "LOW" | "MEDIUM" | "HIGH";
  isValid: boolean;
  path: string;
};

//! ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  page?: number;
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
