import object from "shared/schemas/object";
import string from "shared/schemas/string";

const createUserSchema = object(
  {
    username: string()
      .required()
      .minLength(5)
      .maxLength(20)
      .match(/^[^\s]+$/),
    password: string()
      .required()
      .minLength(8)
      .maxLength(100)
      .match(/^(?![^A-Z]+$)(?![^a-z]+$)(?![^0-9]+$)(?![A-Za-z0-9]+$).+$/),
    email: string()
      .required()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  },
  {
    stopInFirstError: true,
  },
);

export default createUserSchema;
