import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


// Assing the flag Get_Catch_up to participants that have T9, but not T12
export const flagcatchupParticipants_rules = {
  name: "flagcatchupParticipants",
  rules: [
    StudyEngine.if(
      // condition:
      StudyEngine.and(
        // If The participant missed a qeustionaire:
        StudyEngine.participantState.hasParticipantFlagKey('expired'),
        // If they started the study:
        StudyEngine.participantState.lastSubmissionDateOlderThan(
          StudyEngine.timestampWithOffset({ days: 0 }),
          'T0'
        ),
        // If participant answerd yes on T12.DEM.extend_FU
        StudyEngine.not(
          StudyEngine.checkConditionForOldResponses(
            StudyEngine.singleChoice.any(
              'T12.DEM.extend_FU', 'ja'
            ),
            'any', 'T12'
          ),
        )
      ),
      // then:
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag('noCatchup', 'GetCatchup'),
      ),
      // else:
      StudyEngine.participantActions.updateFlag('noCatchup', 'NoCatchup'),
    )
  ]
}
