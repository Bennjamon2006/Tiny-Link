import { PersistenceLink } from "links/models/Link.dto";
import DataSource from "shared/domain/DataSource";

export default interface LinkPersistenceLinksDataSource
  extends DataSource<PersistenceLink> {
  deleteByUserId(userId: string): Promise<void>;
}
