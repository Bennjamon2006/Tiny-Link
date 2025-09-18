export default abstract class Command<Params> {
  constructor(public readonly params: Params) {}
}
