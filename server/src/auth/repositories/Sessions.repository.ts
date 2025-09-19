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
}
