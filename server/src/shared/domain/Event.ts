export default class Event<T> {
  public readonly emitedAt: Date;

  constructor(
    public readonly payload: T,
    emitedAt?: Date,
  ) {
    this.emitedAt = emitedAt || new Date();
  }
}
