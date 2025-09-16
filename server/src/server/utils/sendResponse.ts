import { Response as ExpressReponse } from "express";
import Response from "shared/classes/Response";

export default function sendResponse(
  res: ExpressReponse,
  response: Response,
): void {
  res.status(response.status).set(response.headers).send(response.body);
}
