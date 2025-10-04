import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";
import choices from "shared/schemas/choices";
import { range } from "shared/schemas/number";
import object from "shared/schemas/object";
import string, { host } from "shared/schemas/string";

const protocol = choices("mongodb://", "mongo+svr://");

type MongoConfig = {
  protocol: string;
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
};

@Injectable()
export default class MongoConfigService extends ConfigService<MongoConfig> {
  constructor() {
    super(
      object({
        protocol: protocol().default("mongodb://"),
        host: host().default("localhost"),
        port: range(0, 65535).int().default(27017),
        database: string().default("mydatabase"),
      }),
    );
  }

  protected getConfig() {
    return {
      protocol: process.env.MONGO_PROTOCOL,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      database: process.env.MONGO_DATABASE,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
    };
  }
}
