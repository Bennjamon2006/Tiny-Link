import Command from "shared/domain/Command";

type CommandResult<C extends Command<any, any>> =
  C extends Command<any, infer R> ? R : never;

export default CommandResult;
