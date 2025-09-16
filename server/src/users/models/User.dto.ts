import User from "./User.entity";

export type PersistenceUser = Required<
  Omit<User, "password" | "comparePassword" | "presave" | "id">
> & { _id: string };

export type ExposedUser = Omit<
  User,
  "password" | "passwordHash" | "comparePassword" | "presave"
>;

export type UserToCreate = Pick<User, "username" | "email" | "password">;

export type UserToUpdate = Partial<UserToCreate>;
