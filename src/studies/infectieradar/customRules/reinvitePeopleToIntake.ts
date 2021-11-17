import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Intake } from "../surveys/intake";



export const reinvitePeopleToIntake_rules = {
    name: "reinvitePeopleToIntake",
    rules: [
        StudyEngine.ifThen(
            StudyEngine.lt(
                StudyEngine.participantState.getStudyEntryTime(),
                StudyEngine.timestampWithOffset({ months: -4 }),
            ),
            StudyEngine.participantActions.assignedSurveys.remove(Intake.key, 'all'),
            StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal'),
        )
    ]
}