import { MailToSend } from "mail/models/Mail.dto";

export default interface MailPort {
  sendMail(mail: MailToSend): Promise<void>;
}
