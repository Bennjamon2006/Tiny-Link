import MailPort from "mail/domain/MailPort";
import Mail from "mail/domain/Mail";
import Inject from "shared/decorators/Inject";
import Injectable from "shared/decorators/Injectable";

@Injectable()
export default class MailService {
  constructor(@Inject("Mail.MailPort") private readonly mailPort: MailPort) {}

  public async sendMail<T>(mail: Mail<T>) {
    const TemplateClass = mail.getTemplateClass();
    const template = new TemplateClass(mail.data);
    const body = template.render();

    await this.mailPort.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      body,
    });
  }
}
