import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";


export const removeIntervaleQuestionnaire_rules = {
  name: "removeIntervaleQuestionnaire",
  rules: [
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'all')
  ]
}
