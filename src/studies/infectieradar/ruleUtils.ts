import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { externalServiceNames } from "./contants";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";


export const handleSelfSwabbingIsInvited = () => StudyEngine.ifThen(
  // If not active yet:
  StudyEngine.not(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.active)
  ),
  // Then:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.SelfSwabInvite.key, Intake.SelfSwabInvite.optionKeys.yes),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.invited),
      StudyEngine.participantActions.assignedSurveys.add(SwabEntry.key, 'immediate')
    ),
    // Else:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.notInvited),
      StudyEngine.participantActions.assignedSurveys.remove(SwabEntry.key, 'all')
    )
  )
)

export const handleSelfSwabbingSampler = () => StudyEngine.ifThen(
  // If part of the cohort:
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(
    ParticipantFlags.selfSwabbing.key,
    ParticipantFlags.selfSwabbing.values.active,
  ),
  // TODO: check if sampling conditions are relevant
  StudyEngine.ifThen(
    StudyEngine.externalEventEval(externalServiceNames.samplerIsSelected),
    StudyEngine.participantActions.assignedSurveys.add(SwabSample.key, 'immediate'),
  )
)
