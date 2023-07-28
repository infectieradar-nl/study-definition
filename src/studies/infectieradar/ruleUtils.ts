import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { externalServiceNames, surveyKeys } from "./contants";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabStudyfull } from "./surveys/swabStudyFull";
import { Weekly } from "./surveys/weekly";


export const handleSelfSwabbingIsInvited = () => StudyEngine.ifThen(
  // If not active yet:
  StudyEngine.not(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.active)
  ),
  // Then:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.SelfSwabInvite.key, Intake.SelfSwabInvite.optionKeys.yes),
    // Then:

    StudyEngine.if(
      StudyEngine.externalEventEval(externalServiceNames.samplerIsStudyFull),
      // is full
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.invited),
        StudyEngine.participantActions.assignedSurveys.add(SwabStudyfull.key, 'immediate')
      ),
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.invitedWithoutCode),
        StudyEngine.participantActions.assignedSurveys.add(SwabEntry.key, 'immediate')
      ),
    ),
    // Else:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.notInvited),
      StudyEngine.participantActions.assignedSurveys.remove(SwabEntry.key, 'all')
    )
  )
)

const wasNotSampledRecently = () => StudyEngine.or(
  StudyEngine.not(StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.selfSwabbingSampledTime.key)),
  StudyEngine.gt(
    StudyEngine.timestampWithOffset({ days: -10 }),
    StudyEngine.participantState.getParticipantFlagValueAsNum(ParticipantFlags.selfSwabbingSampledTime.key)
  ),
);

const hasRecentPositiveTest = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(Weekly.Q1b1NL.key, Weekly.Q1b1NL.optionKeys.positive),
    StudyEngine.lt(
      StudyEngine.timestampWithOffset({ hours: -71 }),
      StudyEngine.getResponseValueAsNum(Weekly.Q1d1NL.key, 'rg.scg.0')
    )),
  StudyEngine.and(
    StudyEngine.singleChoice.any(Weekly.Q1b3NL.key, Weekly.Q1b3NL.optionKeys.positive),
    StudyEngine.lt(
      StudyEngine.timestampWithOffset({ hours: -71 }),
      StudyEngine.getResponseValueAsNum(Weekly.Q1d3NL.key, 'rg.scg.0')
    )
  )
);

/*
not using this, for now symptoms are enough to be eligible for self - swabbing
const hasRecentNegativeTest = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(Weekly.Q1b1NL.key, Weekly.Q1b1NL.optionKeys.negative),
    StudyEngine.lt(
      StudyEngine.timestampWithOffset({ hours: -71 }),
      StudyEngine.getResponseValueAsNum(Weekly.Q1d1NL.key, 'rg.scg.0')
    )),
  StudyEngine.and(
    StudyEngine.singleChoice.any(Weekly.Q1b3NL.key, Weekly.Q1b3NL.optionKeys.negative),
    StudyEngine.lt(
      StudyEngine.timestampWithOffset({ hours: -71 }),
      StudyEngine.getResponseValueAsNum(Weekly.Q1d3NL.key, 'rg.scg.0')
    )
  )
);*/

const hasRecentSymptoms = () => StudyEngine.and(
  StudyEngine.multipleChoice.any(
    Weekly.Q1.QSymptoms.key,
    '3', '5', '6', '7'
  ),
  StudyEngine.lt(
    StudyEngine.timestampWithOffset({ hours: -120 }),
    StudyEngine.getResponseValueAsNum(Weekly.HS.Q3.key, 'rg.0')
  )
);

/*
not using this, for now symptoms are enough to be eligible for self-swabbing
const hasRecentNegativeTestAndRecentSymptoms = () => StudyEngine.and(
  hasRecentNegativeTest(),
  hasRecentSymptoms(),
);*/

const assignSwabSample = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.SwabNotSelected, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.SwabSample, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabSample, 'immediate', undefined, StudyEngine.timestampWithOffset({ hours: 12 })),
)

const assignSwabNotSelected = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.SwabSample, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.SwabNotSelected, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabNotSelected, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 1 }))
)

export const handleSelfSwabbingLogic = () => StudyEngine.ifThen(
  // If part of the cohort ->
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(
    ParticipantFlags.selfSwabbing.key,
    ParticipantFlags.selfSwabbing.values.active,
  ),
  // Then do following:
  StudyEngine.if(
    wasNotSampledRecently(),
    // If true:
    StudyEngine.if(
      hasRecentPositiveTest(),
      // THEN POSITIVE CASE:
      assignSwabSample(),
      // ELSE NEGATIVE CASE:
      StudyEngine.if(
        StudyEngine.and(
          hasRecentSymptoms(),
          // Use sampler:
          StudyEngine.externalEventEval(externalServiceNames.samplerIsSelected),
        ),
        // sampled:
        assignSwabSample(),
        // else:
        assignSwabNotSelected(),
      )
    ),
    // else:
    assignSwabNotSelected(),
  ),
  // Flag participant if had any symptoms in last 5 days:
  StudyEngine.if(
    hasRecentSymptoms(),
    // If true:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.key,
      ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.values.true
    ),
    // Else:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.key,
      ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.values.false
    )
  ),
  // Flag participant if they had no test result in the last weekly:
  StudyEngine.if(
    StudyEngine.multipleChoice.any(
      Weekly.Q1aNL.key,
      Weekly.Q1aNL.optionKeys.no,
    ),
    // If true:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.key,
      ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.values.true
    ),
    // Else:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.key,
      ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.values.false
    )
  )
  // setSelfSwabbingDebugFlags(),
)

/*
not using this, for now symptoms are enough to be eligible for self-swabbing
const setSelfSwabbingDebugFlags = () => StudyEngine.do(
  StudyEngine.if(
    wasNotSampledRecently(),
    StudyEngine.participantActions.updateFlag('swDebugNotSampledRecently', 'true'),
    StudyEngine.participantActions.updateFlag('swDebugNotSampledRecently', 'false'),
  ),
  StudyEngine.if(
    hasRecentNegativeTest(),
    StudyEngine.participantActions.updateFlag('swDebugRecentNegativeTest', 'true'),
    StudyEngine.participantActions.updateFlag('swDebugRecentNegativeTest', 'false'),
  ),
  StudyEngine.if(
    hasRecentSymptoms(),
    StudyEngine.participantActions.updateFlag('swDebugRecentSymptoms', 'true'),
    StudyEngine.participantActions.updateFlag('swDebugRecentSymptoms', 'false'),
  ),
)*/

const hasSurveyKeyValidUntilSoonerThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
  return StudyEngine.gt(
    StudyEngine.timestampWithOffset(delta, reference),
    StudyEngine.participantState.getSurveyKeyAssignedUntil(surveyKey),
  )
}

export const isSurveyExpired = (surveyKey: string) => StudyEngine.and(
  StudyEngine.participantState.hasSurveyKeyAssigned(surveyKey),
  hasSurveyKeyValidUntilSoonerThan(surveyKey, { seconds: 0 })
)

export const handleExpired_removeSurvey = (surveyKey: string) => StudyEngine.ifThen(
  isSurveyExpired(surveyKey),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(surveyKey, 'all'),
)


const initialAddSurvey = (weeks: number) => StudyEngine.participantActions.assignedSurveys.add(
  surveyKeys.interval,
  'immediate',
  StudyEngine.timestampWithOffset({ days: weeks * 7 }),
  StudyEngine.timestampWithOffset({ days: (weeks + 4) * 7 })
)

const intervalAssignmentTempFlag = "intervalAssignmentRng"

const isIntervalFlagEq = (value: number) => StudyEngine.eq(
  StudyEngine.participantState.getParticipantFlagValueAsNum(intervalAssignmentTempFlag),
  value
)

export const initialIntervalSurveyAssignment = (initialIntervalSurveyOffset: number) => StudyEngine.do(
  StudyEngine.participantActions.updateFlag(
    intervalAssignmentTempFlag,
    StudyEngine.generateRandomNumber(1, 12)
  ),
  StudyEngine.if(
    isIntervalFlagEq(1),
    initialAddSurvey(initialIntervalSurveyOffset),
    StudyEngine.if(
      isIntervalFlagEq(2),
      initialAddSurvey(initialIntervalSurveyOffset + 1),
      StudyEngine.if(
        isIntervalFlagEq(3),
        initialAddSurvey(initialIntervalSurveyOffset + 2),
        StudyEngine.if(
          isIntervalFlagEq(4),
          initialAddSurvey(initialIntervalSurveyOffset + 3),
          StudyEngine.if(
            isIntervalFlagEq(5),
            initialAddSurvey(initialIntervalSurveyOffset + 4),
            StudyEngine.if(
              isIntervalFlagEq(6),
              initialAddSurvey(initialIntervalSurveyOffset + 5),
              StudyEngine.if(
                isIntervalFlagEq(7),
                initialAddSurvey(initialIntervalSurveyOffset + 6),
                StudyEngine.if(
                  isIntervalFlagEq(8),
                  initialAddSurvey(initialIntervalSurveyOffset + 7),
                  StudyEngine.if(
                    isIntervalFlagEq(9),
                    initialAddSurvey(initialIntervalSurveyOffset + 8),
                    StudyEngine.if(
                      isIntervalFlagEq(10),
                      initialAddSurvey(initialIntervalSurveyOffset + 9),
                      StudyEngine.if(
                        isIntervalFlagEq(11),
                        initialAddSurvey(initialIntervalSurveyOffset + 10),
                        StudyEngine.if(
                          isIntervalFlagEq(12),
                          initialAddSurvey(initialIntervalSurveyOffset + 11),
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
  ),
  StudyEngine.participantActions.removeFlag(intervalAssignmentTempFlag),
)

export const reassignIntervalSurvey = (weeks: number) => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.add(
    surveyKeys.interval,
    'immediate',
    StudyEngine.timestampWithOffset(
      { days: weeks * 7 },
      StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.interval)
    ),
    StudyEngine.timestampWithOffset(
      { days: (weeks + 4) * 7 },
      StudyEngine.participantState.getSurveyKeyAssignedFrom(surveyKeys.interval)
    ),
  ),
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.interval, 'first')
)
