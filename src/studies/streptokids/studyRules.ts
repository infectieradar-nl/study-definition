import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { surveyKeys } from "./contants";
import { Case } from "./surveys/Case";


const handleCaseSubmit = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(surveyKeys.Case),
  // then do:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Case.resultaten.key, '1'),
    StudyEngine.participantActions.externalEventHandler('igasSaveCaseContact')
  )
);

const submitRules: Expression[] = [
  handleCaseSubmit,
];


/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  undefined,
  submitRules,
  undefined,
)
