import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../contants";
import { SurveySingleItem } from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";

class ControleDef extends SurveyDefinition {
  Intro: Intro;

  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.Controle,
      name: new Map([
        ["nl", "TODO: Achtergrond informatie"],
      ]),
      description: new Map([
        ["nl", "TODO: Klik op dit aanmeldingsformulier om je achtergrondinformatie in te vullen."],
      ]),
      durationText: new Map([
        ["nl", "TODO: Invullen duurt 5 minuten."],
      ]),
      availableFor: 'public',
    });

    const isRequired = true;

    this.Intro = new Intro(this.key);

    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    this.addItem(this.Intro.get());
    this.addItem(this.FinalText.get());
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro')
  }

  markdownContent = `
TODO: add explanation
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


class FinalText extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'FinalText');
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ["nl", "Dank je wel. Dit was de laatste vraag. TODO:"],
      ]),
      this.condition,
    )
  }
}

export const Controle = new ControleDef();
