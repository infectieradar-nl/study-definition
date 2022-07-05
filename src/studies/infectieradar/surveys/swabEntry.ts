import { SurveyItems } from "case-editor-tools/surveys";
import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { surveyKeys } from "../contants";

class SwabEntryDef extends SurveyDefinition {
  CodeVal: CodeValQuestion;

  constructor() {
    super({
      surveyKey: surveyKeys.swabEntry,
      name: new Map([
        ["en", "TODO: "],
        ["nl", "Wekelijkse vragenlijst"],
      ]),
      description: new Map([
        ["en", "Survey about your health status in the last week."],
        ["nl", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
      ]),
      durationText: new Map([
        ["en", "15 seconds to 3 minutes, depending on your symptoms."],
        ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
      ])
    });


    this.CodeVal = new CodeValQuestion(this.key, true);
  }

  buildSurvey(): void {
    this.addItem(this.CodeVal.get());
  }
}




class CodeValQuestion extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'CodeVal');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'TODO: code validation question'],
      ]),
      questionSubText: new Map([
        ['nl', 'TODO: enter the code provided by letter'],
      ]),
      responseItemDefs: [
        {
          key: 'cv', role: 'entryCodeValidation', mapToRole: 'input',
        }
      ]
    })
  }
}

export const SwabEntry = new SwabEntryDef();
