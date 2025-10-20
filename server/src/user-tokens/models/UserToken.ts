import Entity from "shared/domain/Entity";
import UserTokenKind from "../constants/UserTokenKind";

export default class UserToken extends Entity {
  constructor(
    public readonly userId: string,
    public readonly kind: UserTokenKind,
    public readonly token: string,
    public expiresAt?: Date,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public presave(): void {
    this.expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  }
}
