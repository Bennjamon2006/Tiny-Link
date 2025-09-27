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
    const defaultConnfig = this.getDefaultConfig();

    return {
      host: process.env.MONGO_HOST || defaultConnfig.host,
      port: Number(process.env.MONGO_PORT) || defaultConnfig.port,
      database: process.env.MONGO_DATABASE || defaultConnfig.database,
      username: process.env.MONGO_USERNAME || defaultConnfig.username,
      password: process.env.MONGO_PASSWORD || defaultConnfig.password,
    };
  }
}
