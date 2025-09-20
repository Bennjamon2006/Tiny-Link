import { URL } from "url";
import Validator from "shared/classes/Validator";

export default class LinkToCreateValidator extends Validator {
  public validate(arg: any): true | string {
    const { originalUrl, id } = arg;

    const urlValidation = this.validateOriginalUrl(originalUrl);

    if (urlValidation !== true) {
      return urlValidation;
    }

    const idValidation = this.validateId(id);

    if (idValidation !== true) {
      return idValidation;
    }

    return true;
  }

  private validateOriginalUrl(url: any): true | string {
    if (url === undefined || url === null) {
      return "originalUrl is required";
    }

    if (typeof url !== "string") {
      return "originalUrl must be a string";
    }

    try {
      const urlObject = new URL(url);

      if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
        return "Invalid originalUrl protocol";
      }
    } catch (err) {
      return "Invalid originalUrl";
    }

    return true;
  }

  public validateId(id: any): true | string {
    if (id === undefined || id === null) {
      return true;
    }

    if (typeof id !== "string") {
      return "id must be a string";
    }

    const pattern = /^[A-Za-z0-9-_]+$/;

    if (!pattern.test(id)) {
      return "Invalid id";
    }

    return true;
  }
}
