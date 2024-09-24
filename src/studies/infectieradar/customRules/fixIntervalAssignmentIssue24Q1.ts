import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";
import { addIntervalSurveyWithOffset, deleteLastIntervalStartFlag, ensureIntervalSurveyGroup, getLastIntervalStartFromFlags, isIntervalFlagEq, saveLastIntervalStartAsFlag } from "../ruleUtils";
import { Expression } from "survey-engine/data_types";


const assignIntervalSurvey_modified_expiration = (reference: Expression) => StudyEngine.do(
  ensureIntervalSurveyGroup(),
  StudyEngine.if(
    isIntervalFlagEq(1),
    addIntervalSurveyWithOffset(reference, 0, 11),
    StudyEngine.if(
      isIntervalFlagEq(2),
      addIntervalSurveyWithOffset(reference, 1, 10),
      StudyEngine.if(
        isIntervalFlagEq(3),
        addIntervalSurveyWithOffset(reference, 2, 9),
        StudyEngine.if(
          isIntervalFlagEq(4),
          addIntervalSurveyWithOffset(reference, 3, 8),
          StudyEngine.if(
            isIntervalFlagEq(5),
            addIntervalSurveyWithOffset(reference, 4, 7),
            StudyEngine.if(
              isIntervalFlagEq(6),
              addIntervalSurveyWithOffset(reference, 5, 6),
              StudyEngine.if(
                isIntervalFlagEq(7),
                addIntervalSurveyWithOffset(reference, 6, 5),
                StudyEngine.if(
                  isIntervalFlagEq(8),
                  addIntervalSurveyWithOffset(reference, 7),
                  StudyEngine.if(
                    isIntervalFlagEq(9),
                    addIntervalSurveyWithOffset(reference, 8),
                    StudyEngine.if(
                      isIntervalFlagEq(10),
                      addIntervalSurveyWithOffset(reference, 9),
                      StudyEngine.if(
                        isIntervalFlagEq(11),
                        addIntervalSurveyWithOffset(reference, 10),
                        StudyEngine.if(
                          isIntervalFlagEq(12),
                          addIntervalSurveyWithOffset(reference, 11),
                          addIntervalSurveyWithOffset(reference, 12),
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
)

const reassignIntervalFromWeek_modified_expiration = (week: number) => StudyEngine.do(
  saveLastIntervalStartAsFlag(),

  // remove old instances of interval survey:
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'all'),

  assignIntervalSurvey_modified_expiration(
    StudyEngine.getTsForNextISOWeek(week, getLastIntervalStartFromFlags()),

  ),

  deleteLastIntervalStartFlag()
)

const assignIntervalForQ1_modified_expiration = () => StudyEngine.do(
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.intervalHidePregnancyQ.key,
    ParticipantFlags.intervalHidePregnancyQ.values.false
  ),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.intervalHideVaccinationQ.key,
    ParticipantFlags.intervalHideVaccinationQ.values.false
  ),

  reassignIntervalFromWeek_modified_expiration(1)
)

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
        assignIntervalForQ1_modified_expiration(),
        // add a flag to indicate that the assignment was fixed: (for debugging purposes only, not used in any rules)
        StudyEngine.participantActions.updateFlag('intervalAssignmentFixed', '24Q1')

      )
    )
  ]
}
