import UserToken from "./UserToken";

export type PersistenceUserToken = Omit<
  Required<UserToken>,
  "id" | "presave"
> & {
  _id: string;
};

export type ExposedUserToken = Omit<Required<UserToken>, "presave">;
