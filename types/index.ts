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
