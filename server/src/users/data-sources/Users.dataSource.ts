import DataSource from "shared/domain/DataSource";
import { PersistenceUser } from "users/models/User.dto";

export default interface UsersDataSource extends DataSource<PersistenceUser> {
  getByUsername(username: string): Promise<PersistenceUser | null>;
  getByEmail(email: string): Promise<PersistenceUser | null>;
}
