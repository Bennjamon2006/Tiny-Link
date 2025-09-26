import { MailToSend } from "mail/models/Mail.dto";

export default interface MailQueue {
  push(mail: MailToSend): any;
}
