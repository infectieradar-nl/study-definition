import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";


export const resetcatchupParticipants_rules = {
    name: "resetcatchupParticipants",
    rules: [
      StudyEngine.if(
        // condition:
          // If The participant missed a qeustionaire:
          StudyEngine.participantState.hasParticipantFlagKey('noCatchup'),
        // then:
        StudyEngine.do(
         StudyEngine.participantActions.removeFlag('noCatchup'),
         StudyEngine.participantActions.removeFlag('catchupassigned'),
         StudyEngine.participantActions.removeFlag('Gotcatchup'),
         StudyEngine.participantActions.assignedSurveys.remove('Tstopcontinue', 'all'),
         StudyEngine.participantActions.assignedSurveys.remove('Tstopcontinuec', 'all'),
         StudyEngine.participantActions.messages.remove('Tstopcontinuec'),
         StudyEngine.participantActions.messages.remove('Tstopcontinue'),
        ),
        // else:
      )
    ]
  }
  


