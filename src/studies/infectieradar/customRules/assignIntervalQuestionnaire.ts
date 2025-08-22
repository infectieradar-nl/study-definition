import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../constants";
import { assignIntervalSurvey, assignIntervalSurveyForQ4 } from "../ruleUtils";
import { ParticipantFlags } from "../participantFlags";


export const assignIntervalQuestionnaire_rules = {
  name: "assignIntervalQuestionnaire",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.participantState.hasStudyStatus('active'),
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.interval)
        ),
      ),
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag(
          ParticipantFlags.intervalHidePregnancyQ.key,
          ParticipantFlags.intervalHidePregnancyQ.values.true
        ),
        StudyEngine.participantActions.updateFlag(
          ParticipantFlags.intervalHideVaccinationQ.key,
          ParticipantFlags.intervalHideVaccinationQ.values.false
        ),

        // remove old instances of interval survey:
        StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'all'),

        assignIntervalSurvey(
          StudyEngine.getTsForNextISOWeek(40, 1693559081)
        ),
      )
    ),
  ]
}
