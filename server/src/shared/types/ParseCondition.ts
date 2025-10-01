import Condition from "./Condition";

type ParseCondition<C extends Condition<any, any>, T> = C extends (
  arg: any,
  ...args: infer A
) => true | string
  ? (...args: A) => T
  : never;

export default ParseCondition;
