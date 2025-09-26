import Mail from "mail/domain/Mail";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";
import MailQueue from "mail/domain/MailQueue";

@Injectable()
export default class MailService {
  constructor(
    @Inject("Mail.MailQueue") private readonly mailQueue: MailQueue,
  ) {}

  public async sendMail<T>(mail: Mail<T>) {
    const TemplateClass = mail.getTemplateClass();
    const template = new TemplateClass(mail.data);
    const body = template.render();

    this.mailQueue.push({
      id: mail.id,
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      type: mail.type,
      body,
    });
  }
}
