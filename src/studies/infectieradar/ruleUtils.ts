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


export const handleSelfSwabbingLogic = () => StudyEngine.ifThen(
  // If part of the cohort:
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(
    ParticipantFlags.selfSwabbing.key,
    ParticipantFlags.selfSwabbing.values.active,
  ),
  StudyEngine.if(
    StudyEngine.gt(
      StudyEngine.timestampWithOffset({ days: -10 }),
      StudyEngine.participantState.getParticipantFlagValue(ParticipantFlags.selfSwabbingSampledTime.key)
    ),
    // If true:
    StudyEngine.do(
      // POSITIVE case
      StudyEngine.ifThen(
        // TODO:
        StudyEngine.and(
          StudyEngine.or(
            StudyEngine.singleChoice.any(Weekly.Q1b1NL.key, Weekly.Q1b1NL.optionKeys.positive),
            StudyEngine.singleChoice.any(Weekly.Q1b3NL.key, Weekly.Q1b3NL.optionKeys.positive),
          ),
          StudyEngine.lt(
            StudyEngine.timestampWithOffset({ hours: -71 }),
            StudyEngine.getResponseValueAsNum(Weekly.Q1d1NL.key, 'rg.scg.0')
          )
        ),
        // if positive then:
        StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabSample, 'immediate', undefined, StudyEngine.timestampWithOffset({ hours: 12 })),
      ),
      // NEGATIVE case
      StudyEngine.ifThen(
        StudyEngine.and(
          StudyEngine.or(
            StudyEngine.singleChoice.any(Weekly.Q1b1NL.key, Weekly.Q1b1NL.optionKeys.negative),
            StudyEngine.singleChoice.any(Weekly.Q1b3NL.key, Weekly.Q1b3NL.optionKeys.negative),
          ),
          StudyEngine.lt(
            StudyEngine.timestampWithOffset({ hours: -71 }),
            StudyEngine.getResponseValueAsNum(Weekly.Q1d1NL.key, 'rg.scg.0')
          ),
          StudyEngine.multipleChoice.any(
            Weekly.Q1.QSymptoms.key,
            '3', '5', '6', '7'
          ),
          StudyEngine.lt(
            StudyEngine.timestampWithOffset({ hours: -120 }),
            StudyEngine.getResponseValueAsNum(Weekly.HS.Q3.key, 'rg.0')
          ),
        ),
        // if negative then:
        StudyEngine.if(
          StudyEngine.externalEventEval(externalServiceNames.samplerIsSelected),
          // sampled:
          StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabSample, 'immediate', undefined, StudyEngine.timestampWithOffset({ hours: 12 })),
          // else:
          StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabNotSelected, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 1 }))
        )
      ),
    ),
    // else:
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.SwabNotSelected, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 1 }))
  )
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
