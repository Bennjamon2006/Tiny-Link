import MailPort from "mail/domain/MailPort";
import { MailToSend } from "mail/models/Mail.dto";
import Injectable from "shared/decorators/Injectable";

@Injectable("MailPort")
export default class FakeMailPort implements MailPort {
  constructor() {}

  public async sendMail(mail: MailToSend): Promise<void> {
    console.log({ mail });
  }
}
