import Condition from "./Condition";
import ErrorData from "./ErrorData";

type ParseCondition<C extends Condition<any, any>, T> = C extends (
  arg: any,
  ...args: infer A
) => true | ErrorData
  ? ((...args: [...A, message?: string]) => T) & {
      not: (...args: [...A, message?: string]) => T;
    }
  : never;

export default ParseCondition;
