export default abstract class Template<T> {
  constructor(protected readonly data: T) {}

  public abstract render(): string;
}
