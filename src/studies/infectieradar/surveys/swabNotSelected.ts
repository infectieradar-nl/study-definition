import { SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../contants';


class SwabNotSelected_Def extends SurveyDefinition {
  Explanation: ExplanationText;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.SwabNotSelected,
      name: new Map([
        ['nl', 'TODO: Aantal zelftestdeelnemers is bereikt']
      ]),
      description: new Map([
        ['nl', 'TODO: Geef hier aan of we je later kunnen vragen om alsnog mee te doen met zelftesten']
      ]),
      durationText: new Map([
        ['nl', 'TODO: Invullen duurt minder dan 1 minuut']
      ]),
    });


    // const required = isRequired !== undefined ? isRequired : false;

    this.Explanation = new ExplanationText(this.key)

  }

  buildSurvey() {
    this.addItem(this.Explanation.get());
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
TODO: add text, not selected for swab this time
`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}



export const SwabNotSelected = new SwabNotSelected_Def(true);
