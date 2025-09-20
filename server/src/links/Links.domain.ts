import Domain from "shared/decorators/Domain";
import LinksController from "./controllers/Links.controller";
import LinksQueryHandler from "./query-handlers/Links.queryHandler";
import MongoLinksDataSource from "./infrastructure/MongoLinksDataSource";
import LinksRepository from "./repositories/Links.repository";
import LinksService from "./services/Links.service";

@Domain({
  name: "Links",
  controllers: [LinksController],
  dependencies: [MongoLinksDataSource, LinksRepository, LinksService],
  queryHandlers: [LinksQueryHandler],
})
export default class LinksDomain {}
