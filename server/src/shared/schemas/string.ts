import combine from "./combine";
import schema from "./schema";

const string = schema(
  (arg: string, message = "Value must be a string") =>
    typeof arg === "string" || message,
  {
    minLength: (arg, min: number, message = "Value is too short") =>
      arg.length >= min || message,
    maxLength: (arg, max: number, message = "Value is too long") =>
      arg.length <= max || message,
    match: (arg, pattern: RegExp, message = "Value has a invalid format") =>
      pattern.test(arg) || message,
    startsWith: (
      arg,
      prefix: string,
      message = `Value must start with "${prefix}"`,
    ) => arg.startsWith(prefix) || message,

    endsWith: (
      arg,
      suffix: string,
      message = `Value must end with "${suffix}"`,
    ) => arg.endsWith(suffix) || message,
  },
  (arg) => String(arg),
);

export default string;

const urlSchema = schema((arg: string, protocols = ["http", "https"]) => {
  try {
    const urlObject = new URL(arg);

    return (
      protocols.includes(urlObject.protocol.slice(0, -1)) ||
      "Invalid URL protocol"
    );
  } catch (err) {
    return "Invalid url";
  }
});

export const url = (protocols?: string[]) =>
  combine(string(), urlSchema(protocols));
