import { Db } from "mongodb";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import MongoDataSource from "shared/infrastructure/mongo/DataSource";
import User from "users/models/User.entity";

@Injectable("DataSource")
export default class MongoUserDataSource extends MongoDataSource<User> {
  constructor(@Inject("Shared.MongoDB.Connection") db: Db) {
    super(db);
  }

  getCollectionName(): string {
    return "users";
  }
}
