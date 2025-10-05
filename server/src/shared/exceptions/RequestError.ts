import ErrorData from "shared/types/ErrorData";

export default class RequestError extends Error {
  public static isRequestError(error: unknown): error is RequestError {
    return (
      error instanceof RequestError || error.constructor instanceof RequestError
    );
  }

  constructor(
    public readonly data: ErrorData,
    public readonly statusCode: number,
  ) {
    super(typeof data === "string" ? data : JSON.stringify(data));
    this.name = "RequestError";
  }

  toJSON() {
    return this.data;
  }
}
