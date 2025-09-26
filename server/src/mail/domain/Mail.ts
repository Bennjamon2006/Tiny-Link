import { v4 as uuid } from "uuid";
import { MailData } from "mail/models/Mail.dto";
import TemplateClass from "mail/models/TemplateClass";

export default abstract class Mail<T> {
  public readonly from: string;

  public readonly to: string;

  public readonly subject: string;

  public readonly data: T;

  public readonly id: string;

  constructor(data: MailData<T>) {
    this.from = data.from;
    this.to = data.to;
    this.subject = data.subject;
    this.data = data.data;
    this.id = uuid();
  }

  public abstract getTemplateClass(): TemplateClass<T>;
}
