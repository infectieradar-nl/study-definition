import { Expression } from "survey-engine/data_types";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";
import { handleSelfSwabbingIsInvited, handleSelfSwabbingSampler } from "./ruleUtils";
import { externalServiceNames, reports, surveyKeys } from "./contants";
import { QuitSwabbing } from "./surveys/quitSwabbing";



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
    // if Q2NL answered
    StudyEngine.hasResponseKey(Weekly.Q2NL.key, 'rg.scg'),
    // then save timestamp into flag
    StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: 0 })),
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
    StudyEngine.participantActions.externalEventHandler(externalServiceNames.entryCodeUsed),
    StudyEngine.participantActions.reports.init(reports.selfSwabbingEntry.key),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingContactData.key,
      ParticipantFlags.selfSwabbingContactData.values.active
    ),
    StudyEngine.participantActions.assignedSurveys.add(QuitSwabbing.key, 'optional'),
  )
)

const handleSwabSample = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabSample.key),
  // THEN:
  StudyEngine.participantActions.assignedSurveys.remove(SwabSample.key, 'all'),
  StudyEngine.participantActions.externalEventHandler(externalServiceNames.samplerInviteResponse)
)

const handleQuitSwabbing = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(QuitSwabbing.key),
  // THEN:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(QuitSwabbing.Confirm.key, QuitSwabbing.Confirm.optionKeys.yes), // this key is selected
    // THEN:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbing.key,
      ParticipantFlags.selfSwabbing.values.quitted
    ),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingContactData.key,
      ParticipantFlags.selfSwabbingContactData.values.manualDeleted
    ),
    StudyEngine.participantActions.assignedSurveys.remove(SwabEntry.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.remove(SwabSample.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.remove(QuitSwabbing.key, 'all'),
    StudyEngine.participantActions.confidentialResponses.removeAll(),
    StudyEngine.participantActions.reports.init(reports.selfSwabbingQuit.key),
  )
)

const autoRemoveContactData = StudyEngine.ifThen(
  StudyEngine.and(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(
      ParticipantFlags.selfSwabbingContactData.key,
      ParticipantFlags.selfSwabbingContactData.values.active,
    ),
    StudyEngine.participantState.lastSubmissionDateOlderThan(
      StudyEngine.timestampWithOffset({ days: -12 * 7 }),
      surveyKeys.swabEntry
    ),
  ),
  StudyEngine.participantActions.confidentialResponses.removeAll(),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.selfSwabbingContactData.key,
    ParticipantFlags.selfSwabbingContactData.values.autoDeleted
  ),
)

const submitRules: Expression[] = [
  handleIntake,
  handleWeekly,
  handleSwabEntry,
  handleSwabSample,
  handleQuitSwabbing,
];

const timerRules: Expression[] = [
  autoRemoveContactData,
]

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  entryRules,
  submitRules,
  timerRules,
)
