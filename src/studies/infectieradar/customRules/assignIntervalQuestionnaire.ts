import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { initialIntervalSurveyAssignment } from "../ruleUtils";


export const assignIntervalQuestionnaire_rules = {
  name: "assignIntervalQuestionnaire",
  rules: [
    StudyEngine.if(
      StudyEngine.not(
        StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.interval)
      ),
      initialIntervalSurveyAssignment(0),
    ),
  ]
}
