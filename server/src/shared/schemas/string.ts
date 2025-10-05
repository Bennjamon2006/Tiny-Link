import combine from "./combine";
import schema from "./schema";

const string = schema(
  (arg: string) => typeof arg === "string" || "Value must be a string",
  {
    minLength: (arg, min: number) => arg.length >= min || "Value is too short",
    maxLength: (arg, max: number) => arg.length <= max || "Value is too long",
    match: (arg, pattern: RegExp) =>
      pattern.test(arg) || "Value has a invalid format",
    startsWith: (arg, prefix: string) =>
      arg.startsWith(prefix) || `Value must start with "${prefix}"`,

    endsWith: (arg, suffix: string) =>
      arg.endsWith(suffix) || `Value must end with "${suffix}"`,
  },
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

export const host = () =>
  string().match(
    /^(?=.{1,253}$)(?!-)([a-zA-Z0-9-]{1,63})(\.(?!-)[a-zA-Z0-9-]{1,63})*$/,
  );
