import SetupError from "shared/exceptions/SetupError";
import Constructor from "shared/types/Constructor";
import PlainConfig from "shared/types/PlainConfig";
import Schema from "shared/types/Schema";

export default abstract class ConfigService<T> {
  public static async initialize<T>(
    this: Constructor<ConfigService<T>>,
  ): Promise<ConfigService<T>> {
    const instance = new this();
    await instance.init();

    return instance;
  }

  private config: T;

  constructor(private readonly schema?: Schema<T, {}>) {}

  protected abstract getConfig(): PlainConfig<T> | Promise<PlainConfig<T>>;

  private async init(): Promise<void> {
    this.config = (await this.getConfig()) as T;

    if (this.schema) {
      const validation = this.schema.validate(this.config);

      if (validation.ok === false) {
        throw new SetupError(validation.error);
      }

      this.config = validation.value;
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.config[key];
  }
}
