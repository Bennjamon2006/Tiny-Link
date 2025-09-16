import Dependency from "./Dependency";

type DomainData = {
  name: string;
  dependencies?: Dependency<any>[];
  controllers?: Dependency<any>[];
};

export default DomainData;
