import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


export const flagFinishedParticipants_rules = {
    name: "flagFinishedParticipants",
    rules: [
        StudyEngine.if(
            // If:
            StudyEngine.and(
                StudyEngine.checkConditionForOldResponses(
                    StudyEngine.singleChoice.any('T12.TEST.Q11', 'nee', 'ja', 'notanymore'),
                    "any", "T12"
                ),
                StudyEngine.not(
                    StudyEngine.checkConditionForOldResponses(
                        StudyEngine.singleChoice.any('T12.DEM.extend_FU', 'ja'),
                        "any", "T12"
                    ),
                )
            ),
            // Then:
            StudyEngine.do(
                StudyEngine.participantActions.updateFlag('debug', 'shouldHaveFinished_A'),
            )
        ),
        StudyEngine.if(
            StudyEngine.and(
                StudyEngine.checkConditionForOldResponses(
                    StudyEngine.singleChoice.any('T12c.TEST.Q11', 'nee', 'ja', 'notanymore'),
                    "any", "T12c"
                ),
                StudyEngine.not(
                    StudyEngine.checkConditionForOldResponses(
                        StudyEngine.singleChoice.any('T12c.DEM.extend_FU', 'ja'),
                        "any", "T12c"
                    ),
                )
            ),
            // Then:
            StudyEngine.do(
                StudyEngine.participantActions.updateFlag('debug', 'shouldHaveFinished_C'),
            )
        )
    ]
}

export const cleanUpT0FromFinishedParticipants_rules = {
    name: "cleanUpT0FromFinishedParticipants",
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