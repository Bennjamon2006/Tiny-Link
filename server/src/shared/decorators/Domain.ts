import DomainData from "../types/DomainData";

export default function Domain(domainData: DomainData): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("domain", domainData, target);
  };
}
