import schema from "./schema";

const number = schema(
  (arg: number, message = "Value must be a valid number") =>
    Number.isNaN(arg) ? message : true,
  {
    min: (arg, min: number, message = `Value must be >= ${min}`) =>
      arg >= min || message,
    max: (arg, max: number, message = `Value must be <= ${max}`) =>
      arg <= max || message,
    positive: (arg, message = "Value must be positive") => arg > 0 || message,
    negative: (arg, message = "Value must be negative") => arg < 0 || message,
    int: (arg, message = "Value must be integer") =>
      Number.isInteger(arg) || message,
  },
  (arg) => Number(arg),
);

export default number;

export const range = (
  min: number,
  max: number,
  message = `Value must between ${min} and ${max}`,
) => number().min(min, message).max(max, message);
