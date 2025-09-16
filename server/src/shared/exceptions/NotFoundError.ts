import RequestError from "./RequestError";

export default class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message, 404);
  }
}
