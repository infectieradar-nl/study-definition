import { Study } from "../../case-editor/types/study";
import { studyRules } from "./rules";
import { updateVaccinationFlag_20211103_rules } from "./customRules/updateVaccinationFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";


export const InfectieradarStudy: Study = {
    studyKey: 'default',
    outputFolderName: 'infectieradar',
    surveys: [
        Weekly,
        Intake
    ],
    studyRules: studyRules,
    customStudyRules: [
        updateVaccinationFlag_20211103_rules
    ]
}