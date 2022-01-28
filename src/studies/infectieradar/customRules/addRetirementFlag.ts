import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { SurveyEngine } from "case-editor-tools/surveys";
import { Intake } from "../surveys/intake";



export const updateRetirementFlag_rules = {
    name: "updateRetirementFlag",
    rules: [
        StudyEngine.if(
            StudyEngine.checkConditionForOldResponses(StudyEngine.singleChoice.any(Intake.QMainActivity.key, "7"), "any", Intake.key),
            StudyEngine.participantActions.updateFlag('retired', 'true')

        )
    ]
}