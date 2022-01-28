import { Study } from "case-editor-tools/types/study";
import { studyRules } from "./rules";
import { updateVaccinationFlag_20211103_rules } from "./customRules/updateVaccinationFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";
import { reinvitePeopleToIntake_rules } from "./customRules/reinvitePeopleToIntake";
import { updateRetirementFlag_rules } from "./customRules/addRetirementFlag";

export const InfectieradarStudy: Study = {
    studyKey: 'default',
    outputFolderName: 'infectieradar',
    surveys: [
        Weekly,
        Intake
    ],
    studyRules: studyRules,
    customStudyRules: [
        updateVaccinationFlag_20211103_rules,
        reinvitePeopleToIntake_rules,
        updateRetirementFlag_rules,
    ]
}