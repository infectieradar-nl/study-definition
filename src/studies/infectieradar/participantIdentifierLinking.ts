import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { CustomEventKeys, studyCounters, studyVariables } from "./constants";
import { ParticipantFlags } from "./participantFlags";

export const handleParticipantIdentifierLinked = StudyEngine.ifThen(
  StudyEngine.checkEventKey(CustomEventKeys.participantIdentifierLinked),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.eventPayload.hasEventPayloadKeyWithValue('source', 'Pienter'),
      StudyEngine.eventPayload.hasEventPayloadKeyWithValue('source', 'pienter'),
      StudyEngine.eventPayload.hasEventPayloadKeyWithValue('source', 'PIENTER'),
    ),
    StudyEngine.ifThen(
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.pienterSample.key),
      ),
      StudyEngine.ifThen(
        StudyEngine.lt(
          StudyEngine.getCurrentStudyCounterValue(studyCounters.pienterSample),
          StudyEngine.getStudyVariable.int(studyVariables.pienterSampleMaxParticipants),
        ),
        StudyEngine.participantActions.getNextStudyCounterAsFlag(
          studyCounters.pienterSample,
          ParticipantFlags.pienterSample.key,
          '',
          0,
        ),
      ),
    ),
  ),
)
