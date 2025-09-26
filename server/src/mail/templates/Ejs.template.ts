import { render } from "ejs";
import { existsSync, readFileSync } from "fs";
import Template from "mail/domain/Template";
import { join } from "path";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";

export abstract class EjsTemplate<T> extends Template<T> {
  private readonly ejsFolder = join(__dirname, "ejs");

  private readonly filePath;

  private static readonly cache: Map<string, string> = new Map();

  constructor(data: T) {
    super(data);

    this.filePath = join(this.ejsFolder, `${this.getTemplateName()}.ejs`);
    this.checkExistsFile();
  }

  abstract getTemplateName(): string;

  private checkExistsFile(): void {
    if (!existsSync(this.filePath)) {
      throw new InternalServerError(
        `File for ejs template ${this.getTemplateName()} does not exists`,
      );
    }
  }

  public render(): string {
    if (!EjsTemplate.cache.has(this.filePath)) {
      EjsTemplate.cache.set(
        this.filePath,
        readFileSync(this.filePath, "utf-8"),
      );
    }

    const fileContent = EjsTemplate.cache.get(this.filePath);

    return render(fileContent, this.data);
  }
}
