import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";



export const flagcatchupParticipantsTEST_rules = {
  name: "flagcatchupParticipantsTEST",
  rules: [
    StudyEngine.if(
      // condition:
      StudyEngine.and(
        // If The participant missed a qeustionaire:
        StudyEngine.participantState.hasParticipantFlagKey('active'),
        // Assing the flag Get_Catch_up to participants that have T9, but not T12
        StudyEngine.or(
          StudyEngine.participantState.lastSubmissionDateOlderThan(
            StudyEngine.timestampWithOffset({ days: 0 }),
            'T9'
          ),
          StudyEngine.participantState.lastSubmissionDateOlderThan(
            StudyEngine.timestampWithOffset({ days: 0 }),
            'T9c'
          ),
        ),
        // If participant didn't answer yes on T12.DEM.extend_FU
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
