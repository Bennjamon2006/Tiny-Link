import Link from "links/models/Link.entity";
import {
  PersistenceLink,
  ExposedLink,
  LinkToCreate,
} from "links/models/Link.dto";

export default class LinkMapper {
  public static fromCreate(data: LinkToCreate): Link {
    return new Link(data.originalUrl, data.userId);
  }

  public static fromPersistence(data: PersistenceLink): Link {
    return new Link(
      data.originalUrl,
      data.userId,
      data.lastVisit,
      data._id,
      data.createdAt,
      data.updatedAt,
    );
  }

  public static toPersistence(link: Link): PersistenceLink {
    link.presave();

    return {
      originalUrl: link.originalUrl,
      userId: link.userId,
      lastVisit: link.lastVisit,
      _id: link.id,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    };
  }

  public static toExposed(link: Link): ExposedLink {
    return {
      originalUrl: link.originalUrl,
      userId: link.userId,
      id: link.id,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    };
  }
}
