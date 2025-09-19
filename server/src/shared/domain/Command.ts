export default abstract class Command<Params, Result = void> {
  constructor(public readonly params: Params) {}

  // No real value, only for type anotations
  private __result: Result;
}
