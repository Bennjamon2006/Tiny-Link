import Link from "./Link.entity";

export type PersistenceLink = Omit<Required<Link>, "id" | "presave"> & {
  _id: string;
};

export type ExposedLink = Omit<Required<Link>, "lastVisit" | "presave">;

export type LinkToCreate = Pick<Link, "originalUrl" | "userId" | "id">;
