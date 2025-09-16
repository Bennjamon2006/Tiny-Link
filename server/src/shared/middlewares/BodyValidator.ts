import Middleware from "shared/classes/Middleware";
import Request from "shared/classes/Request";
import BadRequestError from "shared/exceptions/BadRequestError";
import Validator from "shared/classes/Validator";

export default class BodyValidator extends Middleware {
  constructor(private readonly validator: Validator) {
    super();
  }

  public use(req: Request): void {
    if (req.body === undefined || req.body === null) {
      throw new BadRequestError("No body provided");
    }

    const result = this.validator.validate(req.body);

    if (result !== true) {
      throw new BadRequestError(result);
    }
  }
}
