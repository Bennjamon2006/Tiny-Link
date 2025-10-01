import schema from "./schema";

const boolean = schema(
  (arg: boolean, message = "Value must be a boolean") =>
    typeof arg === "boolean" || message,
  {},
  (arg) => (arg === "true" ? true : arg === "false" ? false : arg),
);

export default boolean;
