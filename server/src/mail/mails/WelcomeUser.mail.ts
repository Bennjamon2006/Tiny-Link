import Mail from "mail/domain/Mail";
import { NoSubjectMailData } from "mail/models/Mail.dto";
import WelcomeUserTemplate from "mail/templates/WelcomeUser.template";

export default class WelcomeUserMail extends Mail<{
  username: string;
}> {
  constructor(data: NoSubjectMailData<{ username: string }>) {
    super({
      ...data,
      subject: `Bienvenido, ${data.data.username}`,
    });
  }

  public getTemplateClass() {
    return WelcomeUserTemplate;
  }
}
