import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { messageTypes, surveyKeys } from "../contants";
import { Intake } from "../surveys/intake";



export const reinvitePeopleToIntake_rules = {
  name: "reinvitePeopleToIntake",
  rules: [
    StudyEngine.ifThen(
      StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ months: -1 }), surveyKeys.intake),
      // THEN:
      // add intake on top, and weekly after:
      StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'prio'),
      StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio'),
    )
  ]
}

export const moveIntakeToNextSeptember_rules = {
  name: "moveIntakeToNextSeptember",
  rules: [
    StudyEngine.ifThen(
      StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ months: -1 }), surveyKeys.intake),
      // THEN:
      StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.intake, 'all'),
      StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'normal',
        StudyEngine.getTsForNextStartOfMonth('September')
      ),
      StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'optional')
    )
  ]
}
