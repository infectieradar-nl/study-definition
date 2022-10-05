import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";



export const fixLastVaccinationAnswerFlag_rules = {
  name: "fixLastVaccinationAnswerFlag",
  rules: [
    StudyEngine.if(
      StudyEngine.participantState.lastSubmissionDateOlderThan(
        StudyEngine.timestampWithOffset({ days: -28 }), surveyKeys.intake
      ),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: -29 })),
      // else:
      StudyEngine.if(
        StudyEngine.participantState.lastSubmissionDateOlderThan(
          StudyEngine.timestampWithOffset({ days: -14 }), surveyKeys.intake
        ),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: -14 })),
        // Else:
        StudyEngine.if(
          StudyEngine.participantState.lastSubmissionDateOlderThan(
            StudyEngine.timestampWithOffset({ days: -7 }), surveyKeys.intake
          ),
          StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: -7 })),
          // Else:
          StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: 0 })),
        )
      )
    ),
  ]
}

