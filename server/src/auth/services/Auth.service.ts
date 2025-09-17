import LoginData from "auth/models/LoginData";
import Injectable from "shared/decorators/Injectable";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";

@Injectable()
export default class AuthService {
  constructor() {}

  public async login(data: LoginData): Promise<any> {
    throw new InternalServerError("Login logic not implemented");
  }
}
