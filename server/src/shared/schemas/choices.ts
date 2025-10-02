import Choice from "shared/types/Choice";
import schema from "./schema";

export default function choices<A extends Choice[]>(...options: A) {
  return schema(
    (arg: A[number]) =>
      options.includes(arg) ||
      `Invalid value, allowed values are: ${options.map((v) => JSON.stringify(v)).join(", ")}`,
  );
}
