import { Study } from "case-editor-tools/types/study";
import { Controle } from "./surveys/Controle";
import { Case } from "./surveys/Case";


export const StreptokidsStudy: Study = {
  studyKey: 'streptokids',
  surveys: [
    Controle,
    Case,
  ],
}
