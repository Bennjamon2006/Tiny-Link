import LinksDataSource from "links/data-sources/Links.dataSource";
import LinkMapper from "links/mappers/Link.mapper";
import { PersistenceLink } from "links/models/Link.dto";
import Link from "links/models/Link.entity";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";

@Injectable()
export default class LinksRepository {
  constructor(
    @Inject("Links.DataSource")
    private readonly linksDataSource: LinksDataSource,
  ) {}

  public async getUsersLinks(userId: string): Promise<Link[]> {
    const links: PersistenceLink[] = await this.linksDataSource.getAll({
      userId,
    });

    return links.map(LinkMapper.fromPersistence);
  }

  public async createLink(link: Link): Promise<Link> {
    const persistenceLink = LinkMapper.toPersistence(link);

    await this.linksDataSource.create(persistenceLink);

    return link;
  }

  public async getLinkById(id: string): Promise<Link | null> {
    const persistenceLink = await this.linksDataSource.getById(id);

    if (!persistenceLink) {
      return null;
    }

    return LinkMapper.fromPersistence(persistenceLink);
  }
}
