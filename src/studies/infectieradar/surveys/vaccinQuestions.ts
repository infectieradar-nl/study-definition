import { SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { surveyKeys } from '../contants';
import { expWithArgs } from "case-editor-tools/surveys/utils/simple-generators";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";

class vaccinQuestionsSample extends SurveyDefinition {

  IntroText: IntroText;
  covidvaccin: covidvaccin;
  griepvaccin: griepvaccin;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.vaccinQuestions,
      name: new Map([
        ['nl', 'Vragenlijst over vaccinaties sinds 1 september']
      ]),
      description: new Map([
        ['nl', 'Klik hier om de vragenlijst over COVID- en griepvaccinatie in te vullen']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 2 minuten']
      ]),
    });

    const isRequired = true;

    this.IntroText = new IntroText(this.key);
    this.covidvaccin = new covidvaccin(this.key, isRequired);
    this.griepvaccin = new griepvaccin(this.key, isRequired);
    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.IntroText.get());
    this.addItem(this.covidvaccin.get());
    this.addItem(this.griepvaccin.get());
    this.addItem(this.FinalText.get());
  }
}


class IntroText extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'IntroText')
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.text({
          content: new Map([
            ["nl", "Het afgelopen seizoen is er iets misgegaan met het uitvragen van vaccinatie-informatie. Om dit te herstellen hebben we twee korte vragen.",
            ]])
        }),
      ]
    })
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
        ["nl", "Heb je je sinds afgelopen 1 september laten vaccineren tegen COVID?"],
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
            ["nl", "Ja, op/rond de volgende datum:"],
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
        ["nl", "Heb je je sinds afgelopen 1 september laten vaccineren tegen griep?"],
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
            ["nl", "Ja, op/rond de volgende datum:"],
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

