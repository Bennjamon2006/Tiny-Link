import ChangeSessionLastVisitCommand from "auth/commands/ChangeSessionLastVisit.command";
import GetSessionByIdQuery from "auth/queries/GetSessionById.query";
import Middleware from "shared/classes/Middleware";
import Request from "shared/classes/Request";
import CommandBus from "shared/domain/CommandBus";
import QueryBus from "shared/domain/QueryBus";
import {
  ForbiddenError,
  UnauthorizedError,
} from "shared/exceptions/CustomRequestErrors";

export default class VerifyAuth extends Middleware {
  constructor(private readonly strict: boolean = true) {
    super();
  }

  public async use(req: Request): Promise<void> {
    const sessionId: string = req.headers.session;

    if (sessionId === undefined || sessionId === null) {
      if (!this.strict) {
        return;
      }

      throw new UnauthorizedError("No session provided");
    }

    const queryBus: QueryBus = this.get("Shared.QueryBus");
    const commandBus: CommandBus = this.get("Shared.CommandBus");

    const session = await queryBus.ask(new GetSessionByIdQuery(sessionId));

    if (
      session.ip !== req.ip ||
      session.userAgent !== req.headers["user-agent"]
    ) {
      throw new ForbiddenError("Session does not match request context");
    }

    await commandBus.execute(new ChangeSessionLastVisitCommand(session.id));

    req.session = session;
  }
}
