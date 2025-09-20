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
import DeleteSessionCommand from "auth/commands/DeleteSession.command";
import LogoutCommand from "auth/commands/Logout.command";
import GetSessionByIdQuery from "auth/queries/GetSessionById.query";
import { ForbiddenError } from "shared/exceptions/CustomRequestErrors";

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

  @OnCommand()
  public async handleDeleteSession(
    command: DeleteSessionCommand,
  ): Promise<void> {
    await this.authService.deleteSession(command.params);
  }

  @OnCommand()
  public async handleLogout(command: LogoutCommand): Promise<void> {
    if (command.params.sessionId === command.params.authenticatedSession.id) {
      await this.commandBus.execute(
        new DeleteSessionCommand(command.params.sessionId),
      );

      return;
    }

    const session = await this.queryBus.ask(
      new GetSessionByIdQuery(command.params.sessionId),
    );

    if (session.userId !== command.params.authenticatedSession.userId) {
      throw new ForbiddenError(
        "Cannot delete a session that does not belong to the authenticated user",
      );
    }

    await this.commandBus.execute(
      new DeleteSessionCommand(command.params.sessionId),
    );
  }
}
