import LinkMapper from "links/mappers/Link.mapper";
import { ExposedLink, LinkToCreate } from "links/models/Link.dto";
import LinksRepository from "links/repositories/Links.repository";
import Injectable from "shared/decorators/Injectable";
import { ConflictError } from "shared/exceptions/CustomRequestErrors";

@Injectable()
export default class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  public async getUserLinks(userId: string): Promise<ExposedLink[]> {
    const links = await this.linksRepository.getUsersLinks(userId);

    return links.map(LinkMapper.toExposed);
  }

  public async createLink(data: LinkToCreate): Promise<ExposedLink> {
    if (data.id) {
      const existentLink = await this.linksRepository.getLinkById(data.id);

      if (existentLink) {
        throw new ConflictError(`Link with id "${data.id}" already exists.`);
      }
    }

    const link = LinkMapper.fromCreate(data);

    const created = await this.linksRepository.createLink(link);

    return LinkMapper.toExposed(created);
  }
}
