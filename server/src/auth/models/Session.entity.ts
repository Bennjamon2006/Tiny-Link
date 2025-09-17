import Entity from "shared/domain/Entity";

export default class Session extends Entity {
  constructor(
    public readonly userId: string,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly lastVisit: Date,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
