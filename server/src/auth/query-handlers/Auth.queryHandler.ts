import { ExposedSession } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import GetExistingSessionQuery from "auth/queries/GetExistingSession.query";
import GetSessionByIdQuery from "auth/queries/GetSessionById.query";
import AuthService from "auth/services/Auth.service";
import OnQuery from "shared/decorators/OnQuery";
import QueryHandler from "shared/decorators/QueryHandler";

@QueryHandler()
export default class AuthQueryHandler {
  constructor(private readonly authService: AuthService) {}

  @OnQuery()
  public async handleGetExistingSession(
    query: GetExistingSessionQuery,
  ): Promise<Session | null> {
    return this.authService.getExistingSession(query.params);
  }

  @OnQuery()
  public async handleGetSessionById(
    query: GetSessionByIdQuery,
  ): Promise<ExposedSession | null> {
    return this.authService.getSessionById(query.params);
  }
}
