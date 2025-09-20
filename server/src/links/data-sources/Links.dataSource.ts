import { PersistenceLink } from "links/models/Link.dto";
import DataSource from "shared/domain/DataSource";

export default interface LinksDataSource extends DataSource<PersistenceLink> {
  deleteByUserId(userId: string): Promise<void>;
}
