import { Study } from "case-editor-tools/types/study";
import { studyRules } from "./rules";
import { updateVaccinationFlag_20211103_rules } from "./customRules/updateVaccinationFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";
import { reinvitePeopleToIntake_rules } from "./customRules/reinvitePeopleToIntake";
import { updateRetirementFlag_rules } from "./customRules/addRetirementFlag";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";
import { QuitSwabbing } from "./surveys/quitSwabbing";
import { SwabStudyfull } from "./surveys/swabStudyFull";
import { inviteToSelfSwabbingWithoutCode_rules } from "./customRules/inviteParticipantToSelfSwabbingWithoutCode";
import { participantMessages } from "./messageConfigs/participantMessages";
import { SwabNotSelected } from "./surveys/swabNotSelected";
import { removeDashboardQuestionnaire_rules } from "./customRules/removeDashboardQuestionnaire";
import { vaccinQuestions } from "./surveys/vaccinQuestions";
import { assignVaccinQuestions_rules } from "./customRules/assignVaccinQuestions";
import { Interval } from "./surveys/interval";
import { assignIntervalQuestionnaire_rules } from "./customRules/assignIntervalQuestionnaire";
import { resetSeasonalVaccinationFlags_rules } from "./customRules/resetSeasonalVaccinationFlags";
import { removeIntervaleQuestionnaire_rules } from "./customRules/removeIntervalQuestionnaire";
import { updateSexFlag_rules } from "./customRules/addSexFlag";


export const InfectieradarStudy: Study = {
  studyKey: 'default',
  outputFolderName: 'infectieradar',
  surveys: [
    Weekly,
    Intake,
    SwabEntry,
    SwabStudyfull,
    SwabSample,
    SwabNotSelected,
    QuitSwabbing,
    vaccinQuestions,
    Interval,
  ],
  studyRules: studyRules,
  messageConfigs: [
    participantMessages
  ],
  customStudyRules: [
    updateVaccinationFlag_20211103_rules,
    reinvitePeopleToIntake_rules,
    updateRetirementFlag_rules,
    inviteToSelfSwabbingWithoutCode_rules,
    removeDashboardQuestionnaire_rules,
    assignVaccinQuestions_rules,
    assignIntervalQuestionnaire_rules,
    removeIntervaleQuestionnaire_rules,
    updateSexFlag_rules,
    resetSeasonalVaccinationFlags_rules,
  ]
}
