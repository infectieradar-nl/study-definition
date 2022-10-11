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
        ["nl", "Je bent geselecteerd voor het afnemen van een neus- en keelmonster"],
      ]),
      description: new Map([
        ["nl", "Laat weten of je de komende 24 uur een neus- en keelmonster kan afnemen"],
      ]),
      durationText: new Map([
        ["nl", "Vul in"],
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
Hiermee draag je bij aan kennis over welke virussen deze week klachten veroorzaken.

Het is echter belangrijk dat je in staat bent om het monster in de komende 24 uur te nemen.
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
        ["nl", "Lukt het om in de komende 24 uur een neus- en keelmonster af te nemen?"],
      ]),
      questionSubText: new Map([
        ["nl", "Lukt het niet, geef dit dan aan."],
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
Dank je wel dat je een neus- en keelmonster kan afnemen in de komende 24 uur.

Volg de instructies in het testpakket, of lees ze [hier](https://infectieradar.nl/assets/images/TG_137321_zelfbemonstering_V71024_1.jpg)(pagina 1) en [hier](https://infectieradar.nl/assets/images/TG_137321_zelfbemonstering_V71024_2.jpg)(pagina 2).
Of bekijk de video hieronder.

Na het afnemen stuur je het monster zo spoedig mogelijk op naar het RIVM (gebruik hiervoor de gele retourenvelop in het pakket).

- Houd rekening met de lichtingstijden van de brievenbus zodat het monster niet onnodig lang onderweg is in de post. Is het vandaag vrijdag, zaterdag of zondag, leg het monster dan in de afgesloten retourenvelop in de koelkast. Doe de retourenvelop maandag op de bus.
- Wanneer je in isolatie zit ivm corona, dan kan je het monster in de afgesloten retourenvelop in de koelkast bewaren tot je isolatie is afgelopen, of een huisgenoot (die niet in isolatie zit) kan het op de bus doen.
- **Extra verzoek: doe de corona zelftest die je thuis afgelezen hebt ook in de gele retourenvelop **(alleen de witte test-cassette, daar waar de C- en T-streepjes op staan). In de gele retourenvelop zitten dan het neus- en keelmonster en de test-cassette.

Je ontvangt automatisch een nieuw zelftest-pakket, bestel daarom niets extra.

Het resultaat van jouw neus- en keelmonster wordt na 2 weken teruggekoppeld zodat je weet wat de oorzaak van jouw klachten was. Het resultaat vind je terug in het GLEAN portaal. Je ontvangt hiervoor een bericht.

*Bovenstaande instructies ontvang je ook per e-mail.*

***

## Video
Hieronder een filmpje met uitleg over de afname van het neus- en keelmonster.
<br></br>

<video controls="controls" width=100%>
    <source src="www.rovid.nl/rivm/aco/2022/rivm-aco-20221007-id1s866uo-web-hd.mp4" type="video/mp4">
    Uw browser ondersteunt het video-element niet.
</video>
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
