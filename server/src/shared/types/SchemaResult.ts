import ErrorData from "./ErrorData";

type SchemaResult =
  | {
      ok: true;
      value: any;
    }
  | {
      ok: false;
      value: any;
      error: ErrorData;
    };

export default SchemaResult;
