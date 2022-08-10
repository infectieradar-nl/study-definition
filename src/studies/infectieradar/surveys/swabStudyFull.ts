import { SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../contants';


class SwabStudyfull_Def extends SurveyDefinition {
  Explanation: ExplanationText;
  ContactLater: ContactLater;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.SwabStudyFull,
      name: new Map([
        ['nl', 'TODO: Intrekken toestemming contactgegevens']
      ]),
      description: new Map([
        ['nl', 'Klink hier om je toestemming in te trekken voor het bewaren van contactgevens']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 1 minuut']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;

    this.Explanation = new ExplanationText(this.key)
    this.ContactLater = new ContactLater(this.key, required)
  }

  buildSurvey() {
    this.addItem(this.Explanation.get())
    this.addItem(this.ContactLater.get())
  }
}


class ExplanationText extends Item {
  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Info');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
TODO: add text explaining study is booked full - they can use infectieradar, etc.
`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class ContactLater extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'ContactLater');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'TODO: Can we contact you later?'],
      ]),
      questionSubText: new Map([
        ['nl', 'TODO: E.g., if more samples are available'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}


export const SwabStudyfull = new SwabStudyfull_Def(true);
