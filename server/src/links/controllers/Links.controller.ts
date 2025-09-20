import Controller from "shared/decorators/Controller";
import { Get } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Ok } from "shared/classes/CustomResponses";
import VerifyAuth from "auth/middlewares/VerifyAuth";
import Inject from "shared/decorators/Inject";
import QueryBus from "shared/domain/QueryBus";
import GetUserLinksQuery from "links/queries/GetUserLinks.query";

@Controller("/links")
export default class LinksController {
  constructor(@Inject("Shared.QueryBus") private readonly queryBus: QueryBus) {}

  @Get("/", VerifyAuth.use())
  public async getLinks(req: Request): Promise<Response> {
    const links = await this.queryBus.ask(
      new GetUserLinksQuery(req.session.userId),
    );

    return new Ok(links);
  }
}
