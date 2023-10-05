import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Intake } from "../surveys/intake";
import { ParticipantFlags } from "../participantFlags";


export const updateSexFlag_rules = {
  name: "updateSexFlag",
  rules: [
    StudyEngine.ifThen(
      StudyEngine.and(
        StudyEngine.participantState.hasStudyStatus('active'),
        StudyEngine.not(
          StudyEngine.participantState.hasParticipantFlagKey(
            ParticipantFlags.gender.key
          )
        )
      ),
      StudyEngine.if(
        StudyEngine.checkConditionForOldResponses(StudyEngine.singleChoice.any(Intake.QGender.key, "1"), "any", Intake.key),
        StudyEngine.participantActions.updateFlag(
          ParticipantFlags.gender.key,
          ParticipantFlags.gender.values.female
        ),
        // else
        StudyEngine.if(
          StudyEngine.checkConditionForOldResponses(StudyEngine.singleChoice.any(Intake.QGender.key, "0"), "any", Intake.key),
          StudyEngine.participantActions.updateFlag(
            ParticipantFlags.gender.key,
            ParticipantFlags.gender.values.male
          ),
          // else
          StudyEngine.participantActions.updateFlag(
            ParticipantFlags.gender.key,
            ParticipantFlags.gender.values.other
          )
        )
      )
    )
  ]
}
