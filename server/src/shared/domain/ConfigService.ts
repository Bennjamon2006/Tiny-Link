import Constructor from "shared/types/Constructor";

export default abstract class ConfigService<T> {
  public static async initialize<T>(
    this: Constructor<ConfigService<T>>,
  ): Promise<ConfigService<T>> {
    const instance = new this();
    await instance.init();

    return instance;
  }

  private config: T;

  constructor() {}

  protected abstract getConfig(): T | Promise<T>;

  private async init(): Promise<void> {
    this.config = await this.getConfig();
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }
}
