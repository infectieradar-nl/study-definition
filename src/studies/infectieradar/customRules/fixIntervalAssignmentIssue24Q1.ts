import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { assignIntervalSurveyForQ1 } from "../ruleUtils";
import { surveyKeys } from "../contants";

export const fixIntervalAssingmentIssue24Q1_rules = {
  name: "fixIntervalAssingmentIssue24Q1",
  rules: [
    StudyEngine.if(
      // if assignement is later than 1st of August already (participants who were caught by the issue)
      StudyEngine.gt(
        StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.interval),
        1722470400
      ),
      // then fix the assignment
      StudyEngine.do(
        // remove interval survey that is too late
        StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'all'),
        // assign interval to last december to be a reference - this will be replaced in next step
        StudyEngine.participantActions.assignedSurveys.add(
          surveyKeys.interval,
          'prio',
          1701388800, // 1st of December 2023
          1711929600, // 1st of April 2024 (to avoid expiration rule activiting accidentally now)
        ),
        // run assignment for Q1 again which should respect the assignment group of the participant
        assignIntervalSurveyForQ1(),
        // add a flag to indicate that the assignment was fixed: (for debugging purposes only, not used in any rules)
        StudyEngine.participantActions.updateFlag('intervalAssignmentFixed', '24Q1')

      )
    )
  ]
}

