import ValidationError from "./ValidationError";

type Condition<T, A extends any[]> = (
  arg: T,
  ...args: A
) => true | ValidationError;

export default Condition;
