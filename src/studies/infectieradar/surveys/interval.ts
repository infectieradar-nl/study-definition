import { Group, SurveyDefinition } from "case-editor-tools/surveys/types";
import { Q12, Q12b, Q_CIS, Q_longsymptoms, Q_longsymptoms_condition, Q_mMRC, } from "../questionPools/intervalQuestions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { Item } from "case-editor-tools/surveys/types";

import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { ContactGroup } from "../questionPools/contactGroup";
import { Q_healthrank, Q_flu_vaccine_interval, Q_flu_vaccine_datum_interval, Q_covid_vaccine_interval, Q_covid_vaccine_datum_interval } from "../questionPools/intervalQuestions";


class IntervalDef extends SurveyDefinition {
  Intro: Intro;

  VaccineGroup: VaccineGroup;
  PregnancyGroup: PregnancyGroup;
  LongcovidGroup: LongcovidGroup;
  ContactGroup: ContactGroup;

  constructor() {
    super({
      surveyKey: surveyKeys.interval,
      name: new Map([
        ["en", "About You"],
        ["nl", "Extra vragenlijst (vier keer per jaar)"],
      ]),
      description: new Map([
        ["en", "This periodic survey focues on long term health outcomes and relevant updates."],
        ["nl", "Klik op deze vragenlijst om vragen te beantwoorden over lange termijn klachten en de overdracht van luchtweginfecties. Vul deze alsjeblieft ook in als je geen klachten had."],
      ]),
      durationText: new Map([
        ["en", "This will take 10 minutes."],
        ["nl", "Invullen duurt 10 minuten."],
      ])
    });

    const isRequired = true;

    const showVaccinationQ = SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue(
        ParticipantFlags.intervalHideVaccinationQ.key,
        ParticipantFlags.intervalHideVaccinationQ.values.true
      )
    )

    const showPregnancyQ = SurveyEngine.logic.and(
      SurveyEngine.logic.not(
        SurveyEngine.participantFlags.hasKeyAndValue(
          ParticipantFlags.intervalHidePregnancyQ.key,
          ParticipantFlags.intervalHidePregnancyQ.values.true
        )
      ), SurveyEngine.participantFlags.hasKeyAndValue(
        ParticipantFlags.gender.key,
        ParticipantFlags.gender.values.female
      )
    )

    this.Intro = new Intro(this.key);
    this.VaccineGroup = new VaccineGroup(this.key, isRequired, showVaccinationQ);
    this.PregnancyGroup = new PregnancyGroup(this.key, isRequired, showPregnancyQ);
    this.LongcovidGroup = new LongcovidGroup(this.key, isRequired);
    this.ContactGroup = new ContactGroup(this.key, isRequired);


    this.editor.setPrefillRules([
      ...this.ContactGroup.getPrefillRules(),
    ])
  }

  buildSurvey() {
    this.addItem(this.Intro.get());
    this.addItem(this.VaccineGroup.get());
    this.addPageBreak();
    this.addItem(this.PregnancyGroup.get());
    this.addPageBreak();
    this.addItem(this.LongcovidGroup.get());
    this.addPageBreak();
    this.addItem(this.ContactGroup.get());
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  markdownContent = `
## Extra vragenlijst
Deze vragenlijst stellen we vier keer per jaar, ook als je **geen** klachten hebt.
De vragenlijst gaat over lange termijn klachten en de overdracht van luchtweginfecties.
`

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent],
          ]),
        })
      ]
    })
  }
}


class Intro_long extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro_long');
  }

  markdownContent = `
## Lange termijn klachten na een besmetting met corona, griep of een andere infectie
We vragen of je last hebt van vermoeidheid, concentratieproblemen of kortademigheid.
Dit zijn typische klachten waar je last van kunt blijven houden na een besmetting.
Maar je kan deze klachten ook krijgen door een andere reden.
Daarom is het belangrijk dat we dit onderzoeken. 
Het maakt voor de vragen hieronder niet uit of jezelf wel of geen besmetting hebt gehad.
`

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent],
          ]),
        })
      ]
    })
  }
}

class VaccineGroup extends Group {
  Q_flu_vaccine_interval: Q_flu_vaccine_interval;
  Q_flu_vaccine_datum_interval: Q_flu_vaccine_datum_interval;
  Q_covid_vaccine_interval: Q_covid_vaccine_interval;
  Q_covid_vaccine_datum_interval: Q_covid_vaccine_datum_interval;


  constructor(parentKey: string, isRequired: boolean, groupCondition?: Expression) {
    super(parentKey, 'Vacc')
    this.groupEditor.setCondition(groupCondition);

    // Initialize/Configure questions here:
    this.Q_flu_vaccine_interval = new Q_flu_vaccine_interval(
      this.key,
      isRequired,
      SurveyEngine.logic.not(
        SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.seasonalFluVaccine.key, ParticipantFlags.seasonalFluVaccine.values.yes)
      )
    );
    this.Q_flu_vaccine_datum_interval = new Q_flu_vaccine_datum_interval(this.key, SurveyEngine.singleChoice.any(this.Q_flu_vaccine_interval.key, '1'), isRequired);

    this.Q_covid_vaccine_interval = new Q_covid_vaccine_interval(
      this.key,
      isRequired,
      SurveyEngine.logic.not(
        SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.seasonalCovidVaccine.key, ParticipantFlags.seasonalCovidVaccine.values.yes)
      )
    );
    this.Q_covid_vaccine_datum_interval = new Q_covid_vaccine_datum_interval(this.key, SurveyEngine.singleChoice.any(this.Q_covid_vaccine_interval.key, '1'), isRequired);
  }

  buildGroup() {
    this.addItem(this.Q_flu_vaccine_interval.get());
    this.addItem(this.Q_flu_vaccine_datum_interval.get());
    this.addItem(this.Q_covid_vaccine_interval.get());
    this.addItem(this.Q_covid_vaccine_datum_interval.get());
  }
}

class LongcovidGroup extends Group {
  Intro_long: Intro_long;
  Q_CIS: Q_CIS;
  Q_mMRC: Q_mMRC;
  Q_longsymptoms: Q_longsymptoms
  Q_longsymptoms_condition: Q_longsymptoms_condition
  Q_healthrank: Q_healthrank;

  constructor(parentKey: string, isRequired: boolean, groupCondition?: Expression) {
    super(parentKey, 'Longcovid')
    this.groupEditor.setCondition(groupCondition);


    // Initialize/Configure questions here:
    this.Intro_long = new Intro_long(this.key);
    this.Q_CIS = new Q_CIS(this.key, isRequired);
    this.Q_mMRC = new Q_mMRC(this.key, isRequired);
    this.Q_longsymptoms = new Q_longsymptoms(this.key, isRequired);
    this.Q_longsymptoms_condition = new Q_longsymptoms_condition(this.key, SurveyEngine.singleChoice.any(this.Q_longsymptoms.key, '3', '4', '5'), isRequired);
    this.Q_healthrank = new Q_healthrank(this.key, isRequired);

  }

  buildGroup() {
    this.addItem(this.Intro_long.get());
    this.addItem(this.Q_CIS.get())
    this.addItem(this.Q_mMRC.get())
    this.addItem(this.Q_longsymptoms.get())
    this.addItem(this.Q_longsymptoms_condition.get())
    this.addItem(this.Q_healthrank.get())
  }
}


class PregnancyGroup extends Group {
  Q12: Q12;
  Q12b: Q12b;

  constructor(parentKey: string, isRequired: boolean, groupCondition?: Expression) {
    super(parentKey, 'Pregnancy')
    this.groupEditor.setCondition(groupCondition);


    // Initialize/Configure questions here:
    this.Q12 = new Q12(this.key, undefined, isRequired);
    this.Q12b = new Q12b(this.key, SurveyEngine.singleChoice.any(this.Q12.key, '0'), isRequired);

  }

  buildGroup() {
    this.addItem(this.Q12.get());
    this.addItem(this.Q12b.get());
  }
}




export const Interval = new IntervalDef();
