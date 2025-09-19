import LoginCommand from "auth/commands/Login.command";
import AuthService from "auth/services/Auth.service";
import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";
import CreateSessionCommand from "auth/commands/CreateSession.command";
import Inject from "shared/decorators/Inject";
import CommandBus from "shared/domain/CommandBus";
import { SessionToCreate } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";

@CommandHandler()
export default class AuthCommandHandler {
  constructor(
    private readonly authService: AuthService,
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
  ) {}

  @OnCommand()
  public async handleLogin(command: LoginCommand): Promise<string> {
    const user = await this.authService.login(command.params);

    const sessionToCreate: SessionToCreate = {
      userId: user.id,
      ip: command.params.ip,
      userAgent: command.params.userAgent,
    };

    const session = await this.commandBus.execute(
      new CreateSessionCommand(sessionToCreate),
    );

    return session.id;
  }

  @OnCommand()
  public async createSessionHandler(
    command: CreateSessionCommand,
  ): Promise<Session> {
    return this.authService.createSession(command.params);
  }
}
