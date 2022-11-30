import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";
import { Intake } from "../surveys/intake";
import { Weekly } from "../surveys/weekly";

const referenceDate = 1661990400;

export const fixLastVaccinationAnswerFlag_rules = {
  name: "fixLastVaccinationAnswerFlag",
  rules: [
    StudyEngine.if(
      StudyEngine.participantState.lastSubmissionDateOlderThan(
        referenceDate, surveyKeys.intake
      ),
      // if has old intake:
      StudyEngine.do(
        // reinvite to fill out intake again:
        StudyEngine.participantActions.assignedSurveys.remove(Intake.key, 'all'),
        StudyEngine.participantActions.assignedSurveys.remove(Weekly.key, 'all'),
        StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal'),
      ),
      // else:
      StudyEngine.if(
        StudyEngine.participantState.lastSubmissionDateOlderThan(
          StudyEngine.timestampWithOffset({ days: -28 }), surveyKeys.intake
        ),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, referenceDate),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: -14 })),
      )

    ),
  ]
}

