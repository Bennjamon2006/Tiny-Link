import Template from "mail/domain/Template";

type TemplateClass<T> = new (data: T) => Template<T>;

export default TemplateClass;
