import object from "shared/schemas/object";
import string, { url } from "shared/schemas/string";

const createLinkSchema = object(
  {
    originalUrl: url().required(),
    id: string().match(/^[A-Za-z0-9-_]+$/, "Invalid id"),
  },
  { stopInFirstError: true },
);

export default createLinkSchema;
