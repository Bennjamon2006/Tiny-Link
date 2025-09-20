import Domain from "shared/decorators/Domain";
import LinksController from "./controller/Links.controller";

@Domain({
  name: "Links",
  controllers: [LinksController],
})
export default class LinksDomain {}
