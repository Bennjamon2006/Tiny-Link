import GetSessionByIdQuery from "auth/queries/GetSessionById.query";
import Middleware from "shared/classes/Middleware";
import Request from "shared/classes/Request";
import QueryBus from "shared/domain/QueryBus";
import UnauthorizedError from "shared/exceptions/CustomRequestErrors";

export default class VerifyAuth extends Middleware {
  public async use(req: Request): Promise<void> {
    const sessionId: string = req.headers.session;

    if (sessionId === undefined || sessionId === null) {
      throw new UnauthorizedError("No session provided");
    }

    const queryBus: QueryBus = this.get("Shared.QueryBus");

    const session = await queryBus.ask(new GetSessionByIdQuery(sessionId));

    req.session = session;
  }
}
