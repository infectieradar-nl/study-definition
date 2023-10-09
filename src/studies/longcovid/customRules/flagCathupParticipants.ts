import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


// Assing the flag Get_Catch_up to participants that have T9, but not T12 
export const flagcatchupParticipants_rules = {
    name: "flagcatchupParticipants",
    rules: [
        // Condition 1, participant answerd yes on T12.DEM.extend_FU
        StudyEngine.if(
            
             // If The participant missed a qeustionaire:
             StudyEngine.and(
             StudyEngine.participantState.hasParticipantFlagKey('expired')
             ),
 
 
             // can we also use studyexpression.checkSurveyResponsekey(surveykeys, T9)
             //StudyEngine.and(StudyEngine.participantState.hasParticipantFlagKey('T9')),
             StudyEngine.and(
             StudyEngine.checkSurveyResponseKey('T0')),


            StudyEngine.not(
                StudyEngine.checkConditionForOldResponses(
                StudyEngine.singleChoice.any(
                  'T12.DEM.extend_FU', 'ja'
                ),
                'any', 'T12'
              ),
            )


    

        ),
            // Then:
            StudyEngine.do(StudyEngine.participantActions.updateFlag('noCatchup','GetCatchup'),
            )
    ]
}