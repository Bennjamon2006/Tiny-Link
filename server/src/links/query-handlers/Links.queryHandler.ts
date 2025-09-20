import { ExposedLink } from "links/models/Link.dto";
import GetUserLinksQuery from "links/queries/GetUserLinks.query";
import LinksService from "links/services/Links.service";
import OnQuery from "shared/decorators/OnQuery";
import QueryHandler from "shared/decorators/QueryHandler";

@QueryHandler()
export default class LinksQueryHandler {
  constructor(public readonly linksService: LinksService) {}

  @OnQuery()
  public async handleGetUserLinks(
    query: GetUserLinksQuery,
  ): Promise<ExposedLink[]> {
    return this.linksService.getUserLinks(query.params);
  }
}
