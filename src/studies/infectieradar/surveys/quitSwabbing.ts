import { SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../contants';


class QuitSwabbing_Def extends SurveyDefinition {
  Explanation: ExplanationText;
  Confirm: ConfirmQuitting;
  Feedback: Feedback;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.quitSwabbing,
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
    this.Confirm = new ConfirmQuitting(this.key, required)
    this.Feedback = new Feedback(this.key, false);
  }

  buildSurvey() {
    this.addItem(this.Explanation.get())
    this.addItem(this.Confirm.get())
    this.addItem(this.Feedback.get())
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
TODO: Je hebt eerder toestemming gegeven om je contactgegevens 12 weken lang te bewaren om te kunnen worden benaderd voor aanvullend onderzoek. Als je wilt kun je hieronder die toestemming weer intrekken. Je contactgegevens worden dan direct verwijderd, en zullen dus niet meer gebruikt worden om je te benaderen voor aanvullend onderzoek.
`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class ConfirmQuitting extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'ConfirmQuitting');

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
        ['nl', 'TODO: Wil je je toestemming om je contactgegevens te bewaren intrekken?'],
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

class Feedback extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Feedback');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    const questionText = 'TODO: Als je nog feedback voor ons hebt, kun je dat hieronder invullen'

    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', questionText],
      ]),
      questionSubText: new Map([
        ['nl', 'Let op: deze informatie wordt eerst opgeslagen en niet direct door de onderzoekers bekeken.'],
      ]),
      inputLabelText: new Map([
        ['nl', ''],
      ]),
    })
  }
}

export const QuitSwabbing = new QuitSwabbing_Def(true);
