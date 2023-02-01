import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../contants";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";


class CaseRegistrationDef extends SurveyDefinition {
  Intro: Intro;
  Participation: Participation;
  Consent_streptokids: Consent_streptokids;
  Consent_infectiekids: Consent_infectiekids;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.CaseRegistrationDef,
      name: new Map([
        ["nl", "Streptokids onderzoek"],
      ]),
      description: new Map([
        ["nl", "Klik op dit formulier om je aan te melden voor het onderzoek."],
      ]),
      durationText: new Map([
        ["nl", "Invullen duurt 5 minuten."],
      ]),
      availableFor: 'public',
    });

    const isRequired = true;

    this.Intro = new Intro(this.key);
    this.Participation = new Participation(this.key, isRequired);
    this.Consent_streptokids = new Consent_streptokids(this.key,
      SurveyEngine.singleChoice.any(this.Participation.key, '1'), isRequired);
    this.Consent_infectiekids = new Consent_infectiekids(this.key,
      SurveyEngine.singleChoice.any(this.Participation.key, '1'), isRequired);
    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    this.addItem(this.Intro.get());
    this.addItem(this.Participation.get());
    this.addItem(this.Consent_streptokids.get());
    this.addItem(this.Consent_infectiekids.get());
    this.addItem(this.FinalText.get());
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro')
  }

  markdownContent = `
##### <span className="text-primary">Streptokids</span>
### Join as case

Het Centrum Infectieziektebestrijding van het Rijksinstituut voor Volksgezondheid en Milieu (RIVM) doet onderzoek naar groep A streptokokken bij kinderen. De groep A streptokok (GAS) is een bacterie die een besmettelijke infectie kan veroorzaken. De meeste infecties door deze bacterie zijn niet ernstig, bijvoorbeeld krentenbaard of roodvonk. Soms kunnen mensen in korte tijd ernstig ziek worden door de streptokok. Dit heet een ‘invasieve GAS’ infectie. Op dit moment zien we meer kinderen met een invasieve GAS infectie dan normaal. Het RIVM onderzoekt hoe dat kan.
U bent gevraagd door de GGD om mee te doen aan dit onderzoek omdat uw kind een invasieve GAS infectie heeft (gehad). Lees onderstaande informatie rustig door. Beslis daarna pas of u mee wil doen aan het onderzoek. Heeft u extra vragen? Stel ze aan de GGD of aan de RIVM onderzoekers via streptokids@rivm.nl. U kunt er ook eerst over praten met uw partner, vrienden of familie.

Doel van het onderzoek
Het RIVM onderzoekt welke kinderen een grotere kans hebben op een invasieve GAS infectie. Dit onderzoek heet het ‘Streptokids onderzoek'. Wij hopen door dit onderzoek meer inzicht te krijgen in invasieve GAS infectie zodat kinderen in de toekomst minder ziek worden door een invasieve GAS infectie.

Wat houdt meedoen in?
Wilt u meedoen aan het Streptokids onderzoek? Dan stellen wij u een paar vragen over uw kind en zijn/haar omgeving, zoals naar het kinderdagverblijf of school gaan. De antwoorden zullen ons helpen bij het onderzoek. Het invullen van deze vragenlijst duurt ongeveer 10 minuten. Meedoen aan het onderzoek is vrijwillig. 

Gebruik van de gegevens van de GGD
Uw kind heeft een invasieve GAS infectie (gehad). Invasieve GAS infecties worden doorgegeven aan de GGD. Dit betekent dat een arts of laboratorium een invasieve GAS infectie meldt bij de GGD als bij iemand deze infectie is vastgesteld. De GGD kan daarna vragen welke personen in contact zijn geweest met de zieke persoon toen die besmettelijk was. De GGD kan deze personen antibiotica geven zodat ze niet ziek worden. De GGD meldt aan het RIVM dat iemand invasieve GAS heeft. Deze melding wordt opgeslagen in het Osiris systeem. In het Osiris systeem staan geen persoonsgegevens zoals naam of adres, maar wel een patiëntnummer. Dit noemen we het Osiris nummer. Als het goed is heeft u het Osiris nummer van uw kind gekregen van de GGD. Met dit Osiris nummer kunnen wij uw antwoorden op de Streptokids vragenlijst samenvoegen met de gegevens in het Osiris systeem. De gegevens in het Osiris systeem kunnen het onderzoek helpen. 

Gebruik van de gegevens van het ziekenhuis
Als uw kind met een invasieve GAS infectie in het ziekenhuis heeft gelegen kunt u in sommige ziekenhuizen meedoen aan het infectiekids onderzoek (zie [*www.infectiekids.nl*](www.infectiekids.nl)). Het RIVM werkt samen met het infectiekids onderzoek.  De gegevens van het infectiekids onderzoek kunnen dit onderzoek helpen. Wij vragen u om toestemming om de  de Streptokids vragenlijst samen te voegen met de gegevens van het infectiekids onderzoek. 
Het RIVM zal alleen uw gegevens  gebruiken als u hiervoor toestemming geeft. U kunt op elk moment stoppen met het onderzoek en hoeft niet te zeggen waarom. Uw ingevulde vragenlijstgegevens zullen dan verwijderd worden. Als u wilt stoppen, stuur dan een e-mail naar: streptokids@rivm.nl. Meer informatie vindt u in de [*privacyverklaring*](https://www.rivm.nl/privacy) van het RIVM.

Geef hieronder aan of u toestemming geeft.

Ik verklaar dat
- Ik de privacyverklaring van het RIVM heb gelezen,
- Ik genoeg mogelijkheden heb gekregen om vragen te stellen,
- Ik weet dat meedoen aan het onderzoek vrijwillig is,
- Ik weet dat ik elk moment kan stoppen met dit onderzoek zonder te vertellen waarom
- Ik begrijp wat dit wetenschappelijk onderzoek van het RIVM betekent
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

class Participation extends Item {

constructor(parentKey: string, isRequired: boolean) {
  super(parentKey, 'Participation');

  this.isRequired = isRequired;
}

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Ik wil meedoen aan dit wetenschappelijk onderzoek van het RIVM naar risicofactoren voor invasieve GAS infectie bij kinderen (Streptokids)."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


class Consent_streptokids extends Item {

constructor(parentKey: string, condition: Expression, isRequired: boolean) {
  super(parentKey, 'Consent_streptokids');
  this.condition = condition;
  this.isRequired = isRequired;
}

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Ik geef toestemming aan het RIVM om de gegevens van deze vragenlijst te gebruiken voor het onderzoek naar invasieve GAS infectie bij kinderen (Streptokids)."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}
  
class Consent_infectiekids extends Item {

constructor(parentKey: string, condition: Expression, isRequired: boolean) {
  super(parentKey, 'Consent_infectiekids');
  this.condition = condition;
  this.isRequired = isRequired;
}
  
  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Ik ben gevraagd door het ziekenhuis om mee te doen aan het infectiekids onderzoek (zie www.infectiekids.nl). Ik geef toestemming om de gegevens van het infectiekids onderzoek samen te voegen met de gegevens van de Streptokids vragenlijst."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Niet van toepassing"],
          ])
        },
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
        ["nl", "Dank voor het invullen."],
      ]),
      this.condition,
    )
  }
}

export const CaseRegistration = new CaseRegistrationDef();
