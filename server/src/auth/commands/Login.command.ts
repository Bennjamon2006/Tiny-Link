import LoginData from "auth/models/LoginData";
import Command from "shared/domain/Command";

export default class LoginCommand extends Command<LoginData, string> {}
