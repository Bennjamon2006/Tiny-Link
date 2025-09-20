import { ExposedLink } from "links/models/Link.dto";
import Query from "shared/domain/Query";

export default class GetUserLinksQuery extends Query<string, ExposedLink[]> {}
