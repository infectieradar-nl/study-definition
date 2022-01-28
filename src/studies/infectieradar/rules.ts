import { Expression } from "survey-engine/lib/data_types";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
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
    StudyEngine.participantActions.assignedSurveys.remove(Intake.key, 'all'),
    StudyEngine.ifThen(
        StudyEngine.not(
            StudyEngine.participantState.hasSurveyKeyAssigned(Weekly.key)
        ),
        StudyEngine.participantActions.assignedSurveys.add(Weekly.key, 'prio')
    ),
    StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'optional'),
    StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal', StudyEngine.timestampWithOffset({ years: 1 })),

    StudyEngine.if(
        StudyEngine.singleChoice.any(Intake.QMainActivity.key, "7"),
        StudyEngine.participantActions.updateFlag('retired', 'true')
    )
)

const handleWeekly = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(Weekly.key),
    // then do:
    StudyEngine.participantActions.assignedSurveys.remove(Weekly.key, 'all'),
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
    // vaccination:
    StudyEngine.if(
        StudyEngine.singleChoice.any(Weekly.Q2NL.key, "5", "6"), // this key is selected
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.covidVaccine21.key,
            ParticipantFlags.covidVaccine21.values.full
        ),
    ),
    StudyEngine.if(
        StudyEngine.singleChoice.any(Weekly.Q2NL.key, '2'), // this key is selected
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.covidVaccine21.key,
            ParticipantFlags.covidVaccine21.values.never
        )
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
    entryRules,
    submitRules,
)