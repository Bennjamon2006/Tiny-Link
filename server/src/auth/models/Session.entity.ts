import Entity from "shared/domain/Entity";

export default class Session extends Entity {
  private readonly MAX_INACTIVE_TIME = 1000 * 60 * 60 * 24 * 30; // 1 month

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

  public isExpired(): boolean {
    const now = Date.now();

    return now - this.lastVisit.getTime() >= this.MAX_INACTIVE_TIME;
  }
}
