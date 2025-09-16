import RequestError from "./RequestError";

export default class ConflictError extends RequestError {
  constructor(message: string) {
    super(message, 409);
  }
}
