import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";



export const updateVaccinationFlag_20211103_rules = {
    name: "updateVaccinationFlag_20211103",
    rules: [
        StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue('21-vacc', 'full'),
            StudyEngine.participantActions.updateFlag('21-vacc-old', 'full'),
            StudyEngine.participantActions.removeFlag('21-vacc'),
        ),
        StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue('21-vacc', 'never'),
            StudyEngine.participantActions.updateFlag('21-vacc-old', 'never'),
            StudyEngine.participantActions.removeFlag('21-vacc'),
        )
    ]
}