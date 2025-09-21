import { v4 as uuid } from "uuid";

export default abstract class Entity {
  constructor(
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
    this.overridePresave();
  }

  private overridePresave() {
    const thisPresave = this.presave;
    const basePresave = Entity.prototype.presave;

    if (thisPresave !== basePresave) {
      this.presave = function () {
        thisPresave.call(this);
        basePresave.call(this);
      };
    }
  }

  public presave(): void {
    this.updatedAt = new Date();
    this.createdAt ||= this.updatedAt;

    if (!this.id) {
      this.id = uuid();
    }
  }
}
