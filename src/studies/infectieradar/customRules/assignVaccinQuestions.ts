import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";


export const assignVaccinQuestions_rules = {
  name: "assignVaccinQuestions",
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.not(
          StudyEngine.participantState.lastSubmissionDateOlderThan(
            StudyEngine.timestampWithOffset({ days: 0 }), surveyKeys.vaccinQuestions
          ),
        ),
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.vaccinQuestions)
        )
      ),
      StudyEngine.do(
        StudyEngine.participantActions.assignedSurveys.add(surveyKeys.vaccinQuestions, 'immediate'),
      ),
    ),
  ]
}

