import Injectable from "shared/decorators/Injectable";
import ConfigService from "shared/domain/ConfigService";

type EmailJSConfig = {
  user: string;
  password: string;
  host: string;
  ssl: boolean;
};

@Injectable()
export default class EmailJSConfigService extends ConfigService<EmailJSConfig> {
  constructor() {
    super();
  }

  public getConfig(): EmailJSConfig {
    return {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      host: process.env.MAIL_HOST,
      ssl: process.env.MAIL_SSL === "true",
    };
  }
}
