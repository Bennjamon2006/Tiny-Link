import ErrorData from "shared/types/ErrorData";

export default class SetupError extends Error {
  constructor(public readonly data: ErrorData) {
    super(
      `SetupError: ${typeof data === "string" ? data : JSON.stringify(data)}`,
    );
    this.name = "SetupError";
  }
}
