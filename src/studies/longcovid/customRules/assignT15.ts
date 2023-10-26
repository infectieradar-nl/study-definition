import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

const flagKey = 'T15fixApplied';

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


export const assignT15_rules = {
  name: "assignT15",
  rules: [
    StudyEngine.ifThen(
      // IF extendFU == ja
      StudyEngine.and(
        StudyEngine.checkConditionForOldResponses(
          StudyEngine.singleChoice.any(
            'T12.DEM.extend_FU', 'ja'
          ),
          'any', 'T12'
        ),
        StudyEngine.not(StudyEngine.participantState.hasParticipantFlagKey(flagKey))
      ),
      // MAKE SURE WE HAVE ONLY ONE T15:
      StudyEngine.participantActions.assignedSurveys.remove('T15', 'all'),
      // ASSIGN T15 from study start:
      assignSurveyFromStudyStart('T15', "prio", 450, 42),
      // REMOVE exitFlag
      StudyEngine.participantActions.removeFlag('exitStatus'),
      // FLAG PARTICIPANT TO BE ABLE TO FIND THEM LATER IF NEEDED:
      StudyEngine.participantActions.updateFlag(
        flagKey,
        StudyEngine.timestampWithOffset({ days: 0 })
      )
    )

  ]
}
