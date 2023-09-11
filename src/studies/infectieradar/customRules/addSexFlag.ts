import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { SurveyEngine } from "case-editor-tools/surveys";
import { Intake } from "../surveys/intake";
import { SexFlag } from "../participantFlags";


export const updateSexFlag_rules = {
    name: "updateSexFlag",
    rules: [
        StudyEngine.if(
            StudyEngine.checkConditionForOldResponses(StudyEngine.singleChoice.any(Intake.QGender.key, "1"), "any", Intake.key),
            StudyEngine.participantActions.updateFlag(
                ParticipantFlags.SexFlag.key,
                ParticipantFlags.SexFlag.values.female
              ),
              // else
              StudyEngine.participantActions.updateFlag(
                ParticipantFlags.SexFlag.key,
                ParticipantFlags.SexFlag.values.nofemale
              )

        )
    ]
}