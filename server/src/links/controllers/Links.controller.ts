import Controller from "shared/decorators/Controller";
import { Get } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Ok } from "shared/classes/CustomResponses";

@Controller("/links")
export default class LinksController {
  constructor() {}

  @Get("/")
  public async getLinks(req: Request): Promise<Response> {
    return new Ok("Hello, Links!");
  }
}
