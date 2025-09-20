import Link from "./Link.entity";

export type PersistenceLink = Omit<
  Required<Link>,
  "id" | "presave" | "hasOwner"
> & {
  _id: string;
};

export type ExposedLink = Omit<
  Required<Link>,
  "lastVisit" | "presave" | "hasOwner"
>;

export type LinkToCreate = Pick<Link, "originalUrl" | "userId" | "id">;
