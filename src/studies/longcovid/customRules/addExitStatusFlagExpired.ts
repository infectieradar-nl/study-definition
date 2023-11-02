import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


export const addExitStatusFlagExpired_rules = {
  name: "addExitStatusFlagExpired",
  rules: [
    StudyEngine.participantActions.updateFlag('exitStatus', 'expired'),
  ]
}
