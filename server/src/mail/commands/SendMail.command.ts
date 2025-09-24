import Mail from "mail/domain/Mail";
import Command from "shared/domain/Command";

export default class SendMailCommand extends Command<Mail<any>> {}
