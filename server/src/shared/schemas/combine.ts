import ConditionSet from "shared/types/ConditionSet";
import Schema from "shared/types/Schema";
import schema from "./schema";

export default function combine<
  T,
  O1 extends ConditionSet<T>,
  O2 extends ConditionSet<T> & Partial<O1>,
>(schema1: Schema<T, O1>, schema2: Schema<T, O2>): Schema<T, O1 & O2> {
  const schemaObject = schema((arg: T) => {
    const result1 = schema1.validate(arg);

    if (result1.ok === false) {
      return result1.error;
    }

    const result2 = schema2.validate(result1.value);

    if (result2.ok === false) {
      return result2.error;
    }

    return true;
  })();

  for (const key in schema1) {
    if (key === "default" || key === "validate") {
      continue;
    }

    (schemaObject as any)[key] = (...args: any[]) => {
      if (key in schema2) {
        return combine(
          schema1[key](...args) as any,
          schema2[key](...args) as any,
        );
      }

      return combine(schema1[key](...args) as any, schema2);
    };

    (schemaObject as any)[key].not = (...args: any[]) => {
      if (key in schema2) {
        return combine(
          schema1[key].not(...args) as any,
          schema2[key].not(...args) as any,
        );
      }

      return combine(schema1[key].not(...args) as any, schema2);
    };
  }

  for (const key in schema2) {
    if (key === "default" || key === "validate" || key in schema1) {
      continue;
    }

    (schemaObject as any)[key] = (...args: any[]) =>
      combine(schema1, schema2[key](...args) as any);

    (schemaObject as any)[key].not = (...args: any[]) =>
      combine(schema1, schema2[key].not(...args) as any);
  }

  return schemaObject as any;
}
