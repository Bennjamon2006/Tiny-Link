import { EjsTemplate } from "./EJS.template";

export default class WelcomeUserTemplate extends EjsTemplate<{
  username: string;
}> {
  public getTemplateName(): string {
    return "WelcomeUser";
  }
}
