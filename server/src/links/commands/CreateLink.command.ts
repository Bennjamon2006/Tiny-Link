import { LinkToCreate } from "links/models/Link.dto";
import Command from "shared/domain/Command";

export default class CreateLinkCommand extends Command<LinkToCreate, string> {}
