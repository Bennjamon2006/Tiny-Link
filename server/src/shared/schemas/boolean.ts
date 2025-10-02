import schema from "./schema";

const boolean = schema(
  (arg: boolean) => typeof arg === "boolean" || "Value must be a boolean",
  {},
  (arg) => (arg === "true" ? true : arg === "false" ? false : arg),
);

export default boolean;
