import ConditionSet from "./ConditionSet";
import ParseCondition from "./ParseCondition";

type MapConditions<O extends ConditionSet<any>, S> = {
  [K in keyof O]: ParseCondition<O[K], S>;
};

export default MapConditions;
