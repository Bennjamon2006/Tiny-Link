import Validator from "shared/classes/Validator";

export default class LoginDataValidator extends Validator {
  public validate(arg: any): true | string {
    const { username, password } = arg;

    if (username === null || username === undefined) {
      return "Username is required";
    }

    if (typeof username !== "string") {
      return "Username must be a string";
    }

    if (password === null || password === undefined) {
      return "Password is required";
    }

    if (typeof password !== "string") {
      return "Password must be a string";
    }

    return true;
  }
}
