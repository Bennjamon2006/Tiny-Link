import object from "shared/schemas/object";
import string from "shared/schemas/string";

const loginDataSchema = object({
  username: string().required(),
  password: string().required(),
});

export default loginDataSchema;
