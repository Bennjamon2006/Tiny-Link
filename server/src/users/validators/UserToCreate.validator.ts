import Validator from "shared/classes/Validator";

export default class UserToCreateValidator extends Validator {
  public validate(arg: any): true | string {
    const { username, email, password } = arg;

    const usernameValidation = this.validateUsername(username);

    if (usernameValidation !== true) {
      return usernameValidation;
    }

    const emailValidation = this.validateEmail(email);

    if (emailValidation !== true) {
      return emailValidation;
    }

    const passwordValidation = this.validatePassword(password);

    if (passwordValidation !== true) {
      return passwordValidation;
    }

    return true;
  }

  private validateUsername(username: string): true | string {
    if (username === null || username === undefined) {
      return "Username is required";
    }

    if (typeof username !== "string") {
      return "Username must be a string";
    }

    if (username.length < 5) {
      return "Username must have at least 5 characters";
    }

    if (username.length > 20) {
      return "Username must have at most 20 characters";
    }

    if (/\s/.test(username)) {
      return "User must not have spaces";
    }

    return true;
  }

  private validatePassword(password: string): true | string {
    if (password === null || password === undefined) {
      return "Password is required";
    }

    if (typeof password !== "string") {
      return "Password must be a string";
    }

    if (password.length < 8) {
      return "Password must have at least 8 characters";
    }

    if (password.length > 100) {
      return "Password must have at most 100 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }

    if (/\s/.test(password)) {
      return "Password must not contain spaces";
    }

    return true;
  }

  private validateEmail(email: string): true | string {
    if (email === null || email === undefined) {
      return "Email is required";
    }

    if (typeof email !== "string") {
      return "Email must be a string";
    }

    // Validación simple de formato de email
    const emailRegex = ;
    if (!emailRegex.test(email)) {
      return "Email format is invalid";
    }

    return true;
  }
}
