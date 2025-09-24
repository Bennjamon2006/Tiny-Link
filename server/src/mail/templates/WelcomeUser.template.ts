import Template from "mail/domain/Template";

export default class WelcomeUserTemplate extends Template<{
  username: string;
}> {
  public render(): string {
    return `Welcome, ${this.data.username}`;
  }
}
