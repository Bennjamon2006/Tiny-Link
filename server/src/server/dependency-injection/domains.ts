import SharedDomain from "shared/Shared.domain";
import UsersDomain from "users/Users.domain";
import AuthDomain from "auth/Auth.domain";
import ServerDomain from "server/Server.domain";
import LinksDomain from "links/Links.domain";
import MailDomain from "mail/Mail.domain";
import UserTokensDomain from "user-tokens/UserTokens.domain";

const domains = [
  SharedDomain,
  UsersDomain,
  LinksDomain,
  AuthDomain,
  MailDomain,
  UserTokensDomain,
  ServerDomain,
];

export default domains;
