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
  ]
}
