import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine } from "case-editor-tools/surveys";
import { Q1aNL, Q1b1NL, Q1b2NL, Q1b3NL, Q1d1NL, Q1d3NL, Q1dNL, Q1gNL, Q1kNL, Q2title, Q3title, Q4title } from "../questionPools/coronaTest";
import { FinalText, HasSymptomsGroup, QWithin24hours, SelfSwabTemporaryInfo, SymptomsGroup } from "../questionPools/weeklyQuestions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";

class WeeklyDef extends SurveyDefinition {
  SelfSwabTemporaryInfo: SelfSwabTemporaryInfo;

  QWithin24hours: QWithin24hours;

  // TEST:
  Q1aNL: Q1aNL;
  // self-test
  Q2title: Q2title;
  Q1kNL: Q1kNL;
  Q1b3NL: Q1b3NL;
  Q1d3NL: Q1d3NL;
  // nose/throat swab
  Q3title: Q3title;
  Q1d1NL: Q1d1NL;
  //Q1fNL: Q1fNL;
  Q1gNL: Q1gNL;
  Q1b1NL: Q1b1NL;
  // blood test
  Q4title: Q4title;
  Q1dNL: Q1dNL;
  Q1b2NL: Q1b2NL;

  // symptoms:
  Q1: SymptomsGroup;
  HS: HasSymptomsGroup;


  FinalText: FinalText;


  constructor() {
    super({
      surveyKey: surveyKeys.weekly,
      name: new Map([
        ["en", "How do you feel today?"],
        ["nl", "Wekelijkse vragenlijst"],
      ]),
      description: new Map([
        ["en", "Survey about your health status in the last week."],
        ["nl", "Klik hier voor uw vragenlijst over u klachten in de afgelopen week. Meld alsjeblieft ook als u geen klachten had."],
      ]),
      durationText: new Map([
        ["en", "15 seconds to 3 minutes, depending on your symptoms."],
        ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van uw klachten."],
      ])
    });

    this.SelfSwabTemporaryInfo = new SelfSwabTemporaryInfo(this.key, SurveyEngine.participantFlags.hasKeyAndValue(
      ParticipantFlags.selfSwabbing.key, ParticipantFlags.selfSwabbing.values.active
    ));

    const isRequired = true;

    // Initialize/Configure questions here:
    const isWithin24hours = SurveyEngine.compare.lte(
      SurveyEngine.timestampWithOffset({ days: -1 }),
      SurveyEngine.participantFlags.getAsNum(ParticipantFlags.lastWeeklySubmission.key),
    )
    this.QWithin24hours = new QWithin24hours(this.key, isWithin24hours, isRequired);

    this.Q1 = new SymptomsGroup(this.key, SurveyEngine.logic.or(
      SurveyEngine.singleChoice.any(this.QWithin24hours.key, '2'),
      SurveyEngine.logic.not(isWithin24hours)
    ));

    const hasAnySymptoms = SurveyEngine.multipleChoice.none(this.Q1.QSymptoms.key, this.Q1.QSymptoms.optionKeys.no);
    const hasFeverCondition = SurveyEngine.multipleChoice.any(this.Q1.QSymptoms.key, this.Q1.QSymptoms.optionKeys.fever);
    this.HS = new HasSymptomsGroup(this.key, hasAnySymptoms, hasFeverCondition);

    this.Q1aNL = new Q1aNL(this.key,
      SurveyEngine.logic.or(
        SurveyEngine.singleChoice.none(this.QWithin24hours.key, '3'),
        SurveyEngine.logic.not(isWithin24hours)
      ),
      true);
    const conditionForSelfTest = SurveyEngine.multipleChoice.any(
      this.Q1aNL.key, this.Q1aNL.optionKeys.selfTest
    );
    const conditionForPCR = SurveyEngine.multipleChoice.any(
      this.Q1aNL.key, this.Q1aNL.optionKeys.pcr
    );
    const conditionForBloodTest = SurveyEngine.multipleChoice.any(
      this.Q1aNL.key, this.Q1aNL.optionKeys.blood
    );

    this.Q2title = new Q2title(this.key, conditionForSelfTest);
    this.Q1kNL = new Q1kNL(this.key, conditionForSelfTest, true);
    this.Q1b3NL = new Q1b3NL(this.key, conditionForSelfTest, true);

    const conditionForAnsweredSelfTest = SurveyEngine.singleChoice.any(
      this.Q1b3NL.key, this.Q1b3NL.optionKeys.positive, this.Q1b3NL.optionKeys.negative
    );
    this.Q1d3NL = new Q1d3NL(this.key, conditionForAnsweredSelfTest, true);
    this.Q3title = new Q3title(this.key, conditionForPCR);
    this.Q1d1NL = new Q1d1NL(this.key, conditionForPCR, true);
    //this.Q1fNL = new Q1fNL(this.key, conditionForPCR, true);
    this.Q1gNL = new Q1gNL(this.key, conditionForPCR, true);
    this.Q1b1NL = new Q1b1NL(this.key, conditionForPCR, true);
    this.Q4title = new Q4title(this.key, conditionForBloodTest);
    this.Q1dNL = new Q1dNL(this.key, conditionForBloodTest, true);
    this.Q1b2NL = new Q1b2NL(this.key, conditionForBloodTest, true);

    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.SelfSwabTemporaryInfo.get());
    this.addItem(this.QWithin24hours.get());

    this.addItem(this.Q1aNL.get());
    this.addItem(this.Q2title.get());
    this.addItem(this.Q1kNL.get());
    this.addItem(this.Q1b3NL.get());
    this.addItem(this.Q1d3NL.get());

    this.addItem(this.Q3title.get());
    this.addItem(this.Q1d1NL.get());
    //this.addItem(this.Q1fNL.get());
    this.addItem(this.Q1gNL.get());
    this.addItem(this.Q1b1NL.get());

    this.addItem(this.Q4title.get());
    this.addItem(this.Q1dNL.get());
    this.addItem(this.Q1b2NL.get());

    this.addItem(this.Q1.get());
    this.addItem(this.HS.get());

    this.addItem(this.FinalText.get());
  }
}

export const Weekly = new WeeklyDef();
