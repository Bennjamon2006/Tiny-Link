import Controller from "shared/decorators/Controller";
import { Get, Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Created, Ok } from "shared/classes/CustomResponses";
import BodyValidator from "shared/middlewares/BodyValidator";
import { ExposedUser, UserToCreate } from "users/models/User.dto";
import UserToCreateValidator from "users/validators/UserToCreate.validator";
import Inject from "shared/decorators/Inject";
import CommandBus from "shared/domain/CommandBus";
import QueryBus from "shared/domain/QueryBus";
import CreateUserCommand from "users/commands/CreateUser.command";
import CreateSessionCommand from "auth/commands/CreateSession.command";
import GetUserByIdQuery from "users/queries/GetUserById.query";
import VerifyAuth from "auth/middlewares/VerifyAuth";

@Controller("/users")
export default class UsersController {
  constructor(
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
    @Inject("Shared.QueryBus") private readonly queryBus: QueryBus,
  ) {}

  @Get("/", VerifyAuth.use())
  public async getUserById(req: Request): Promise<Response> {
    const user: ExposedUser = await this.queryBus.ask(
      new GetUserByIdQuery(req.session.userId),
    );

    return new Ok(user);
  }

  @Post("/", BodyValidator.use(UserToCreateValidator))
  public async createUser(req: Request): Promise<Response> {
    const data: UserToCreate = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const autoLogin: boolean = req.body.autoLogin ?? true;

    const userId = await this.commandBus.execute(new CreateUserCommand(data));

    if (autoLogin) {
      const sessionId = await this.commandBus.execute(
        new CreateSessionCommand({
          userId,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        }),
      );

      return new Created({ userId }, { session: sessionId });
    }

    return new Created({ userId });
  }
}
