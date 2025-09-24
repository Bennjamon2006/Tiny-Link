import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";

type MongoConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

@Injectable()
export default class MongoConfigService extends ConfigService<MongoConfig> {
  constructor() {
    super();
  }

  private getDefaultConfig(): MongoConfig {
    return {
      host: "localhost",
      port: 27017,
      database: "mydatabase",
      username: "",
      password: "",
    };
  }

  protected getConfig(): MongoConfig {
    return {
      host: process.env.MONGO_HOST,
      port: Number(process.env.MONGO_PORT),
      database: process.env.MONGO_DATABASE,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      ...this.getDefaultConfig(),
    };
  }
}
