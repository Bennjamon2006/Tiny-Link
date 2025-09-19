import LoginCommand from "auth/commands/Login.command";
import AuthService from "auth/services/Auth.service";
import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";
import CreateSessionCommand from "auth/commands/CreateSession.command";
import Inject from "shared/decorators/Inject";
import CommandBus from "shared/domain/CommandBus";
import { SessionToCreate } from "auth/models/Session.dto";
import QueryBus from "shared/domain/QueryBus";
import GetExistingSessionQuery from "auth/queries/GetExistingSession.query";
import ChangeSessionLastVisitCommand from "auth/commands/ChangeSessionLastVisit.command";

@CommandHandler()
export default class AuthCommandHandler {
  constructor(
    private readonly authService: AuthService,
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
    @Inject("Shared.QueryBus") private readonly queryBus: QueryBus,
  ) {}

  @OnCommand()
  public async handleLogin(command: LoginCommand): Promise<string> {
    const user = await this.authService.login(command.params);

    const sessionToCreate: SessionToCreate = {
      userId: user.id,
      ip: command.params.ip,
      userAgent: command.params.userAgent,
    };

    const existingSession = await this.queryBus.ask(
      new GetExistingSessionQuery(sessionToCreate),
    );

    if (existingSession) {
      return existingSession.id;
    }

    const sessionId = await this.commandBus.execute(
      new CreateSessionCommand(sessionToCreate),
    );

    return sessionId;
  }

  @OnCommand()
  public async handleCreateSession(
    command: CreateSessionCommand,
  ): Promise<string> {
    const session = await this.authService.createSession(command.params);

    return session.id;
  }

  @OnCommand()
  public async handleChangeSessionLastVisit(
    command: ChangeSessionLastVisitCommand,
  ): Promise<void> {
    await this.authService.changeSessionLastVisit(command.params);
  }
}
