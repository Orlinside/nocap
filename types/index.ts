// ====== USER PARAMS
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

// ====== PARTY PARAMS
export type PartyProps = {
  id: string;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
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
