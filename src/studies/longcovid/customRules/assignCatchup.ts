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


export const assignCatchupRetroactively_rules = {
  name: "assignCatchupRetroactively",
  rules: [
    StudyEngine.ifThen(
      // IF has flag catch-up
      StudyEngine.participantState.hasParticipantFlagKey(flagKey),
      // ASSIGN Catch-up from study start: //we want to let it stay open for quite some time
      assignSurveyFromStudyStart('Tstopcontinue', "prio", 360, 360),
      // FLAG PARTICIPANT TO BE ABLE TO FIND THEM LATER IF NEEDED:
      StudyEngine.participantActions.updateFlag(
        'catchupassigned',
        StudyEngine.timestampWithOffset({ days: 0 })
      )
    )

  ]
}





