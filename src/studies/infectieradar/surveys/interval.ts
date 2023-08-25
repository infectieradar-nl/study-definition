import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { Q1aNL, Q1b1NL, Q1b2NL, Q1b3NL, Q1d1NL, Q1d3NL, Q1dNL, Q1gNL, Q1kNL, Q2title, Q3title, Q4title } from "../questionPools/coronaTest";
import { Q12, Q12b, Q_CIS, Q_longsymptoms, Q_mMRC, } from "../questionPools/intervalQuestions";
import { FinalText, HasSymptomsGroup, QWithin24hours, SelfSwabTemporaryInfo, SymptomsGroup } from "../questionPools/weeklyQuestions";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";
import { Expression, SurveyItem, SurveySingleItem} from "survey-engine/data_types";
import { matrixKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
import { ItemEditor } from "case-editor-tools/surveys/survey-editor/item-editor";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentEditor } from "case-editor-tools/surveys/survey-editor/component-editor";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { initMatrixQuestion, ResponseRowCell } from "case-editor-tools/surveys/responseTypeGenerators/matrixGroupComponent";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "case-editor-tools/surveys/utils/simple-generators";
import { ContactGroup } from "../questionPools/contactGroup";
import { Q_flu_vaccine_interval, Q_flu_vaccine_datum_interval, Q_covid_vaccine_interval, Q_covid_vaccine_datum_interval} from "../questionPools/intervalQuestions";


class IntervalDef extends SurveyDefinition {
  //Q_CIS: Q_CIS;
  Intro:Intro;
  Q_flu_vaccine_interval:Q_flu_vaccine_interval;
  Q_flu_vaccine_datum_interval:Q_flu_vaccine_datum_interval;
  Q_covid_vaccine_interval:Q_covid_vaccine_interval;
  Q_covid_vaccine_datum_interval:Q_covid_vaccine_datum_interval;
  //Q12: Q12;
  //Q12b: Q12b;
  Intro_long:Intro_long;
  Q_CIS:Q_CIS;
  Q_mMRC:Q_mMRC;
  Q_longsymptoms:Q_longsymptoms
  ContactGroup: ContactGroup;

  constructor() {
    super({
      surveyKey: surveyKeys.interval,
      name: new Map([
        ["en", "About You"],
        ["nl", "Perodieke vragen"],
      ]),
      description: new Map([
        ["en", "This periodic survey focues on long term health outcomes and relevant updates."],
        ["nl", "Klik op deze periodieke vragenlijst om vragen te beantwoorden over lange termijn klachten, contactpatronen en vaccinatie"],
      ]),
      durationText: new Map([
        ["en", "This will take 10 minutes."],
        ["nl", "Invullen duurt 10 minuten."],
      ])
    });

    const isRequired = true;

    // this.Q_CIS = new Q_CIS(this.key, isRequired);
    this.Intro = new Intro(this.key);
    this.Q_flu_vaccine_interval = new Q_flu_vaccine_interval(this.key, isRequired);
    this.Q_flu_vaccine_datum_interval = new Q_flu_vaccine_datum_interval(this.key, SurveyEngine.singleChoice.any(this.Q_flu_vaccine_interval.key, '1'), isRequired);
    this.Q_covid_vaccine_interval = new Q_covid_vaccine_interval(this.key, isRequired);
    this.Q_covid_vaccine_datum_interval = new Q_covid_vaccine_datum_interval(this.key, SurveyEngine.singleChoice.any(this.Q_covid_vaccine_interval.key, '1'), isRequired);
    this.Intro_long = new Intro_long(this.key);
    this.Q_CIS = new Q_CIS(this.key, isRequired);
    this.Q_mMRC = new Q_mMRC(this.key, isRequired);
    this.Q_longsymptoms = new Q_longsymptoms(this.key, isRequired);

    //this.Q12 = new Q12(this.key, isRequired);
    // this.Q12 = new Q12(this.key, SurveyEngine.singleChoice.any(this.QGender.key, '1'), isRequired);
    // this.Q12b = new Q12b(this.key, SurveyEngine.singleChoice.any(this.Q12.key, '0'), isRequired);
    this.ContactGroup = new ContactGroup(this.key, isRequired);




    this.editor.setPrefillRules([
      ...this.ContactGroup.getPrefillRules(),
    ])
  }

  buildSurvey() {
    // this.addItem(this.Q_CIS.get());
    //this.addItem(this.Q12.get());
    // this.addItem(this.Q12b.get());
    this.addItem(this.Intro.get());
    this.addItem(this.Q_flu_vaccine_interval.get());
    this.addItem(this.Q_flu_vaccine_datum_interval.get());
    this.addItem(this.Q_covid_vaccine_interval.get());
    this.addItem(this.Q_covid_vaccine_datum_interval.get());
    this.addPageBreak();
    this.addItem(this.Intro_long.get());
    this.addItem(this.Q_CIS.get())
    this.addItem(this.Q_mMRC.get())
    this.addItem(this.Q_longsymptoms.get())
    this.addPageBreak();
    this.addItem(this.ContactGroup.get());
    
  }

}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  markdownContent = `
## Periodieke vragenlijst
Deze vragenlijst stellen we vier keer per jaar. 
De vragenlijst gaat over vaccinatie, lange termijn klachten en contact-patronen.
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




export const Interval = new IntervalDef();
