import { ParseCondition } from "./ConditionArgs";
import ConditionSet from "./ConditionSet";

type MapConditions<O extends ConditionSet<any>, S> = {
  [K in keyof O]: ParseCondition<O[K], S>;
};

export default MapConditions;
