import Controller from "shared/decorators/Controller";
import { Get, Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Ok } from "shared/classes/CustomResponses";
import LoginData from "auth/models/LoginData";
import Inject from "shared/decorators/Inject";
import CommandBus from "shared/domain/CommandBus";
import LoginCommand from "auth/commands/Login.command";
import VerifyAuth from "auth/middlewares/VerifyAuth";
import QueryBus from "shared/domain/QueryBus";
import GetUserSessionsQuery from "auth/queries/GetUserSessions.query";
import LogoutCommand from "auth/commands/Logout.command";
import BodyValidator from "shared/middlewares/BodyValidator";
import loginDataSchema from "auth/schemas/loginData.schema";

@Controller("/auth")
export default class AuthController {
  constructor(
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
    @Inject("Shared.QueryBus") private readonly queryBus: QueryBus,
  ) {}

  @Post("/login", BodyValidator.useSchema(loginDataSchema))
  public async login(req: Request): Promise<Response> {
    const loginData: LoginData = {
      username: req.body.username,
      password: req.body.password,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    const command = new LoginCommand(loginData);

    const sessionId = await this.commandBus.execute(command);

    return new Ok(undefined, { session: sessionId });
  }

  @Get("/sessions", VerifyAuth.use())
  public async getUserSessions(req: Request): Promise<Response> {
    const userSessions = await this.queryBus.ask(
      new GetUserSessionsQuery(req.session.userId),
    );

    return new Ok(userSessions);
  }

  @Post("/logout", VerifyAuth.use())
  public async logout(req: Request): Promise<Response> {
    const { sessionId = req.session.id } = req.body;

    await this.commandBus.execute(
      new LogoutCommand({
        authenticatedSession: req.session,
        sessionId,
      }),
    );

    return new Ok();
  }
}
