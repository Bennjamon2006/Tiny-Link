import Controller from "shared/decorators/Controller";
import { Get, Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Created, Ok } from "shared/classes/CustomResponses";
import BodyValidator from "shared/middlewares/BodyValidator";
import UsersService from "users/services/Users.service";
import { ExposedUser, UserToCreate } from "users/models/User.dto";
import UserToCreateValidator from "users/validators/UserToCreate.validator";

@Controller("/users")
export default class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/:id")
  public async getUserById(req: Request): Promise<Response> {
    const user: ExposedUser = await this.usersService.getById(req.params.id);

    return new Ok(user);
  }

  @Post("/", BodyValidator.use(UserToCreateValidator))
  public async createUser(req: Request): Promise<Response> {
    const data: UserToCreate = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const created: ExposedUser = await this.usersService.create(data);

    return new Created(created);
  }
}
