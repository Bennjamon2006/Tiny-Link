import schema from "./schema";

const number = schema(
  (arg: number) => (Number.isNaN(arg) ? "Value must be a valid number" : true),
  {
    min: (arg, min: number) => arg >= min || `Value must be >= ${min}`,
    max: (arg, max: number) => arg <= max || `Value must be <= ${max}`,
    positive: (arg) => arg > 0 || "Value must be positive",
    negative: (arg) => arg < 0 || "Value must be negative",
    int: (arg) => Number.isInteger(arg) || "Value must be integer",
  },
  (arg) => Number(arg),
);

export default number;

export const range = (
  min: number,
  max: number,
  message = `Value must between ${min} and ${max}`,
) => number().min(min, message).max(max, message);
