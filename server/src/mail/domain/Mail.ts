import { MailData } from "mail/models/Mail.dto";
import TemplateClass from "mail/models/TemplateClass";

export default abstract class Mail<T> {
  public readonly to: string;

  public readonly subject: string;

  public readonly data: T;

  constructor(data: MailData<T>) {
    this.to = data.to;
    this.subject = data.subject;
    this.data = data.data;
  }

  public abstract getTemplateClass(): TemplateClass<T>;
}
