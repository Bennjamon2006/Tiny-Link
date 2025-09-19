import SessionMapper from "auth/mappers/Session.mapper";
import LoginData from "auth/models/LoginData";
import { SessionToCreate } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import SessionsRepository from "auth/repositories/Sessions.repository";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import QueryBus from "shared/domain/QueryBus";
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
}
