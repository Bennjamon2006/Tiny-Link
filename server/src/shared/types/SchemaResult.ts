import ValidationError from "./ValidationError";

type SchemaResult =
  | {
      ok: true;
      value: any;
    }
  | {
      ok: false;
      value: any;
      error: ValidationError;
    };

export default SchemaResult;
