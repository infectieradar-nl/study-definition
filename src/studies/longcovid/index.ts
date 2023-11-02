import { Study } from "case-editor-tools/types/study";
import { assignT15_rules } from "./customRules/assignT15";
import { assignCatchupRetroactively_rules } from "./customRules/assignCatchup";
// import { assignCatchupRetroactivelyTEST_rules } from "./customRules/assignCatchupTEST";
import { flagFinishedParticipants_rules, cleanUpT0FromFinishedParticipants_rules } from "./customRules/flagFinishedParticipants";
import { inviteToExternalStudy_rules } from "./customRules/inviteToExternalStudy";
import { flagcatchupParticipants_rules } from "./customRules/flagCathupParticipants";
import { resetcatchupParticipants_rules } from "./customRules/ResetCatchupFlag";
import { addExitStatusFlagExpired_rules } from "./customRules/addExitStatusFlagExpired";

export const LongCovidStudy: Study = {
  studyKey: 'longcovid',
  outputFolderName: 'longcovid',
  surveys: [

  ],
  customStudyRules: [
    flagFinishedParticipants_rules,
    cleanUpT0FromFinishedParticipants_rules,
    inviteToExternalStudy_rules,
    assignT15_rules,
    assignCatchupRetroactively_rules,
    // assignCatchupRetroactivelyTEST_rules,
    flagcatchupParticipants_rules,
    addExitStatusFlagExpired_rules,
    resetcatchupParticipants_rules
  ]
}
