import SessionsDataSource from "auth/data-sources/Sessions.dataSource";
import SessionMapper from "auth/mappers/Session.mapper";
import { PersistenceSession } from "auth/models/Session.dto";
import Session from "auth/models/Session.entity";
import Inject from "shared/decorators/Inject";

export default class SessionsRepository {
  constructor(
    @Inject("Auth.DataSource")
    private readonly sessionDataSource: SessionsDataSource,
  ) {}

  public async create(session: Session): Promise<Session> {
    const persistenceSession: PersistenceSession =
      SessionMapper.toPersistence(session);

    const created: PersistenceSession =
      await this.sessionDataSource.create(persistenceSession);

    return SessionMapper.fromPersistence(created);
  }

  public async getExistingSession(session: Session): Promise<Session | null> {
    const existing: PersistenceSession = await this.sessionDataSource.getOne({
      userId: session.userId,
      ip: session.ip,
      userAgent: session.userAgent,
    });

    if (!existing) {
      return null;
    }

    return SessionMapper.fromPersistence(existing);
  }

  public async getSessionById(id: string): Promise<Session | null> {
    const session: PersistenceSession =
      await this.sessionDataSource.getById(id);

    if (!session) {
      return null;
    }

    return SessionMapper.fromPersistence(session);
  }
}
