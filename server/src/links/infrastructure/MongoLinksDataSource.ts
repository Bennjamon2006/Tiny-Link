import { Db } from "mongodb";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import MongoDataSource from "shared/infrastructure/mongo/DataSource";
import LinksDataSource from "links/data-sources/Links.dataSource";
import { PersistenceLink } from "links/models/Link.dto";

@Injectable("DataSource")
export default class MongoLinksDataSource
  extends MongoDataSource<PersistenceLink>
  implements LinksDataSource
{
  constructor(@Inject("Shared.MongoDB.Connection") db: Db) {
    super(db);
  }

  public getCollectionName(): string {
    return "links";
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.collection.deleteMany({ userId });
  }
}
