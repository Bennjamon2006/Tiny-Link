import Condition from "./Condition";

type ConditionSet<T> = Record<string, Condition<T, any[]>>;

export default ConditionSet;
