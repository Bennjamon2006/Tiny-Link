import Constructor from "shared/types/Constructor";

type ValidatorClass = Constructor<Validator> & { instance?: Validator };

export default abstract class Validator {
  public abstract validate(arg: any): true | string;

  private static instance?: Validator;

  public static validate(this: ValidatorClass, arg: any): true | string {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance.validate(arg);
  }

  constructor() {
    const constructor = this.constructor as ValidatorClass;

    if (!constructor.instance) {
      constructor.instance = this;
    }
  }
}
