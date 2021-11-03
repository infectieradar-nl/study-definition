import { Expression } from "survey-engine/lib/data_types";
import { StudyEngine } from "../../case-editor/expression-utils/studyEngineExpressions";
import { StudyRules } from "../../case-editor/types/studyRules";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";


/**
 * Define what should happen, when persons enter the study first time:
 */
const entryRules: Expression[] = [
    StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal')
];


/**
 * Define what should happen, when persons submit a survey:
 */
const handleIntake = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(Intake.key),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(Weekly.key, 'prio'),
    StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'optional'),
)

const handleWeekly = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(Weekly.key),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'optional'),
    StudyEngine.participantActions.assignedSurveys.add(Weekly.key, 'prio', StudyEngine.timestampWithOffset({
        hours: 1,
    })),
    // Manage flags:
    StudyEngine.if(
        // if has ongoing symptoms:
        StudyEngine.singleChoice.any(Weekly.HS.Q4.key, '2'),
        // then:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.yes
        ),
        // else:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.no
        )
    ),
    StudyEngine.if(
        StudyEngine.or(
            StudyEngine.and(
                StudyEngine.singleChoice.any(Weekly.Q2NL.key, "4"), // this key is selected
                StudyEngine.singleChoice.none("weekly.Q2bNL", "5") // something else selected
            ),
            StudyEngine.and(
                StudyEngine.singleChoice.any(Weekly.Q2NL.key, "3"), // this key is selected
                StudyEngine.singleChoice.any("weekly.Q2bNL", "5") // this key is selected
            ),
        ),
        StudyEngine.participantActions.updateFlag("21-vacc", "full"),
    ),
    StudyEngine.if(
        StudyEngine.singleChoice.any(Weekly.Q2NL.key, '2'), // this key is selected
        StudyEngine.participantActions.updateFlag("21-vacc", "never")
    )
)

const submitRules: Expression[] = [
    handleIntake,
    handleWeekly,
];

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
    "default",
    entryRules,
    submitRules,
)