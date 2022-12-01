import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";


export const assignDashboardQuestions_rules = {
  name: "assignDashboardQuestions",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.not(
          StudyEngine.participantState.lastSubmissionDateOlderThan(
            StudyEngine.timestampWithOffset({ days: 0 }), surveyKeys.Dashboard
          ),
        ),
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.Dashboard)
        )
      ),
      StudyEngine.do(
        StudyEngine.participantActions.assignedSurveys.add(surveyKeys.Dashboard, 'immediate'),
      ),
    ),
  ]
}

