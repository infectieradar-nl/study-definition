import { StudyEngine } from "../../../case-editor/expression-utils/studyEngineExpressions";



export const updateVaccinationFlag_20211103_rules = {
    name: "updateVaccinationFlag_20211103",
    rules: [
        StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlag('21-vacc', 'full'),
            StudyEngine.participantActions.updateFlag('todo', 'todo')
        ),
        StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlag('21-vacc', 'never'),
            StudyEngine.participantActions.updateFlag('todo', 'todo')
        )
    ]
}