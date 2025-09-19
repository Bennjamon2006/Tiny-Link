import Session from "./Session.entity";

export type PersistenceSession = Omit<Required<Session>, "presave" | "id"> & {
  _id: string;
};

export type ExposedSession = Omit<Required<Session>, "presave">;

export type SessionToCreate = Pick<Session, "ip" | "userAgent" | "userId">;
