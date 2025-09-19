import SessionMapper from "auth/mappers/Session.mapper";
import LoginData from "auth/models/LoginData";
import { ExposedSession, SessionToCreate } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import SessionsRepository from "auth/repositories/Sessions.repository";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import QueryBus from "shared/domain/QueryBus";
import { UnauthorizedError } from "shared/exceptions/CustomRequestErrors";
import User from "users/models/User.entity";
import GetUserByCredentialsQuery from "users/queries/GetUserByCredentials.query";

@Injectable()
export default class AuthService {
  constructor(
    @Inject("Shared.QueryBus") private readonly queryBus: QueryBus,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  public async login(data: LoginData): Promise<User> {
    return this.queryBus.ask(
      new GetUserByCredentialsQuery({
        username: data.username,
        password: data.password,
      }),
    );
  }

  public async createSession(
    sessionToCreate: SessionToCreate,
  ): Promise<Session> {
    const session = SessionMapper.fromCreate(sessionToCreate);

    return this.sessionsRepository.create(session);
  }

  public async getExistingSession(
    sessionToCreate: SessionToCreate,
  ): Promise<Session | null> {
    const session = SessionMapper.fromCreate(sessionToCreate);

    return this.sessionsRepository.getExistingSession(session);
  }

  public async getSessionById(id: string): Promise<ExposedSession> {
    const session = await this.sessionsRepository.getSessionById(id);

    if (!session) {
      throw new UnauthorizedError("Invalid session");
    }

    return SessionMapper.toExposed(session);
  }

  public async getUserSessions(userId: string): Promise<ExposedSession[]> {
    const sessions = await this.sessionsRepository.getUserSessions(userId);

    return sessions.map(SessionMapper.toExposed);
  }
}
