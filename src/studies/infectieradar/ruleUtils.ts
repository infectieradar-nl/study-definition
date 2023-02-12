import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { externalServiceNames, surveyKeys } from "./contants";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";
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
);

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

const hasRecentNegativeTestAndRecentSymptoms = () => StudyEngine.and(
  hasRecentNegativeTest(),
  hasRecentSymptoms(),
);

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
          hasRecentNegativeTestAndRecentSymptoms(),
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
  setSelfSwabbingDebugFlags(),
)

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
)

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
