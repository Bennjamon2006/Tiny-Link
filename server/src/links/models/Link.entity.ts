import { nanoid } from "nanoid";
import Entity from "shared/domain/Entity";

export default class Link extends Entity {
  constructor(
    public readonly originalUrl: string,
    public readonly userId?: string,
    public readonly lastVisit?: Date,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  public presave(): void {
    if (!this.id) {
      this.id = nanoid(6);
    }
  }
}
