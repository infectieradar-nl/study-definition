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
      surveyKey: surveyKeys.SwabSample,
      name: new Map([
        ["nl", "Zelfteststudie binnen Infectieradar"],
      ]),
      description: new Map([
        ["nl", "Om te weten welke varianten van COVID-19 welke klachten veroorzaken, en om te onderzoeken welke andere ziekteverwekkers klachten veroorzaken voeren we een zelfteststudie uit. Klik hier om je gevevens achter te laten enom mee te doen"],
      ]),
      durationText: new Map([
        ["nl", "Binnen 3 minuten doe je mee!"],
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
## Je bent geselecteerd voor een neus- en keelmonster.

Stuur alsjeblieft zo spoedig mogelijk een neus- en keelmonster naar het RIVM.
Hiermee draag je bij aan kennis over welke ziekteverwekkers deze week klachten veroorzaken.

Het is echter belangrijk dat je in staat bent om het monster in de komende 12 uur te nemen.
Lukt dit?

Als je mee doet ontvang je na minimaal twee weken een uitslag in je zelftestportaal.
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
        ["nl", "Lukt het om in de komende 12 uur een neus- en keelmonster af te nemen?"],
      ]),
      questionSubText: new Map([
        ["nl", "Lukt het niet, geef dit dan aan, dan zoeken we iemand anders"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, dit lukt"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee, dit lukt niet"],
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
Dank je wel dat je een neus- en keelmonster kan afnemen in de komende 12 uur.
Volg de instructies in het testpakket, of lees ze hier[link] na.

Na het afnemen stuur je het monster zo spoedig mogelijk op naar het RIVM (gebruik hiervoor de gele envelop in het pakket).
Bewaar het monster in de koelkast totdat je het op de post doet.

Je ontvangt een uitslag na minimaal twee weken.
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
Dank je wel.
Je hoeft nu verder niets te doen.

We zoeken verder naar iemand anders die dit wel kan.
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
