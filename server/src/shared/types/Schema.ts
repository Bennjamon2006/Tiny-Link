import ConditionSet from "./ConditionSet";
import ParseCondition from "./ParseCondition";
import SchemaResult from "./SchemaResult";

type Base<
  T,
  O extends ConditionSet<T>,
  E extends keyof O | "default" | "required",
> = Omit<
  {
    validate(value?: any): SchemaResult<T>;
    required(message?: string): DynamicSchema<T, O, E | "required">;
    default(defaultValue: T): DynamicSchema<T, O, E | "default">;
  },
  E
>;

type DynamicSchema<
  T,
  O extends ConditionSet<T>,
  E extends keyof O | "default",
> = Base<T, O, E> & {
  [K in Exclude<keyof O, E>]: ParseCondition<O[K], DynamicSchema<T, O, E | K>>;
};

type Schema<T, O extends ConditionSet<T>> = DynamicSchema<T, O, never>;

export default Schema;
