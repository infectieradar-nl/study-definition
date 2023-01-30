import { Study } from "case-editor-tools/types/study";
import { Controle } from "./surveys/Controle";
import { Case } from "./surveys/Case";
import { ControleRegistration } from "./surveys/ControleRegistration";


export const StreptokidsStudy: Study = {
  studyKey: 'streptokids',
  surveys: [
    ControleRegistration,
    Controle,
    Case,
  ],
}
