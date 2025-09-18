import Command from "shared/domain/Command";
import Constructor from "./Constructor";

type CommandType = Constructor<Command<any>>;

export default CommandType;
