import ObjectSchemaPattern from "shared/types/ObjectSchemaPattern";
import schema from "./schema";
import ErrorData from "shared/types/ErrorData";
import ObjectSchemaOptions from "shared/types/ObjectSchemaOptions";

export default function object<T extends {}>(
  pattern: ObjectSchemaPattern<T>,
  options?: ObjectSchemaOptions,
) {
  const schemaObject = schema(
    (arg: T) => {
      const errors: ErrorData = {};
      let ok = true;

      for (const key in pattern) {
        const result = pattern[key].validate(arg[key]);

        if (result.ok === false) {
          errors[key] =
            options?.stopInFirstError && Array.isArray(result.error)
              ? result.error[0]
              : result.error;
          ok = false;
        }
      }

      if (ok) {
        return true;
      }

      return errors;
    },
    {
      whitelist: (arg) => {
        const errors: string[] = [];

        for (const key in arg) {
          if (!pattern[key]) {
            errors.push(`Unnkown field: ${key}`);
          }
        }

        return errors.length === 0 || errors;
      },
    },
    (arg) => {
      const result: T = {} as T;
      for (const key in arg) {
        if (pattern[key as keyof ObjectSchemaPattern<T>]) {
          result[key as keyof T] = pattern[
            key as keyof ObjectSchemaPattern<T>
          ].validate(arg[key]).value;
        } else {
          result[key as keyof T] = arg[key];
        }
      }

      return result;
    },
  )();

  return schemaObject;
}
