import Condition from "shared/types/Condition";
import Schema from "shared/types/Schema";
import ErrorData from "shared/types/ErrorData";
import SetupError from "shared/exceptions/SetupError";

function buildSchema<T, O extends Record<string, Condition<T, any[]>> = {}>(
  options: O = {} as any,
  parser: (arg: any) => T = (arg) => arg,
  conditions: Condition<T, []>[] = [],
  defaultValue?: T,
): Schema<T, O> {
  const schemaObject: Schema<T, O> = {
    validate(value = defaultValue, stopOnFirstError = false) {
      const arg = parser(value);

      const errors: ErrorData = [];

      for (const condidion of conditions) {
        try {
          const result = condidion(arg);

          if (result !== true) {
            if (stopOnFirstError) {
              return {
                ok: false,
                error: result,
                value: arg,
              };
            }

            errors.push(result);
          }
        } catch (err) {}
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
    required(message) {
      const newConditions = [...conditions];

      newConditions.unshift((arg) => {
        return arg === undefined || arg === null
          ? (message ?? "Value is required")
          : true;
      });

      return buildSchema(options, parser, newConditions, defaultValue) as any;
    },
  } as Schema<T, O>;

  if (defaultValue === undefined) {
    schemaObject.default = ((value: T) => {
      return buildSchema(options, parser, conditions, value);
    }) as any;
  }

  for (const key in options) {
    const paramCount = options[key].length;
    schemaObject[key] = ((...args: any[]) => {
      let message: string | undefined;
      if (args.length === paramCount + 1) {
        message = args.pop();
      } else if (args.length > paramCount) {
        throw new SetupError(
          `Condition ${key} accepts at most ${paramCount + 1} parameters`,
        );
      }

      const newOptions = { ...options };
      const newConditions = [...conditions];

      delete newOptions[key];
      newConditions.push((arg) => {
        const result = options[key](arg, ...args);

        return result === true ? result : (message ?? result);
      });

      return buildSchema(newOptions, parser, newConditions, defaultValue);
    }) as any;

    schemaObject[key].not = ((...args: any[]) => {
      let message: string | undefined;
      if (args.length === paramCount + 1) {
        message = args.pop();
      } else if (args.length > paramCount) {
        throw new SetupError(
          `Condition ${key} accepts at most ${paramCount + 1} parameters`,
        );
      }

      const newOptions = { ...options };
      const newConditions = [...conditions];

      delete newOptions[key];
      newConditions.push((arg) => {
        const result = options[key](arg, ...args);

        return result !== true
          ? true
          : (message ??
              `Value must no satsfy ${key}(${args.map((a) => JSON.stringify(a)).join(", ")})`);
      });

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
