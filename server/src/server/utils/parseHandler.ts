import { RequestHandler } from "express";
import RequestError from "shared/exceptions/RequestError";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import Handler from "shared/types/Handler";
import Middleware from "shared/classes/Middleware";
import sendResponse from "./sendResponse";

export default function parseHandler(
  handler: Handler,
  middlewares: Middleware[],
): RequestHandler {
  return async (req, res, next) => {
    try {
      const request = new Request(
        req.body,
        req.query,
        req.params,
        req.headers,
        req.method,
        req.url,
        req.ip,
      );

      for (const middleware of middlewares) {
        const response = middleware.use(req);

        if (response instanceof Response) {
          sendResponse(res, response);
        }
      }

      const response: Response = await handler(request);

      sendResponse(res, response);
    } catch (error) {
      if (RequestError.isRequestError(error)) {
        next(error);
      } else {
        next(new RequestError(error.message, 500));
      }
    }
  };
}
