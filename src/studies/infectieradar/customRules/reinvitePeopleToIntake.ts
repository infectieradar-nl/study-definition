import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { messageTypes, surveyKeys } from "../contants";
import { Intake } from "../surveys/intake";



export const reinvitePeopleToIntake_rules = {
  name: "reinvitePeopleToIntake",
  rules: [
    StudyEngine.ifThen(
      StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ months: -4 }), surveyKeys.intake),
      // THEN:
      // remove weekly and intake
      StudyEngine.participantActions.assignedSurveys.remove(Intake.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.weekly, 'all'),
      // add intake on top, and weekly after:
      StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'prio'),
      StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio'),
      StudyEngine.participantActions.messages.add(messageTypes.reinviteToIntake, StudyEngine.timestampWithOffset({ days: 0 })),
    )
  ]
}
