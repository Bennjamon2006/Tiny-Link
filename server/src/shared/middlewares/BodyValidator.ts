import Middleware from "shared/classes/Middleware";
import Request from "shared/classes/Request";
import { BadRequestError } from "shared/exceptions/CustomRequestErrors";
import Validator from "shared/classes/Validator";
import Schema from "shared/types/Schema";

export default class BodyValidator extends Middleware {
  constructor(private readonly validator: Validator) {
    super();
  }

  public static useSchema(schema: Schema<any, {}>) {
    return this.use({
      validate(arg) {
        const result = schema.validate(arg, true);

        return result.ok === false ? result.error : true;
      },
    });
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
