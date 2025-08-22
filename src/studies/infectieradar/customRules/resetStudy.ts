import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

export const removeAllSurveys_rules = {
  name: "removeAllSurveys",
  rules: [
    StudyEngine.participantActions.assignedSurveys.removeAll()
  ]
}

export const addIntakeSurvey_rules = {
  name: "addIntakeSurvey",
  rules: [
    StudyEngine.participantActions.assignedSurveys.add(
      "intake", 'normal',
    )
  ]
}
