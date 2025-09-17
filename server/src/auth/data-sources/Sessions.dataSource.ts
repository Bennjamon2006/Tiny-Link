import { PersistenceSession } from "auth/models/Session.dto";
import DataSource from "shared/domain/DataSource";

export default interface SessionsDataSource
  extends DataSource<PersistenceSession> {
  deleteByUserId(userId: string): Promise<void>;
}
