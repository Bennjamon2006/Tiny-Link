import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";
import boolean from "shared/schemas/boolean";
import object from "shared/schemas/object";
import string, { host } from "shared/schemas/string";

type EmailJSConfig = {
  user: string;
  password: string;
  host: string;
  ssl: boolean;
};

@Injectable()
export default class EmailJSConfigService extends ConfigService<EmailJSConfig> {
  constructor() {
    super(
      object({
        user: string().required(),
        password: string().required(),
        host: host().required(),
        ssl: boolean().required(),
      }),
    );
  }

  public getConfig() {
    return {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      host: process.env.MAIL_HOST,
      ssl: process.env.MAIL_SSL,
    };
  }
}
