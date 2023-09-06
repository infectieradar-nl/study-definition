import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";


export const resetSeasonalVaccinationFlags_rules = {
  name: "resetSeasonalVaccinationFlags",
  rules: [
    StudyEngine.participantActions.removeFlag(ParticipantFlags.seasonalFluVaccine.key),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.seasonalCovidVaccine.key),
  ]
}
