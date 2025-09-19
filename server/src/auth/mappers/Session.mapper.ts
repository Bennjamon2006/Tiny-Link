import Session from "auth/models/Session.entity";
import {
  PersistenceSession,
  SessionToCreate,
  ExposedSession,
} from "auth/models/Session.dto";

export default class SessionMapper {
  public static fromCreate(data: SessionToCreate): Session {
    return new Session(data.userId, data.ip, data.userAgent, new Date());
  }

  public static fromPersistence(data: PersistenceSession): Session {
    return new Session(
      data.userId,
      data.ip,
      data.userAgent,
      data.lastVisit,
      data._id,
      data.createdAt,
      data.updatedAt,
    );
  }

  public static toPersistence(session: Session): PersistenceSession {
    session.presave();

    return {
      userId: session.userId,
      ip: session.ip,
      userAgent: session.userAgent,
      lastVisit: session.lastVisit,
      _id: session.id,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }

  public static toExposed(session: Session): ExposedSession {
    return {
      userId: session.userId,
      ip: session.ip,
      userAgent: session.userAgent,
      lastVisit: session.lastVisit,
      id: session.id,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }
}
