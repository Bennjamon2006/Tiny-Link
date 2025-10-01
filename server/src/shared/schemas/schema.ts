import Condition from "shared/types/Condition";
import Schema from "shared/types/Schema";
import ErrorData from "shared/types/ErrorData";

function buildSchema<T, O extends Record<string, Condition<T, any[]>> = {}>(
  options: O = {} as any,
  parser: (arg: any) => T = (arg) => arg,
  conditions: Condition<T, []>[] = [],
  defaultValue?: T,
): Schema<T, O> {
  const schemaObject: Schema<T, O> = {
    validate(value = defaultValue) {
      const arg = parser(value);

      const errors: ErrorData = [];

      for (const condidion of conditions) {
        const result = condidion(arg);

        if (result !== true) {
          errors.push(result);
        }
      }

      if (errors.length === 0) {
        return {
          ok: true,
          value: arg,
        };
      }

      return {
        ok: false,
        value: arg,
        error: errors.length === 1 ? errors[0] : errors,
      };
    },
  } as Schema<T, O>;

  if (defaultValue === undefined) {
    schemaObject.default = (value) => {
      return buildSchema(options, parser, conditions, value);
    };
  }

  for (const key in options) {
    schemaObject[key] = ((...args: any[]) => {
      const newOptions = { ...options };
      const newConditions = [...conditions];

      delete newOptions[key];
      newConditions.push((arg) => options[key](arg, ...args));

      return buildSchema(newOptions, parser, newConditions, defaultValue);
    }) as any;
  }

  return schemaObject;
}

export default function schema<
  T,
  A extends any[],
  O extends Record<string, Condition<T, any[]>>,
>(
  intialCondition: Condition<T, A>,
  options: O = {} as any,
  parser?: (arg: any) => T,
): (...args: A) => Schema<T, O> {
  return (...args) => {
    return buildSchema(options, parser, [
      (arg) => intialCondition(arg, ...args),
    ]);
  };
}
