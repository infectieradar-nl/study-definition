import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


// Assing the flag Get_Catch_up to participants that have T9, but not T12 
export const flagcatchupParticipants_rules = {
    name: "flagcatchupParticipants",
    rules: [
        // Condition 1, participant answerd yes on T12.DEM.extend_FU
        StudyEngine.if(
            
             // If The participant missed a qeustionaire:
             StudyEngine.and(
             StudyEngine(StudyEngine.participantState.hasParticipantFlagKey('expired')
             )),
 
 
             // can we also use studyexpression.checkSurveyResponsekey(surveykeys, T9)
             //StudyEngine.and(StudyEngine.participantState.hasParticipantFlagKey('T9')),
             StudyEngine.and(
             StudyEngine.participantActions.checkSurveyResponsekey('T0')),


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
            StudyEngine.do(StudyEngine.participantActions.updateFlag('GetCatchup'),
            )
    ]
}



  






















// is this needed for us????
export const cleanUpT0FromcatchupParticipants_rules = {
    name: "cleanUpT0FromcatchupParticipants",
    rules: [
        StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue('debug', 'shouldHaveFinished_A'),
            StudyEngine.do(
                StudyEngine.participantActions.updateFlag('surveyCategory', 'A'),
                StudyEngine.participantActions.updateFlag("exitStatus", "finished"),
                StudyEngine.participantActions.assignedSurveys.removeAll(),
                StudyEngine.participantActions.updateStudyStatus('active'),
            )
        )
    ]
}