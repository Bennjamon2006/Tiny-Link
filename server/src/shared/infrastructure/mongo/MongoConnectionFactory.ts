import { Db, MongoClient } from "mongodb";
import MongoConfigService from "./MongoConfigService";
import Logger from "shared/domain/Logger";

export class MongoConnectionFactory {
  private static db: Db;

  public static async getDb(
    mongoConfigService: MongoConfigService,
    logger: Logger,
  ): Promise<Db> {
    if (!this.db) {
      try {
        this.db = await this.createConnection(mongoConfigService);

        logger.info("Connected to MongoDB");
      } catch (err) {
        logger.error(`Error while connecting to MongoDB: ${err.message}`);
      }
    }

    return this.db;
  }

  private static async createConnection(
    mongoConfigService: MongoConfigService,
  ): Promise<Db> {
    const database = mongoConfigService.get("database");
    const uri = this.createUri(mongoConfigService);
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(database);
  }

  private static createUri(mongoConfigService: MongoConfigService): string {
    const host = mongoConfigService.get("host");
    const port = mongoConfigService.get("port");
    const username = mongoConfigService.get("username");
    const password = mongoConfigService.get("password");

    let uri = mongoConfigService.get("protocol");

    if (username && password) {
      uri += `${username}:${password}@`;
    }

    uri += `${host}:${port}`;

    return uri;
  }
}
