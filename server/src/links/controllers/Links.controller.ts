import Controller from "shared/decorators/Controller";
import { Get, Post } from "shared/decorators/RouteControllers";
import Request from "shared/classes/Request";
import Response from "shared/classes/Response";
import { Created, Ok } from "shared/classes/CustomResponses";
import VerifyAuth from "auth/middlewares/VerifyAuth";
import Inject from "shared/decorators/Inject";
import QueryBus from "shared/domain/QueryBus";
import GetUserLinksQuery from "links/queries/GetUserLinks.query";
import CommandBus from "shared/domain/CommandBus";
import CreateLinkCommand from "links/commands/CreateLink.command";
import BodyValidator from "shared/middlewares/BodyValidator";
import createLinkSchema from "links/schemas/createLink.schema";

@Controller("/links")
export default class LinksController {
  constructor(
    @Inject("Shared.QueryBus") private readonly queryBus: QueryBus,
    @Inject("Shared.CommandBus") private readonly commandBus: CommandBus,
  ) {}

  @Get("/", VerifyAuth.use())
  public async getLinks(req: Request): Promise<Response> {
    const links = await this.queryBus.ask(
      new GetUserLinksQuery(req.session.userId),
    );

    return new Ok(links);
  }

  @Post("/", BodyValidator.useSchema(createLinkSchema), VerifyAuth.use(false))
  public async createLink(req: Request): Promise<Response> {
    let userId = req.session?.userId;
    const { originalUrl, id } = req.body;

    const linkId = await this.commandBus.execute(
      new CreateLinkCommand({
        originalUrl,
        id,
        userId,
      }),
    );

    return new Created({ linkId });
  }
}
