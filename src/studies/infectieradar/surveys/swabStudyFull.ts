import { SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../constants';


class SwabStudyfull_Def extends SurveyDefinition {
  Explanation: ExplanationText;
  ContactLater: ContactLater;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.SwabStudyFull,
      name: new Map([
        ['nl', 'Aantal zelftestdeelnemers is bereikt']
      ]),
      description: new Map([
        ['nl', 'Geef hier aan of we je later kunnen vragen om alsnog mee te doen met zelftesten']
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
Op dit moment is het maximaal aantal deelnemers voor het ontvangen van zelftesten bereikt. Dit betekend dat je elke week je klachten door geeft maar dat je geen zelftest hoeft te doen (voor het onderzoek) of iets hoeft op te sturen naar het RIVM als je klachten hebt. Je informatie en deelname is nog steeds zeer waardevol.
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
        ['nl', 'Mogen we je benaderen als we nieuwe zelftestdeelnemers zoeken?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Bijvoorbeeld als er deelnemers uitvallen of er meer zelftestdeelnemers nodig zijn.'],
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
