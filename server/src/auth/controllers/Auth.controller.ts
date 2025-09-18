import Controller from "shared/decorators/Controller";
import { Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Ok } from "shared/classes/CustomResponses";
import LoginData from "auth/models/LoginData";
import Inject from "shared/decorators/Inject";
import CommandBus from "shared/domain/CommandBus";
import LoginCommand from "auth/commands/Login.command";

@Controller("/auth")
export default class AuthController {
  constructor(
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
  ) {}

  @Post("/login")
  public async login(req: Request): Promise<Response> {
    const loginData: LoginData = {
      username: req.body.username,
      password: req.body.password,
    };

    const command = new LoginCommand(loginData);

    await this.commandBus.execute(command);

    return new Ok();
  }
}
