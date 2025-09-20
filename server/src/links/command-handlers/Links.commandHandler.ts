import CreateLinkCommand from "links/commands/CreateLink.command";
import LinksService from "links/services/Links.service";
import CommandHandler from "shared/decorators/CommandHandler";
import OnCommand from "shared/decorators/OnCommand";

@CommandHandler()
export default class LinksCommandHandler {
  constructor(public readonly linksService: LinksService) {}

  @OnCommand()
  public async handleCreateLink(command: CreateLinkCommand): Promise<string> {
    const link = await this.linksService.createLink(command.params);

    return link.id;
  }
}
