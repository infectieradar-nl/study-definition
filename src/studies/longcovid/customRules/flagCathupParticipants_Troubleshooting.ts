import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";



export const flagcatchupParticipants_Troubleshooting_rules = {
    name: "flagcatchupParticipants_Troubleshooting",
    rules: [
      StudyEngine.if(
        // condition:
        StudyEngine.and(
          //Does not have the Getcathup alrdy assigned
          StudyEngine.not(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue('noCatchup', 'GetCatchup')
          ),
          //Does not have the Getcathup alrdy assigned
          StudyEngine.not(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue('noCatchup', 'NoCatchup')
          ),
          // If The participant missed a qeustionaire:
          StudyEngine.participantState.hasParticipantFlagKeyAndValue('exitStatus', 'expired'),
          // Assing the flag Get_Catch_up to participants that have T0, but not T12
          //StudyEngine.and(
            //StudyEngine.participantState.lastSubmissionDateOlderThan(
             // StudyEngine.timestampWithOffset({ days: 0 }),
              //'T0'
            //),
            //StudyEngine.participantState.lastSubmissionDateOlderThan(
              //StudyEngine.timestampWithOffset({ days: 0 }),
              //'T9c'
            //),
         // ),
          // If participant didn't answer yes on T12.DEM.extend_FU //just a fail save, we dont want to send people a qeustinaire if they 
          //said that they did not want to do the Qeustionnaire
          StudyEngine.not(
            StudyEngine.checkConditionForOldResponses(
              StudyEngine.singleChoice.any(
                'T12.DEM.extend_FU', 'nee'
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
  
  