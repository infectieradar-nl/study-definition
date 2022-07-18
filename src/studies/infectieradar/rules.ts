import { Expression } from "survey-engine/data_types";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";
import { handleSelfSwabbingIsInvited, handleSelfSwabbingSampler } from "./ruleUtils";
import { externalServiceNames } from "./contants";



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
  handleSelfSwabbingIsInvited(),
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
    StudyEngine.participantActions.updateFlag('retired', 'true'),
    StudyEngine.participantActions.updateFlag('retired', 'false'),
  ),
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
    StudyEngine.singleChoice.any(Weekly.Q2NL.key, "5"), // this key is selected
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
  ),
  handleSelfSwabbingSampler(),
)

const handleSwabEntry = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabEntry.key),
  // THEN:
  StudyEngine.ifThen(
    // if filled out correctly:
    StudyEngine.consent.accepted(SwabEntry.Consent.key),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(SwabEntry.key, 'all'),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbing.key,
      ParticipantFlags.selfSwabbing.values.active
    ),
    StudyEngine.participantActions.externalEventHandler(externalServiceNames.entyCodeUsed)
  )
)

const handleSwabSample = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabSample.key),
  // THEN:
  StudyEngine.participantActions.assignedSurveys.remove(SwabSample.key, 'all'),
  StudyEngine.participantActions.externalEventHandler(externalServiceNames.samplerInviteResponse)
)

const submitRules: Expression[] = [
  handleIntake,
  handleWeekly,
  handleSwabEntry,
  handleSwabSample,
];

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  entryRules,
  submitRules,
)
