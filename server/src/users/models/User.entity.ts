import { hashSync, compareSync } from "bcrypt";
import Entity from "shared/domain/Entity";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";

export default class User extends Entity {
  private readonly HASH_SALTS: number = 10;

  public passwordHash?: string;

  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
    public readonly emailVerified: boolean = false,
    private passwordHashed: boolean = false,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  private hashPassword(): void {
    if (!this.passwordHashed) {
      this.passwordHash = hashSync(this.password, this.HASH_SALTS);
      this.passwordHashed = true;
    } else {
      this.passwordHash = this.password;
    }
  }

  public comparePassword(password: string): boolean {
    if (!this.passwordHashed) {
      throw new InternalServerError(`User #${this.id} password not hashed`);
    }

    return compareSync(password, this.passwordHash);
  }

  public presave(): void {
    this.hashPassword();
  }
}
