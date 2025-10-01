import Choice from "shared/types/Choice";
import schema from "./schema";

export default function choices<A extends Choice[]>(...options: A) {
  return schema(
    (
      arg: A[number],
      message = `Invalid value, allowed values are: ${options.map((v) => JSON.stringify(v)).join(", ")}`,
    ) => options.includes(arg) || message,
  );
}
