import SetupError from "shared/exceptions/SetupError";
import UnresolvedError from "shared/exceptions/UnresolvedError";
import Dependency from "shared/types/Dependency";
import Token from "shared/types/Token";
import parseArgs from "server/utils/parseArgs";
import resolveToken from "server/utils/resolveToken";

export default class Container {
  private static _instance: Container;

  public static get instance(): Container {
    if (this._instance === undefined) {
      this._instance = new Container();
    }

    return this._instance;
  }

  private readonly dependencies: Map<Token<any>, any> = new Map();

  /**

   * @private use Container.instance
   */
  private constructor() {}

  private resolve<T>(token: Token<T> | Array<Token<T>>): T | T[] {
    if (Array.isArray(token)) {
      return token.map((t) => this.resolve(t)) as T[];
    }

    if (this.dependencies.has(token)) {
      return this.dependencies.get(token);
    }

    return token as T;
  }

  public async register(dependency: Dependency<any>): Promise<void> {
    const token = resolveToken(dependency);

    if (this.dependencies.has(token)) {
      throw new SetupError(
        `Dependency with token "${token.toString()}" already registered`,
      );
    }

    if (dependency instanceof Function) {
      const args = parseArgs(dependency);

      this.dependencies.set(token, new dependency(...this.resolve(args)));

      return;
    }

    if ("class" in dependency) {
      const args = dependency.args || parseArgs(dependency.class);

      this.dependencies.set(
        token,
        new dependency.class(...(this.resolve(args) as any[])),
      );

      return;
    }

    if ("factory" in dependency) {
      const args = this.resolve(dependency.args || []) as any[];

      this.dependencies.set(token, await dependency.factory(...args));

      return;
    }

    throw new UnresolvedError("Unknown dependency", { dependency });
  }

  public get<T>(token: Token<T>): T {
    if (this.dependencies.has(token)) {
      return this.dependencies.get(token);
    }

    throw new UnresolvedError(
      `Dependency with token "${token.toString()}" not found`,
      { token },
    );
  }
}
