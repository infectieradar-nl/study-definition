import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


export const inviteToExternalStudy_rules = {
  name: "inviteToExternalStudy",
  rules: [
    StudyEngine.participantActions.updateFlag('externalStudyCode', '123456'),
    StudyEngine.participantActions.messages.add('invite-to-external-study', StudyEngine.timestampWithOffset({ days: 0 }))
  ]
}
