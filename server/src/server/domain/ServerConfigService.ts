import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";

type ServerConfig = {
  port: number;
  host: string;
};

@Injectable()
export default class ServerConfigService extends ConfigService<ServerConfig> {
  constructor() {
    super();
  }

  private getDefaultConfig(): ServerConfig {
    return {
      port: 3000,
      host: "localhost",
    };
  }

  protected getConfig(): ServerConfig {
    return {
      port: Number(process.env.SERVER_PORT),
      host: process.env.SERVER_HOST,
      ...this.getDefaultConfig(),
    };
  }
}
