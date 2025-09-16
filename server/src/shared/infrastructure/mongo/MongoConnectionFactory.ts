import { Db, MongoClient } from "mongodb";
import MongoConfigService, { MongoConfig } from "./MongoConfigService";
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
    const config = mongoConfigService.getConfig();
    const uri = this.createUri(config);
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(config.database);
  }

  private static createUri(config: MongoConfig): string {
    let uri = "mongodb://";

    if (config.username && config.password) {
      uri += `${config.username}:${config.password}@`;
    }

    uri += `${config.host}:${config.port}`;

    return uri;
  }
}
