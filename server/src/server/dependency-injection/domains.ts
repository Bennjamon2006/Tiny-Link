import SharedDomain from "shared/Shared.domain";
import UsersDomain from "users/Users.domain";
import AuthDomain from "auth/Auth.domain";
import ServerDomain from "server/Server.domain";
import LinksDomain from "links/Links.domain";

const domains = [
  SharedDomain,
  UsersDomain,
  LinksDomain,
  AuthDomain,
  ServerDomain,
];

export default domains;
