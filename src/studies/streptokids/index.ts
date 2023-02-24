import { Study } from "case-editor-tools/types/study";
import { Controle } from "./surveys/Controle";
import { Case } from "./surveys/Case";
import { ControleRegistration } from "./surveys/ControleRegistration";
import { studyRules } from "./studyRules";


export const StreptokidsStudy: Study = {
  studyKey: 'streptokids',
  outputFolderName: 'igasonderzoek',
  surveys: [
    ControleRegistration,
    Controle,
    Case,
  ],
  studyRules: studyRules
}
