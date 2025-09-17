import Controller from "shared/decorators/Controller";
import { Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Ok } from "shared/classes/CustomResponses";
import LoginData from "auth/models/LoginData";
import AuthService from "auth/services/Auth.service";

@Controller("/auth")
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  public async login(req: Request): Promise<Response> {
    const loginData: LoginData = {
      username: req.body.username,
      password: req.body.password,
    };

    const result = await this.authService.login(loginData);

    return new Ok(result);
  }
}
