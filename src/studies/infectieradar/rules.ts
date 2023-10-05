import { Expression } from "survey-engine/data_types";
import { StudyRules } from "case-editor-tools/types/studyRules";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "./participantFlags";
import { Intake } from "./surveys/intake";
import { Weekly } from "./surveys/weekly";
import { SwabEntry } from "./surveys/swabEntry";
import { SwabSample } from "./surveys/swabSample";
import { assignIntervalSurveyForQ1, assignIntervalSurveyForQ2, assignIntervalSurveyForQ3, assignIntervalSurveyForQ4, handleExpired_removeSurvey, handleSelfSwabbingIsInvited, handleSelfSwabbingLogic, isCurrentISOWeekSmallerThan, isSurveyExpired, reassignIntervalSurvey } from "./ruleUtils";
import { externalServiceNames, messageTypes, reports, surveyKeys } from "./contants";
import { QuitSwabbing } from "./surveys/quitSwabbing";
import { SwabStudyfull } from "./surveys/swabStudyFull";
import { SwabNotSelected } from "./surveys/swabNotSelected";
import { Interval } from "./surveys/interval";

const quarterSwithOffset = 2 // weeks

/**
 * Define what should happen, when persons enter the study first time:
 */
const entryRules: Expression[] = [
  StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal'),
  StudyEngine.if(
    isCurrentISOWeekSmallerThan(14, quarterSwithOffset),
    assignIntervalSurveyForQ2(),
    // else:
    StudyEngine.if(
      isCurrentISOWeekSmallerThan(27, quarterSwithOffset),
      assignIntervalSurveyForQ3(),
      // else:
      StudyEngine.if(
        isCurrentISOWeekSmallerThan(40, quarterSwithOffset),
        assignIntervalSurveyForQ4(),
        // else:
        assignIntervalSurveyForQ1(),
      )
    )
  )
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
  StudyEngine.participantActions.assignedSurveys.add(Intake.key, 'normal',
    StudyEngine.getTsForNextISOWeek(
      23,
      StudyEngine.timestampWithOffset({ days: 4 * 7 })
    )
  ),

  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.QMainActivity.key, "7"),
    StudyEngine.participantActions.updateFlag('retired', 'true'),
    StudyEngine.participantActions.updateFlag('retired', 'false'),
  ),

  // Set vaccination flag with current time, so that weekly survey can use the value:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.lastReplyToVaccination.key, StudyEngine.timestampWithOffset({ days: 0 })),

  // Set seasonal vaccination flags:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.Q10.key, "1"),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalFluVaccine.key, ParticipantFlags.seasonalFluVaccine.values.yes),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalFluVaccine.key, ParticipantFlags.seasonalFluVaccine.values.no),
  ),
  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.qNL_covidvac_curseason.key, "1"),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalCovidVaccine.key, ParticipantFlags.seasonalCovidVaccine.values.yes),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalCovidVaccine.key, ParticipantFlags.seasonalCovidVaccine.values.no),
  ),

  // Set gender flag:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Intake.QGender.key, "1"),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.gender.key, ParticipantFlags.gender.values.female),
    StudyEngine.if(
      StudyEngine.singleChoice.any(Intake.QGender.key, "0"),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.gender.key, ParticipantFlags.gender.values.male),
      StudyEngine.if(
        StudyEngine.singleChoice.any(Intake.QGender.key, "2"),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.gender.key, ParticipantFlags.gender.values.other),
      )
    )
  )
)

const handleWeekly = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(Weekly.key),
  // then do:
  StudyEngine.participantActions.assignedSurveys.remove(Weekly.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(Weekly.key, 'prio', StudyEngine.timestampWithOffset({
    minutes: 5,
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
    // not submitted by "mistake":
    StudyEngine.not(
      StudyEngine.singleChoice.any(
        Weekly.QWithin24hours.key,
        '3'
      ))
    ,
    // then update timestamp of last weekly submission:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.lastWeeklySubmission.key, StudyEngine.timestampWithOffset({ days: 0 })),
  ),
  handleSelfSwabbingLogic(),
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
    StudyEngine.participantActions.messages.add(messageTypes.selftestConfirmation, StudyEngine.timestampWithOffset({ days: 0 })),
  )
)

const handleSwabStudyFull = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabStudyfull.key),
  // THEN:
  StudyEngine.ifThen(
    // if filled out correctly:
    StudyEngine.singleChoice.any(SwabStudyfull.ContactLater.key, SwabStudyfull.ContactLater.optionKeys.yes),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(SwabStudyfull.key, 'all'),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbing.key,
      ParticipantFlags.selfSwabbing.values.interestedLater
    ),
  )
)

const handleSwabSample = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabSample.key),
  // THEN:
  StudyEngine.participantActions.assignedSurveys.remove(SwabSample.key, 'all'),
  StudyEngine.participantActions.externalEventHandler(externalServiceNames.samplerInviteResponse),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(SwabSample.Confirm.key, SwabSample.Confirm.optionKeys.yes),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.selfSwabbingSampledTime.key,
      StudyEngine.timestampWithOffset({ days: 0 }),
    ),
    StudyEngine.participantActions.messages.add(messageTypes.infosAfterSelectionForSwabbing, StudyEngine.timestampWithOffset({ hours: 0 }))
  )
)

const handleSwabNotSelected = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(SwabNotSelected.key),
  // THEN:
  StudyEngine.participantActions.assignedSurveys.remove(SwabNotSelected.key, 'all'),
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
      surveyKeys.SwabEntry
    ),
  ),
  StudyEngine.participantActions.confidentialResponses.removeAll(),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.selfSwabbingContactData.key,
    ParticipantFlags.selfSwabbingContactData.values.autoDeleted
  ),
)

const handlevaccinQuestions = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(surveyKeys.vaccinQuestions),
  // THEN:
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.vaccinQuestions, 'all'),
)

const handleIntervalQuestionnaireSubmission = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(surveyKeys.interval),
  // THEN:
  reassignIntervalSurvey(),

  // handle seasonal vaccination flags:
  StudyEngine.if(
    // if has any response:
    StudyEngine.hasResponseKey(Interval.VaccineGroup.Q_flu_vaccine_interval.key, 'rg.scg'),
    // then update flag:
    StudyEngine.if(
      StudyEngine.singleChoice.any(Interval.VaccineGroup.Q_flu_vaccine_interval.key, "1"),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalFluVaccine.key, ParticipantFlags.seasonalFluVaccine.values.yes),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalFluVaccine.key, ParticipantFlags.seasonalFluVaccine.values.no),
    ),
  ),
  StudyEngine.if(
    // if has any response:
    StudyEngine.hasResponseKey(Interval.VaccineGroup.Q_covid_vaccine_interval.key, 'rg.scg'),
    // then update flag:
    StudyEngine.if(
      StudyEngine.singleChoice.any(Intake.qNL_covidvac_curseason.key, "1"),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalCovidVaccine.key, ParticipantFlags.seasonalCovidVaccine.values.yes),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.seasonalCovidVaccine.key, ParticipantFlags.seasonalCovidVaccine.values.no),
    ),
  ),
)

export const handleIntervalQuestionnaireExpired = () => StudyEngine.ifThen(
  isSurveyExpired(surveyKeys.interval),
  // Then:
  reassignIntervalSurvey()
)


const submitRules: Expression[] = [
  handleIntake,
  handleWeekly,
  handleSwabEntry,
  handleSwabStudyFull,
  handleSwabSample,
  handleSwabNotSelected,
  handleQuitSwabbing,
  handlevaccinQuestions,
  handleIntervalQuestionnaireSubmission
];

const timerRules: Expression[] = [
  autoRemoveContactData,
  handleExpired_removeSurvey(SwabSample.key),
  handleExpired_removeSurvey(SwabNotSelected.key),
  handleIntervalQuestionnaireExpired(),
]

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  entryRules,
  submitRules,
  timerRules,
)
