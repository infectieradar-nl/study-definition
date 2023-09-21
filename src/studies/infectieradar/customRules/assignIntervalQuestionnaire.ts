import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { assignIntervalSurveyForQ1, assignIntervalSurveyForQ2, assignIntervalSurveyForQ3, assignIntervalSurveyForQ4, isCurrentISOWeekSmallerThan } from "../ruleUtils";

const quarterSwithOffset = 0;

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
      StudyEngine.if(
        isCurrentISOWeekSmallerThan(14, quarterSwithOffset),
        assignIntervalSurveyForQ2(),
        // else:
        StudyEngine.if(
          isCurrentISOWeekSmallerThan(27, quarterSwithOffset),
          assignIntervalSurveyForQ3(),
          // else:
          StudyEngine.if(
            isCurrentISOWeekSmallerThan(40, quarterSwithOffset),
            assignIntervalSurveyForQ4(),
            // else:
            assignIntervalSurveyForQ1(),
          )
        )
      )
    ),
  ]
}
