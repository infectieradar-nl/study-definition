import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

const flagKey = 'GetCatchup_c';

const timestampFromStudyStart = (daysDelta: number) => {
  return StudyEngine.timestampWithOffset(
    {
      days: daysDelta
    },
    StudyEngine.participantState.getStudyEntryTime(),
  );
}

const assignSurveyFromStudyStart = (
  surveyKey: string,
  category: "prio" | "normal" | "optional",
  startDays: number, durationDays: number
) => {
  return StudyEngine.participantActions.assignedSurveys.add(surveyKey, category, timestampFromStudyStart(startDays), timestampFromStudyStart(startDays + durationDays));
}


///Working version of function that selects only adult participants//
export const assignCatchupRetroactivelyc_rules = {
  name: "assignCatchup_WVc",
  rules: [
    StudyEngine.if(
      //condition
      StudyEngine.and(
        // and has not been assigned catchup before:
        StudyEngine.not(
          StudyEngine.participantState.hasParticipantFlagKeyAndValue('Gotcatchup',"Gotcatchup"),
          //StudyEngine.participantState.hasSurveyKeyAssigned('Tstopcontinue'),
        ),
        // should get catchup:
        StudyEngine.participantState.hasParticipantFlagKeyAndValue('noCatchup', 'GetCatchup'),
        // and Is an Child:
        StudyEngine.participantState.hasParticipantFlagKeyAndValue('surveyCategory', 'C')
        // For acceptance environment:
        //StudyEngine.not(
         // StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: -14 }))
        //)
      ),
      //then
      StudyEngine.do(
        // ASSIGN Catch-up from study start: //we want to let it stay open for quite some time
        StudyEngine.participantActions.assignedSurveys.add(
          'Tstopcontinuec',
          'prio',
        ),
        // Assign a message 
        //StudyEngine.participantActions.messages.add('Tstopcontinuec', StudyEngine.timestampWithOffset({ days: 0 })),
        // FLAG PARTICIPANT TO BE ABLE TO FIND THEM LATER IF NEEDED:
        StudyEngine.participantActions.updateFlag(
          'catchupassigned',
          StudyEngine.timestampWithOffset({ days: 0 })
        ),
        //Adds FLAG TO SIGNAL TO THE 
        StudyEngine.participantActions.updateFlag(
          'Gotcatchup', 'Gotcatchup'
        )
      )
    )
  ]
}

