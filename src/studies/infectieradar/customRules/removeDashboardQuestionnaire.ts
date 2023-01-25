import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


export const removeDashboardQuestionnaire_rules = {
  name: "removeDashboardQuestionnaire",
  rules: [
    StudyEngine.participantActions.assignedSurveys.remove('Dashboard', 'all')
  ]
}
