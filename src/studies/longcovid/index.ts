import { Study } from "case-editor-tools/types/study";
import { assignT15Retroactively_rules } from "./customRules/assignT15";
import { assignCatchupRetroactively_rules } from "./customRules/assignStopContinue";
import { flagFinishedParticipants_rules, cleanUpT0FromFinishedParticipants_rules } from "./customRules/flagFinishedParticipants";
import { inviteToExternalStudy_rules } from "./customRules/inviteToExternalStudy";
import { flagcatchupParticipants_rules } from "./customRules/flagCathupParticipants";


export const LongCovidStudy: Study = {
  studyKey: 'longcovid',
  outputFolderName: 'longcovid',
  surveys: [

  ],
  customStudyRules: [
    flagFinishedParticipants_rules,
    cleanUpT0FromFinishedParticipants_rules,
    inviteToExternalStudy_rules,
    assignT15Retroactively_rules,
    assignCatchupRetroactively_rules,
    flagcatchupParticipants_rules
  ]
}
