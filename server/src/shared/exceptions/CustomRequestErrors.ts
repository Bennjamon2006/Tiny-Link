import ErrorData from "shared/types/ErrorData";
import RequestError from "./RequestError";

export class InternalServerError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 500);
  }
}

export class BadRequestError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 400);
  }
}

export class ConflictError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 409);
  }
}

export class NotFoundError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 404);
  }
}

export class UnauthorizedError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 401);
  }
}

export class ForbiddenError extends RequestError {
  constructor(data: ErrorData) {
    super(data, 403);
  }
}
