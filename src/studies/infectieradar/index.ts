import { Study } from "../../case-editor/types/study";
import { studyRules } from "./rules";
import { updateVaccinationFlag_20211103_rules } from "./customRules/updateVaccinationFlags";


export const InfectieradarStudy: Study = {
    studyKey: 'default',
    outputFolderName: 'infectieradar',
    surveys: [],
    studyRules: studyRules,
    customStudyRules: [
        updateVaccinationFlag_20211103_rules
    ]
}