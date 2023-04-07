import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { surveyKeys } from '../contants';
import { expWithArgs } from "case-editor-tools/surveys/utils/simple-generators";

class vaccinQuestionsSample extends SurveyDefinition {

  covidvaccin: covidvaccin;
  griepvaccin: griepvaccin;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.vaccinQuestions,
      name: new Map([
        ['nl', 'Vragenlijst vaccinaties sinds 1 september 2022']
      ]),
      description: new Map([
        ['nl', 'Klik hier om de vragenlijst over COVID- en griepvaccinatie in te vullen']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 2 minuten']
      ]),
    });

    const isRequired = true;

    this.covidvaccin = new covidvaccin(this.key, isRequired);
      this.griepvaccin = new griepvaccin(this.key, isRequired);
    this.FinalText= new FinalText(this.key);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.covidvaccin.get());
    this.addItem(this.griepvaccin.get());
    this.addItem(this.FinalText.get());
  }
}


export class covidvaccin extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'covidvaccin');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      //condition: this.condition,
      questionText: new Map([
        ["nl", "Heeft u zich dit seizoen (sinds 1 september 2022) laten vaccineren tegen COVID?"],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'num', num: 1661990400 },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["nl", "Kies datum:"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Dat weet ik niet (meer)"],
          ])
        },
      ],            
    })
  }
}

export class griepvaccin extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'griepvaccin');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      //condition: this.condition,
      questionText: new Map([
        ["nl", "Heeft u zich dit seizoen (sinds 1 september 2022) laten vaccineren tegen griep/influenza?"],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'num', num: 1661990400 },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["nl", "Kies datum:"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Dat weet ik niet (meer)"],
          ])
        },
      ],            
    })
  }
}

export class FinalText extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'FinalText');
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ["nl", "Dank je wel. Dit was de laatste vraag."],
      ]),
      this.condition,
    )
  }
}

export const vaccinQuestions = new vaccinQuestionsSample();

