import { Db } from "mongodb";
import MongoDataSource from "shared/infrastructure/mongo/DataSource";
import { PersistenceUser } from "users/models/User.dto";
import UsersDataSource from "../data-sources/Users.dataSource";
import Injectable from "shared/decorators/Injectable";
import Inject from "shared/decorators/Inject";

@Injectable("DataSource")
export default class MongoUserDataSource
  extends MongoDataSource<PersistenceUser>
  implements UsersDataSource
{
  constructor(@Inject("Shared.MongoDB.Connection") db: Db) {
    super(db);
  }

  public getCollectionName(): string {
    return "users";
  }

  async getByUsername(username: string): Promise<PersistenceUser | null> {
    return this.collection.findOne({
      username: { $regex: `^${username}$`, $options: "i" },
    });
  }

  async getByEmail(email: string): Promise<PersistenceUser | null> {
    return this.collection.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
  }
}
