import { ParseCondition } from "./ConditionArgs";
import ConditionSet from "./ConditionSet";
import SchemaResult from "./SchemaResult";

type Schema<T, O extends ConditionSet<T>> = {
  validate(value?: any): SchemaResult;
  default(defaultValue: T): Omit<Schema<T, O>, "default">;
} & {
  [K in keyof O]: ParseCondition<O[K], Schema<T, Omit<O, K>>>;
};

export default Schema;
