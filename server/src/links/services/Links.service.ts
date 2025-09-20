import LinkMapper from "links/mappers/Link.mapper";
import { ExposedLink } from "links/models/Link.dto";
import LinksRepository from "links/repositories/Links.repository";
import Injectable from "shared/decorators/Injectable";

@Injectable()
export default class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  public async getUserLinks(userId: string): Promise<ExposedLink[]> {
    const links = await this.linksRepository.getUsersLinks(userId);

    return links.map(LinkMapper.toExposed);
  }
}
