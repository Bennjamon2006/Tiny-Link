import Constructor from "./Constructor";
import Dependency from "./Dependency";

type DomainData = {
  name: string;
  dependencies?: Dependency<any>[];
  controllers?: Dependency<any>[];
  eventWatchers?: Constructor<any>[];
};

export default DomainData;
