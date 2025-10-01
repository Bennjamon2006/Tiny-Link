import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";
import { range } from "shared/schemas/number";
import object from "shared/schemas/object";
import string from "shared/schemas/string";

type ServerConfig = {
  port: number;
  host: string;
};

@Injectable()
export default class ServerConfigService extends ConfigService<ServerConfig> {
  constructor() {
    super(
      object({
        port: range(0, 65535).int().default(3000),
        host: string()
          .match(
            /^(?=.{1,253}$)(?!-)([a-zA-Z0-9-]{1,63})(\.(?!-)[a-zA-Z0-9-]{1,63})*$/,
          )
          .default("localhost"),
      }),
    );
  }

  protected getConfig() {
    return {
      port: process.env.SERVER_PORT,
      host: process.env.SERVER_HOST,
    };
  }
}
