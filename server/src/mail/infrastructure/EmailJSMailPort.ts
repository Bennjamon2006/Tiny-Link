import Injectable from "shared/decorators/Injectable";
import { SMTPClient } from "emailjs";
import MailPort from "mail/domain/MailPort";
import EmailJSConfigService from "./EmailJSConfigService";
import { MailToSend } from "mail/models/Mail.dto";
import { InternalServerError } from "shared/exceptions/CustomRequestErrors";

@Injectable("MailPort")
export default class EmailJSMailPort implements MailPort {
  private readonly client: SMTPClient;

  constructor(private readonly emailjsConfigService: EmailJSConfigService) {
    this.client = this.createClient();
  }

  private createClient(): SMTPClient {
    return new SMTPClient({
      user: this.emailjsConfigService.get("user"),
      password: this.emailjsConfigService.get("password"),
      host: this.emailjsConfigService.get("host"),
      ssl: this.emailjsConfigService.get("ssl"),
      timeout: 5000,
    });
  }

  public async sendMail(mail: MailToSend): Promise<void> {
    try {
      console.log("Sending mail...");

      await this.client.sendAsync({
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.body,
        attachment: [
          {
            data: mail.body,
            alternative: true,
          },
        ],
      });
    } catch (err) {
      throw new InternalServerError(`Error sending mail: ${err.message}`);
    }
  }
}
