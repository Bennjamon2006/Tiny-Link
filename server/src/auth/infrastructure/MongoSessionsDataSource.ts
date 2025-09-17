import { Db } from "mongodb";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import MongoDataSource from "shared/infrastructure/mongo/DataSource";
import SessionsDataSource from "auth/data-sources/Sessions.dataSource";
import { PersistenceSession } from "auth/models/Session.dto";

@Injectable("DataSource")
export default class MongoSessionsDataSource
  extends MongoDataSource<PersistenceSession>
  implements SessionsDataSource
{
  constructor(@Inject("Shared.MongoDB.Connection") db: Db) {
    super(db);
  }

  public getCollectionName(): string {
    return "sessions";
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.collection.deleteMany({ userId });
  }
}
