import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";



export const testForFlags_rules = {
  name: "testForFlags",
  rules: [
    StudyEngine.if(
      StudyEngine.or(
        StudyEngine.not(StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.selfSwabbingSampledTime.key)),
        StudyEngine.gt(
          StudyEngine.timestampWithOffset({ days: -10 }),
          StudyEngine.participantState.getParticipantFlagValueAsNum(ParticipantFlags.selfSwabbingSampledTime.key)
        ),
      ),
      StudyEngine.do()
    )
  ]
}
