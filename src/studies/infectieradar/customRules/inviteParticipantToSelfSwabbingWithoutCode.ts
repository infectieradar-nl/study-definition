import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";


export const inviteToSelfSwabbingWithoutCode_rules = {
  name: "inviteToSelfSwabbingWithoutCode",
  rules: [
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabEntry, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 14 })),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.invitedWithoutCode),
  ]
}