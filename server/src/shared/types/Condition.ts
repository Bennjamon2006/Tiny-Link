import ErrorData from "./ErrorData";

type Condition<T, A extends any[]> = (arg: T, ...args: A) => true | ErrorData;

export default Condition;
