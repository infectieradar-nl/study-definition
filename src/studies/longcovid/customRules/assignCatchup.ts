import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

const flagKey = 'GetCatchup';

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


//export const assignCatchupRetroactively_rules = {
  //name: "assignCatchup",
  //rules: [
    //StudyEngine.ifThen(
      // IF has flag catch-up
      //StudyEngine.participantState.hasParticipantFlagKey(flagKey),
      // ASSIGN Catch-up from study start: //we want to let it stay open for quite some time
      //assignSurveyFromStudyStart('Tstopcontinue', "prio", 360, 360),
      // FLAG PARTICIPANT TO BE ABLE TO FIND THEM LATER IF NEEDED:
      //StudyEngine.participantActions.updateFlag(
        //'catchupassigned',
        //StudyEngine.timestampWithOffset({ days: 0 })
      //)
    //)

  //]
//}



///Working version of function that selects only adult participants//
export const assignCatchupRetroactively_rules = {
  name: "assignCatchup_WV",
  rules: [
    StudyEngine.if(
      //condition
      StudyEngine.and(
        // should get catchup:
        StudyEngine.participantState.hasParticipantFlagKeyAndValue('noCatchup', 'GetCatchup'),
        // and Is an Adult:
        StudyEngine.participantState.hasParticipantFlagKeyAndValue('surveyCategory', 'A'),
        // and has not been assigned catchup before:
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned('Tstopcontinue'),
        ),
        // For acceptance environment:
        StudyEngine.not(
          StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: -14 }))
        )
      ),
      //then
      StudyEngine.do(
        // ASSIGN Catch-up from study start: //we want to let it stay open for quite some time
        StudyEngine.participantActions.assignedSurveys.add(
          'Tstopcontinue',
          'prio',
        ),
        // Assign a message 
        StudyEngine.participantActions.messages.add('Tstopcontinue', StudyEngine.timestampWithOffset({ days: 0 })),
        // FLAG PARTICIPANT TO BE ABLE TO FIND THEM LATER IF NEEDED:
        StudyEngine.participantActions.updateFlag(
          'catchupassigned',
          StudyEngine.timestampWithOffset({ days: 0 })
        ),
      )
    )
  ]
}

