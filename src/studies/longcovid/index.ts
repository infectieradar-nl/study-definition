import { Study } from "case-editor-tools/types/study";
import { flagFinishedParticipants_rules, cleanUpT0FromFinishedParticipants_rules } from "./customRules/flagFinishedParticipants";

export const LongCovidStudy: Study = {
    studyKey: 'longcovid',
    outputFolderName: 'longcovid',
    surveys: [

    ],
    customStudyRules: [
        flagFinishedParticipants_rules,
        cleanUpT0FromFinishedParticipants_rules,
    ]
}