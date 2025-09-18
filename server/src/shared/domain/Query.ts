export default abstract class Query<Params, Result> {
  constructor(public readonly params: Params) {}

  // No real value, only for type anotations
  private __result: Result;
}
