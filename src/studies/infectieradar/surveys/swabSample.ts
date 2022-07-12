import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { surveyKeys } from "../contants";

class SwabSampleDef extends SurveyDefinition {
  Intro: Intro;
  Confirm: ConfirmParticipation;
  InfosConfirmed: InfosWhenConfirmed;
  InfosRejected: InfosWhenRejected;

  constructor() {
    super({
      surveyKey: surveyKeys.swabSample,
      name: new Map([
        ["nl", "TODO: name"],
      ]),
      description: new Map([
        ["nl", "TODO: description"],
      ]),
      durationText: new Map([
        ["nl", "TODO: duration"],
      ])
    });


    this.Intro = new Intro(this.key);
    this.Confirm = new ConfirmParticipation(this.key, true);

    this.InfosConfirmed = new InfosWhenConfirmed(this.key,
      SurveyEngine.singleChoice.any(this.Confirm.key, this.Confirm.optionKeys.yes)
    )
    this.InfosRejected = new InfosWhenRejected(this.key,
      SurveyEngine.singleChoice.any(this.Confirm.key, this.Confirm.optionKeys.no)
    )

  }

  buildSurvey(): void {
    this.addItem(this.Intro.get())
    this.addItem(this.Confirm.get())
    this.addItem(this.InfosConfirmed.get())
    this.addItem(this.InfosRejected.get())
  }
}

class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  markdownContent = `
## TODO:
Infos that you were selected for the swab sampling this week

**Please confirm participation**
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



class ConfirmParticipation extends Item {
  optionKeys = {
    yes: '1',
    no: '0'
  }

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Confirm');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "TODO: question to confirm, you will send in the swab"],
      ]),
      questionSubText: new Map([
        ["nl", "TODO: we need this because slots are limited"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ],
    })
  }
}


class InfosWhenConfirmed extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'InfoConfirmed');
    this.condition = condition;
  }

  markdownContent = `
Add infos (markdown format) about what participant need to do when confirms to be send in sample
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

class InfosWhenRejected extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'InfoRejected');
    this.condition = condition;
  }

  markdownContent = `
Add infos (markdown format) to be displayed if participant rejects to participant this week.
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

export const SwabSample = new SwabSampleDef();
