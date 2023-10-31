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
        ),
        // else:
      )
    ]
  }
  


