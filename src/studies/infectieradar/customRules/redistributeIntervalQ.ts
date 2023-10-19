

import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { assignIntervalSurvey } from "../ruleUtils";
import { ParticipantFlags } from "../participantFlags";

const flagIntervalRedistributed = 'intervalRedistributed';

export const redistributeIntervalQ_rules = {
  name: "redistributeIntervalQ",
  rules: [
    StudyEngine.if(
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(flagIntervalRedistributed, 'true'),
      ),
      StudyEngine.do(
        // Step one: remove group and interval questionnaire if in group 4, 5, 6, 7, 8, 9, 10, 11, 12
        StudyEngine.if(
          // if in group 4, 5, 6, 7, 8, 9, 10, 11, 12
          StudyEngine.gt(
            StudyEngine.participantState.getParticipantFlagValueAsNum(
              ParticipantFlags.intervalGroup.key
            ),
            3
          ),
          // remove group
          // remove interval questionnaire
          StudyEngine.do(
            StudyEngine.participantActions.removeFlag(ParticipantFlags.intervalGroup.key),
            StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'all'),
          )
        ),
        // Step two: if not in a group - add new group and assign interval questionnaire
        StudyEngine.if(
          // if not in a group
          StudyEngine.not(
            StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.intervalGroup.key)
          ),
          // assign group randomly between 4 and 13
          // assign interval questionnaire
          StudyEngine.do(
            StudyEngine.participantActions.updateFlag(
              ParticipantFlags.intervalGroup.key,
              StudyEngine.generateRandomNumber(4, 13)
            ),
            assignIntervalSurvey(
              StudyEngine.getTsForNextISOWeek(40, 1693559081)
            ),
            StudyEngine.participantActions.updateFlag(flagIntervalRedistributed, 'true')
          )
        )
      )
    )

  ]
}
