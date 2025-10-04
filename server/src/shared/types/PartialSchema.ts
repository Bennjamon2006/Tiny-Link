import SchemaResult from "./SchemaResult";

type PartialSchema<T> = {
  validate(value?: any): SchemaResult<T>;
  required?(message?: string): PartialSchema<T>;
  default?(defaultValue: T): PartialSchema<T>;
};

export default PartialSchema;
