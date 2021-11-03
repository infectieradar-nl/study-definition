import { Expression } from "survey-engine/lib/data_types";
import { StudyEngine } from "../../case-editor/expression-utils/studyEngineExpressions";
import { StudyRules } from "../../case-editor/types/studyRules";
import { ParticipantFlags } from "./participantFlags";

const surveyKeys = {
    intake: 'intake',
    weekly: 'weekly'
}

/**
 * Define what should happen, when persons enter the study first time:
 */
const entryRules: Expression[] = [
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'normal')
];


/**
 * Define what should happen, when persons submit a survey:
 */
const handleIntake = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(surveyKeys.intake),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio'),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'optional'),
)

const handleWeekly = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(surveyKeys.weekly),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'optional'),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio', StudyEngine.timestampWithOffset({
        hours: 1,
    })),
    // Manage flags:
    StudyEngine.if(
        // if has ongoing symptoms:
        StudyEngine.singleChoice.any(`${surveyKeys.weekly}.HS.Q4`, '2'),
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
                StudyEngine.singleChoice.any("weekly.Q2NL", "4"), // this key is selected
                StudyEngine.singleChoice.none("weekly.Q2bNL", "5") // something else selected
            ),
            StudyEngine.and(
                StudyEngine.singleChoice.any("weekly.Q2NL", "3"), // this key is selected
                StudyEngine.singleChoice.any("weekly.Q2bNL", "5") // this key is selected
            ),
        ),
        StudyEngine.participantActions.updateFlag("21-vacc", "full"),
    ),
    StudyEngine.if(
        StudyEngine.singleChoice.any('weekly.Q2NL', '2'), // this key is selected
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