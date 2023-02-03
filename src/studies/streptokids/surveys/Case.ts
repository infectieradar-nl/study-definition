import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../contants";
import { SurveySingleItem } from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { Expression } from 'survey-engine/data_types';
import { expWithArgs } from "case-editor-tools/surveys/utils/simple-generators";
import { runInThisContext } from "vm";


class CaseDef extends SurveyDefinition {
  intro: intro;
  consent_streptokids: consent_streptokids;
  consent_infectiekids: consent_infectiekids;
  osirisnummer: osirisnummer;
  datum_ziek: datum_ziek;
  demo_geboortejaar: demo_geboortejaar;
  demo_geslacht: demo_geslacht;
  demo_postcode: demo_postcode;
  demo_huish_totaal: demo_huish_totaal;
  demo_huish_kinderen: demo_huish_kinderen;
  aandoeningen: aandoeningen;
  medicijnen: medicijnen;
  kind_oppas: kind_oppas;
  kind_opvang: kind_opvang;
  kind_school: kind_school;
  klachten_kind: klachten_kind;
  klachten_huisarts: klachten_huisarts;
  klachten_seh: klachten_seh;
  antibiotica: antibiotica;
  antibiotica_start: antibiotica_start;
  ziekenhuis: ziekenhuis;
  ingreep: ingreep;
  klachten_huishouden: klachten_huishouden;
  klachten_opvang: klachten_opvang;
  klachten_omgeving: klachten_omgeving;
  vacc_corona: vacc_corona;
  vacc_corona_datum: vacc_corona_datum;
  vacc_griep: vacc_griep;
  opleiding_ouder: opleiding_ouder;
  resultaten: resultaten;
  email: email;

  UV: UserVerificationQuestion;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.Case,
      name: new Map([
        ["nl", "Vragenlijst Streptokids"],
      ]),
      description: new Map([
        ["nl", "Klik op dit formulier om de vragenlijst in te vullen."],
      ]),
      durationText: new Map([
        ["nl", "Invullen duurt ongeveer 10 minuten."],
      ]),
      availableFor: 'public',
    });

    const isRequired = true;

    this.intro = new intro(this.key);
    this.consent_streptokids = new consent_streptokids(this.key, isRequired);
    const conditionForWantToParticipate = SurveyEngine.singleChoice.any(this.consent_streptokids.key, '1');
    this.consent_infectiekids = new consent_infectiekids(this.key, conditionForWantToParticipate, isRequired);

    this.osirisnummer = new osirisnummer(this.key, conditionForWantToParticipate, isRequired);
    this.datum_ziek = new datum_ziek(this.key, conditionForWantToParticipate, isRequired);
    this.demo_geboortejaar = new demo_geboortejaar(this.key, conditionForWantToParticipate, isRequired);
    this.demo_geslacht = new demo_geslacht(this.key, conditionForWantToParticipate, isRequired);
    this.demo_postcode = new demo_postcode(this.key, conditionForWantToParticipate, isRequired);
    this.demo_huish_totaal = new demo_huish_totaal(this.key, conditionForWantToParticipate, isRequired);
    this.demo_huish_kinderen = new demo_huish_kinderen(this.key, conditionForWantToParticipate, isRequired);
    this.aandoeningen = new aandoeningen(this.key, conditionForWantToParticipate, isRequired);
    this.medicijnen = new medicijnen(this.key, conditionForWantToParticipate, isRequired);
    this.kind_oppas = new kind_oppas(this.key, conditionForWantToParticipate, isRequired);
    this.kind_opvang = new kind_opvang(this.key, conditionForWantToParticipate, isRequired);
    this.kind_school = new kind_school(this.key, conditionForWantToParticipate, isRequired);
    this.klachten_kind = new klachten_kind(this.key, conditionForWantToParticipate, isRequired);
    this.klachten_huisarts = new klachten_huisarts(this.key,
      SurveyEngine.multipleChoice.any(this.klachten_kind.key, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13'), isRequired);
    this.klachten_seh = new klachten_seh(this.key,
      SurveyEngine.multipleChoice.any(this.klachten_kind.key, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13'), isRequired);
    this.antibiotica = new antibiotica(this.key, conditionForWantToParticipate, isRequired);
    this.antibiotica_start = new antibiotica_start(this.key,
      SurveyEngine.singleChoice.any(this.antibiotica.key, '1'), isRequired);
    this.ziekenhuis = new ziekenhuis(this.key, conditionForWantToParticipate, isRequired);
    this.ingreep = new ingreep(this.key, conditionForWantToParticipate, isRequired);    
    this.klachten_huishouden = new klachten_huishouden(this.key, conditionForWantToParticipate, isRequired);
    this.klachten_opvang = new klachten_opvang(this.key,
      SurveyEngine.singleChoice.any(this.kind_opvang.key, '1'), isRequired);
    this.klachten_omgeving = new klachten_omgeving(this.key, conditionForWantToParticipate, isRequired);
    this.vacc_corona = new vacc_corona(this.key, conditionForWantToParticipate, isRequired);
    this.vacc_corona_datum = new vacc_corona_datum(this.key,
      SurveyEngine.singleChoice.any(this.vacc_corona.key, '1', '2', '3', '4', '5'), isRequired);
    this.vacc_griep = new vacc_griep(this.key, conditionForWantToParticipate, isRequired);
    this.opleiding_ouder = new opleiding_ouder(this.key, conditionForWantToParticipate, isRequired);
    this.resultaten = new resultaten(this.key, conditionForWantToParticipate, isRequired);
     this.email = new email(this.key,
      SurveyEngine.singleChoice.any(this.resultaten.key, '1'), isRequired);

    this.UV = new UserVerificationQuestion(this.key, isRequired)
    this.FinalText = new FinalText(this.key);

  }

  buildSurvey() {
    this.addItem(this.intro.get());
    this.addItem(this.consent_streptokids.get());
    this.addItem(this.consent_infectiekids.get());

    this.addItem(this.osirisnummer.get());
    this.addItem(this.datum_ziek.get());
    this.addItem(this.demo_geboortejaar.get());
    this.addItem(this.demo_geslacht.get());
    this.addItem(this.demo_postcode.get());
    this.addItem(this.demo_huish_totaal.get());
    this.addItem(this.demo_huish_kinderen.get());
    this.addItem(this.aandoeningen.get());
    this.addItem(this.medicijnen.get());
    this.addItem(this.kind_oppas.get());
    this.addItem(this.kind_opvang.get());
    this.addItem(this.kind_school.get());
    this.addItem(this.klachten_kind.get());
    this.addItem(this.klachten_huisarts.get());
    this.addItem(this.klachten_seh.get());
    this.addItem(this.antibiotica.get());
    this.addItem(this.antibiotica_start.get());
    this.addItem(this.ziekenhuis.get());
    this.addItem(this.ingreep.get());
    this.addItem(this.klachten_huishouden.get());
    this.addItem(this.klachten_opvang.get());
    this.addItem(this.klachten_omgeving.get());
    this.addItem(this.vacc_corona.get());
    this.addItem(this.vacc_corona_datum.get());
    this.addItem(this.vacc_griep.get());
    this.addItem(this.opleiding_ouder.get());
    this.addItem(this.resultaten.get());
    this.addItem(this.email.get());

    this.addItem(this.UV.get());
    this.addItem(this.FinalText.get());
  }
}



class intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'intro')
  }

  markdownContent = `
  ##### <span className="text-primary">Streptokids</span>
  
  Het Centrum Infectieziektebestrijding van het Rijksinstituut voor Volksgezondheid en Milieu (RIVM) doet onderzoek naar groep A streptokokken bij kinderen. De groep A streptokok (GAS) is een bacterie die een besmettelijke infectie kan veroorzaken. De meeste infecties door deze bacterie zijn niet ernstig, bijvoorbeeld krentenbaard of roodvonk. Soms kunnen mensen in korte tijd ernstig ziek worden door de streptokok. Dit heet een ‘invasieve GAS’ infectie. Op dit moment zien we meer kinderen met een invasieve GAS infectie dan normaal. Het RIVM onderzoekt hoe dat kan.
  U bent gevraagd door de GGD om mee te doen aan dit onderzoek omdat uw kind een invasieve GAS infectie heeft (gehad). Lees onderstaande informatie rustig door. Beslis daarna pas of u mee wil doen aan het onderzoek. Heeft u extra vragen? Stel ze aan de GGD of aan de RIVM onderzoekers via streptokids@rivm.nl. U kunt er ook eerst over praten met uw partner, vrienden of familie.
  
  ##### **Doel van het onderzoek**
  Het RIVM onderzoekt welke kinderen een grotere kans hebben op een invasieve GAS infectie. Dit onderzoek heet het ‘Streptokids onderzoek'. Wij hopen door dit onderzoek meer inzicht te krijgen in invasieve GAS infectie zodat kinderen in de toekomst minder ziek worden door een invasieve GAS infectie.
  
  ##### **Wat houdt meedoen in?**
  Wilt u meedoen aan het Streptokids onderzoek? Dan stellen wij u een paar vragen over uw kind en zijn/haar omgeving, zoals naar het kinderdagverblijf of school gaan. De antwoorden zullen ons helpen bij het onderzoek. Het invullen van deze vragenlijst duurt ongeveer 10 minuten. Meedoen aan het onderzoek is vrijwillig. 
  
  ##### **Gebruik van de gegevens van de GGD**
  Uw kind heeft een invasieve GAS infectie (gehad). Invasieve GAS infecties worden doorgegeven aan de GGD. Dit betekent dat een arts of laboratorium een invasieve GAS infectie meldt bij de GGD als bij iemand deze infectie is vastgesteld. De GGD kan daarna vragen welke personen in contact zijn geweest met de zieke persoon toen die besmettelijk was. De GGD kan deze personen antibiotica geven zodat ze niet ziek worden. De GGD meldt aan het RIVM dat iemand invasieve GAS heeft. Deze melding wordt opgeslagen in het Osiris systeem. In het Osiris systeem staan geen persoonsgegevens zoals naam of adres, maar wel een patiëntnummer. Dit noemen we het Osiris nummer. Als het goed is heeft u het Osiris nummer van uw kind gekregen van de GGD. Met dit Osiris nummer kunnen wij uw antwoorden op de Streptokids vragenlijst samenvoegen met de gegevens in het Osiris systeem. De gegevens in het Osiris systeem kunnen het onderzoek helpen. 
  
  ##### **Gebruik van de gegevens van het ziekenhuis**
  Als uw kind met een invasieve GAS infectie in het ziekenhuis heeft gelegen kunt u in sommige ziekenhuizen meedoen aan het infectiekids onderzoek (zie [*www.infectiekids.nl*](www.infectiekids.nl)). Het RIVM werkt samen met het infectiekids onderzoek.  De gegevens van het infectiekids onderzoek kunnen dit onderzoek helpen. Wij vragen u om toestemming om de  de Streptokids vragenlijst samen te voegen met de gegevens van het infectiekids onderzoek. 
  Het RIVM zal alleen uw gegevens  gebruiken als u hiervoor toestemming geeft. U kunt op elk moment stoppen met het onderzoek en hoeft niet te zeggen waarom. Uw ingevulde vragenlijstgegevens zullen dan verwijderd worden. Als u wilt stoppen, stuur dan een e-mail naar: streptokids@rivm.nl. Meer informatie vindt u in de [*privacyverklaring*](https://www.rivm.nl/privacy) van het RIVM.
  
  Geef hieronder aan of u toestemming geeft.
  
  Ik verklaar dat
  - Ik de [*privacyverklaring*](https://www.rivm.nl/privacy) van het RIVM heb gelezen,
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


  
export class consent_streptokids extends Item {
  
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'consent_streptokids');
    this.isRequired = isRequired;
  }
  
    buildItem() {
      return SurveyItems.singleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Ik wil meedoen aan dit wetenschappelijk onderzoek van het RIVM naar risicofactoren voor invasieve GAS infectie bij kinderen (Streptokids). Ik geef toestemming aan het RIVM om de gegevens van deze vragenlijst te gebruiken voor het Streptokids onderzoek."],
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
    
  class consent_infectiekids extends Item {
  
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'consent_infectiekids');
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
          ["nl", "Ik ben gevraagd door het ziekenhuis om mee te doen aan het infectiekids onderzoek (www.infectiekids.nl). Ik geef toestemming om de gegevens van het COPP-iGAS onderzoek samen te voegen met de gegevens van de Streptokids vragenlijst."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Ja. Ik heb na deelname met de COPP-iGAS een e-mail gekregen met een unieke code. Deze code is: "],
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


  export class osirisnummer extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'osirisnummer');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Als u van de GGD een Osiris-nummer heeft gekregen voor deze vragenlijst, kun u deze hier invullen:'],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '160px',
        inputLabel: new Map([
          ['nl', '8 cijfers']
        ]),
        labelBehindInput: true,
        componentProperties: {
          min: 10000000,
          max: 99999999
        }
      })
    }
  }
  
  export class datum_ziek extends Item {
    constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
      super(parentKey, 'datum_ziek');
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
          ["nl", "Op welke datum werd uw kind (ongeveer) ziek?"],
        ]),
        responseOptions: [
          {
            key: '1', role: 'dateInput',
            optionProps: {
              min: { dtype: 'num', num: 1672580978 }, //01-01-2023
              max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            content: new Map([
              ["nl", "Kies datum:"],
            ])
          },
        ],
      })
    }
  }
  

  export class demo_geboortejaar extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'demo_geboortejaar');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Wat is het geboortejaar van uw kind?'],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        inputLabel: new Map([
          ['nl', '']
        ]),
        labelBehindInput: true,
        componentProperties: {
          min: 2017,
          max: 2023
        }
      })
    }
  }
  
  export class demo_geslacht extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'demo_geslacht');
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
          ["nl", "Wat is het geslacht van uw kind?"],
        ]),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Man"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Vrouw"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Wil ik liever niet zeggen"],
            ])
          },
        ]
      })
    }
  }
  
  export class demo_postcode extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'demo_postcode');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Wat zijn de 4 cijfers van de postcode van het adres waar uw kind woont?'],
        ]),
        questionSubText: new Map([
          ["nl", "Als uw kind op meerdere adressen woont, vragen we het adres te kiezen waar uw kind het meest woont."],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        inputLabel: new Map([
          ['nl', '']
        ]),
        labelBehindInput: true,
        componentProperties: {
          min: 1000,
          max: 9999
        }
      })
    }
  }
  
  export class demo_huish_totaal extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'demo_huish_totaal');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Uit hoeveel personen bestaat het huishouden van uw kind in totaal? Reken het kind waarvoor u de vragenlijst invult ook mee.'],
        ]),
        questionSubText: new Map([
          ["nl", "Met huishouden bedoelen we alle mensen met wie uw kind in één huis woont. Als uw kind in meerdere huishoudens woont, vragen we het huishouden te kiezen waar uw kind het meest woont."],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        inputLabel: new Map([
          ['nl', '']
        ]),
        labelBehindInput: true,
        componentProperties: {
          min: 1,
          max: 99
        }
      })
    }
  }
  
  
  export class demo_huish_kinderen extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'demo_huish_kinderen');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Hoeveel kinderen (18 jaar of jonger) wonen er in totaal in dit huishouden? Reken het kind waarvoor u de vragenlijst invult ook mee.'],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        inputLabel: new Map([
          ['nl', '']
        ]),
        labelBehindInput: true,
        componentProperties: {
          min: 1,
          max: 99
        }
      })
    }
  }
  
  export class aandoeningen extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'aandoeningen');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Heeft uw kind een van de volgende door een dokter vastgestelde (chronische) aandoening? (meerdere antwoorden mogelijk)"],
        ]),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Suikerziekte (diabetes mellitus)"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Reuma"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Eczeem"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Psoriasis"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Astma/chronische bronchitis"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Hartaandoening"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Nieraandoening"],
            ])
          },
          {
            key: '8', role: 'option',
            content: new Map([
              ["nl", "Verzwakt afweersysteem door ziekte of behandeling (bijvoorbeeld door een autoimmuunziekte, kankerbehandeling of na een orgaanstransplantatie)"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Immuunstoornis"],
            ])
          },
          {
            key: '10', role: 'option',
            content: new Map([
              ["nl", "Nee, geen van bovenstaande"],
            ])
          },
        ]
      })
    }
  }
  
  export class medicijnen extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'medicijnen');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Heeft uw kind in de 4 weken vooraf ziekenhuisopname elke dag of elke week de volgende medicijnen gebruikt? Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS. (meerdere antwoorden mogelijk)"],
        ]),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Prednison"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Andere ontstekingsremmers"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Insuline"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Onderhoudsantibiotica (dit is antibiotica die uw kind op advies van de dokter langdurigere periode moet slikken)"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Maagzuurremmers"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Ibuprofen"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Inhalatiemedicatie (puffers)"],
            ])
          },
          {
            key: '8', role: 'input',
            content: new Map([
              ["nl", "Andere medicijnen, namelijk:"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Geen van bovenstaande"],
            ])
          },
        ]
      })
    }
  }
  
  export class kind_oppas extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'kind_oppas');
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
          ["nl", "Ging uw kind in de 4 weken voor ziekenhuisopname naar de oppas (bij iemand anders) thuis/gastouder? Indien ja, hoeveel dagen per week? Als het wisselend is, geef dan een gemiddelde aan."],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Aantal dag(en) per week:"],
            ])
          },
        ]
      })
    }
  }
  
  export class kind_opvang extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'kind_opvang');
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
          ["nl", "Ging uw kind in de 4 weken voor ziekenhuisopname naar de kinderdagopvang/peuterspeelzaal? Indien ja, hoeveel dagen per week? Als het wisselend is, geef dan een gemiddelde aan."],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Aantal dag(en) per week:"],
            ])
          },
        ]
      })
    }
  }
  
  export class kind_school extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'kind_school');
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
          ["nl", "Ging uw kind in de 4 weken voor ziekenhuisopname naar school? Indien ja, hoeveel dagen per week? Als het wisselend is, geef dan een gemiddelde aan."],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Aantal dag(en) per week:"],
            ])
          },
        ]
      })
    }
  }
  
  export class klachten_kind extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_kind');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Had uw kind in de 4 weken vooraf ziekenhuisopname last van: (meerdere antwoorden mogelijk)"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        helpGroupContent: this.getHelpGroupContent(),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Roodvonk"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Krentenbaard (impetigo)"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Waterpokken"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Keelontsteking"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Neusverkoudheid"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Keelpijn"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Benauwdheid"],
            ])
          },
          {
            key: '8', role: 'option',
            content: new Map([
              ["nl", "Hoesten"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Koorts (38 graden of meer)"],
            ])
          },
          {
            key: '10', role: 'option',
            content: new Map([
              ["nl", "Schurft (scabies)"],
            ])
          },
          {
            key: '11', role: 'option',
            content: new Map([
              ["nl", "Ontstoken wond(je) of huidontsteking"],
            ])
          },
          {
            key: '12', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
          {
            key: '13', role: 'input',
            content: new Map([
              ["nl", "Anders, namelijk:"],
            ])
          },
        ]
      })
    }
    getHelpGroupContent() {
      return [
        {
          content: new Map([
            ["nl", "Uitleg roodvonk"],
          ]),
          style: [{ key: 'variant', value: 'h5' }],
        },
        {
          content: new Map([
            ["nl", "Roodvonk is een kinderziekte die we vooral zien bij kinderen tussen 3 en 8 jaar. Uw kind heeft dan koorts, keelpijn en ruwe (rode) plekjes op de huid, en soms misselijkheid met overgeven. Ook kan de tong rood en bobbelig worden (frambozentong). Als uw kind weer beter wordt, kan de huid vervellen.)"],
          ]),
          style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
        },
      ]
    }
  }
  
  export class klachten_huisarts extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_huisarts');
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
          ["nl", "Indien uw kind een of meerdere van bovenstaande klachten had, is uw kind voor een deze klachten naar de huisarts geweest?"],
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
              ["nl", "Ja, 1-2 keer"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Ja, 3-4 keer"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Ja, meer dan 5 keer"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
  export class klachten_seh extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_seh');
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
          ["nl", "Indien uw kind een of meerdere van bovenstaande klachten had, is uw kind voor een deze klachten naar de Huisartsenpost of Spoedeisende Hulp geweest?"],
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
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
  export class antibiotica extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'antibiotica');
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
          ["nl", "Heeft uw kind de afgelopen 4 weken een antibioticakuur gebruikt? Zo ja, welke?"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Ja, antibiotica namelijk:"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
export class antibiotica_start extends Item {
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'antibiotica_start');
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
        ["nl", "Wanneer startte uw kind met de antibiotica?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'num', num: 1672580978 }, //01-01-2023
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["nl", "Kies datum:"],
          ])
        },
      ],
    })
  }
}

  export class ziekenhuis extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'ziekenhuis');
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
          ["nl", "Is uw kind in de 4 weken voor ziekenhuisopname vanwege iGAS, opgenomen geweest in het ziekenhuis voor een andere reden?"],
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
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
  export class ingreep extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'ingreep');
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
          ["nl", "Heeft uw kind de afgelopen 4 weken voor ziekenhuisopname een ingreep gehad, zoals het verwijderen van de neus- of keelamandelen?"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
          {
            key: '1', role: 'input',
            content: new Map([
              ["nl", "Ja, namelijk"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
  export class klachten_huishouden extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_huishouden');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Had iemand in uw huishouden in de 4 weken ziekenhuisopname van uw kind last van een van de volgende klachten? Reken hierbij het kind waarvoor u de vragenlijst invult niet mee. (meerdere antwoorden mogelijk)"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Roodvonk"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Krentenbaard (impetigo)"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Waterpokken"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Keelontsteking"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Neusverkoudheid"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Keelpijn"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Benauwdheid"],
            ])
          },
          {
            key: '8', role: 'option',
            content: new Map([
              ["nl", "Hoesten"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Koorts (38 graden of meer)"],
            ])
          },
          {
            key: '10', role: 'option',
            content: new Map([
              ["nl", "Schurft (scabies)"],
            ])
          },
          {
            key: '11', role: 'option',
            content: new Map([
              ["nl", "Ontstoken wond(je) of huidontsteking"],
            ])
          },
          {
            key: '12', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
          {
            key: '13', role: 'input',
            content: new Map([
              ["nl", "Anders, namelijk:"],
            ])
          },
        ]
      })
    }
  }
  
  export class klachten_opvang extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_opvang');
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Indien uw kind naar school/kinderopvang/peuterspeelzaal gaat, was er op de groep of in de klas van uw kind de afgelopen 4 weken voor ziekenhuisopname iemand die last had van: (meerdere antwoorden mogelijk)"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        helpGroupContent: this.getHelpGroupContent(),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Roodvonk"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Krentenbaard (impetigo)"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Waterpokken"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Keelontsteking"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Neusverkoudheid"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Keelpijn"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Benauwdheid"],
            ])
          },
          {
            key: '8', role: 'option',
            content: new Map([
              ["nl", "Hoesten"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Koorts (38 graden of meer)"],
            ])
          },
          {
            key: '10', role: 'option',
            content: new Map([
              ["nl", "Schurft (scabies)"],
            ])
          },
          {
            key: '11', role: 'option',
            content: new Map([
              ["nl", "Ontstoken wond(je) of huidontsteking"],
            ])
          },
          {
            key: '12', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
          {
            key: '13', role: 'input',
            content: new Map([
              ["nl", "Anders, namelijk:"],
            ])
          },
        ]
      })
    }
    getHelpGroupContent() {
      return [
        {
          content: new Map([
            ["nl", "Uitleg roodvonk"],
          ]),
          style: [{ key: 'variant', value: 'h5' }],
        },
        {
          content: new Map([
            ["nl", "Roodvonk is een kinderziekte die we vooral zien bij kinderen tussen 3 en 8 jaar. Uw kind heeft dan koorts, keelpijn en ruwe (rode) plekjes op de huid, en soms misselijkheid met overgeven. Ook kan de tong rood en bobbelig worden (frambozentong). Als uw kind weer beter wordt, kan de huid vervellen.)"],
          ]),
          style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
        },
      ]
    }
  }
  
  export class klachten_omgeving extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'klachten_omgeving');
      this.condition = condition;
      this.isRequired = isRequired;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ["nl", "Had iemand anders in de directe omgeving van uw kind (zoals opa, oma of vriendjes) in de afgelopen 4 weken voor ziekenhuisopname last van: (meerdere antwoorden mogelijk)"],
        ]),
        questionSubText: new Map([
          ["nl", "Is uw kind niet in het ziekenhuis opgenomen? Beantwoord dan de vraag over de 4 weken voordat uw kind ziek werd door iGAS."],
        ]),
        helpGroupContent: this.getHelpGroupContent(),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Roodvonk"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "Krentenbaard (impetigo)"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "Waterpokken"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "Keelontsteking"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "Neusverkoudheid"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Keelpijn"],
            ])
          },
          {
            key: '7', role: 'option',
            content: new Map([
              ["nl", "Benauwdheid"],
            ])
          },
          {
            key: '8', role: 'option',
            content: new Map([
              ["nl", "Hoesten"],
            ])
          },
          {
            key: '9', role: 'option',
            content: new Map([
              ["nl", "Koorts (38 graden of meer)"],
            ])
          },
          {
            key: '10', role: 'option',
            content: new Map([
              ["nl", "Schurft (scabies)"],
            ])
          },
          {
            key: '11', role: 'option',
            content: new Map([
              ["nl", "Ontstoken wond(je) of huidontsteking"],
            ])
          },
          {
            key: '12', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
          {
            key: '13', role: 'input',
            content: new Map([
              ["nl", "Anders, namelijk:"],
            ])
          },
        ]
      })
    }
    getHelpGroupContent() {
      return [
        {
          content: new Map([
            ["nl", "Uitleg roodvonk"],
          ]),
          style: [{ key: 'variant', value: 'h5' }],
        },
        {
          content: new Map([
            ["nl", "Roodvonk is een kinderziekte die we vooral zien bij kinderen tussen 3 en 8 jaar. Uw kind heeft dan koorts, keelpijn en ruwe (rode) plekjes op de huid, en soms misselijkheid met overgeven. Ook kan de tong rood en bobbelig worden (frambozentong). Als uw kind weer beter wordt, kan de huid vervellen.)"],
          ]),
          style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
        },
      ]
    }
  }
  
  export class vacc_corona extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'vacc_corona');
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
          ["nl", "Hoeveel vaccinaties tegen het coronavirus heeft uw kind gekregen?"],
        ]),
        responseOptions: [
          {
            key: '0', role: 'option',
            content: new Map([
              ["nl", "0"],
            ])
          },
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "1"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "2"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "3"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "4"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "5"],
            ])
          },
        ]
      })
    }
  }
  
  export class vacc_corona_datum extends Item {
    constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
      super(parentKey, 'vacc_corona_datum');
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
          ["nl", "Wanneer heeft uw kind de laatste vaccinatie tegen het coronavirus gekregen?"],
        ]),
        responseOptions: [
          {
            key: '1', role: 'dateInput',
            optionProps: {
              min: { dtype: 'num', num: 1609891200 }, //06-01-2021 
              max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
            },
            content: new Map([
              ["nl", "Kies datum:"],
            ])
          },
        ],
      })
    }
  }
  
  export class vacc_griep extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'vacc_griep');
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
          ["nl", "Heeft uw kind de griepvaccinatie gekregen in de winter van 2022/2023?"],
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
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }
  
  export class opleiding_ouder extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'opleiding_ouder');
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
          ["nl", "Wat is de hoogste opleiding van uzelf of van de andere ouder van het kind? Kies hier de hoogste opleiding van de ouder met het hoogste opleidingsniveau."],
        ]),
        responseOptions: [
          {
            key: '1', role: 'option',
            content: new Map([
              ["nl", "Ik heb geen officiële diploma's of alleen lager onderwijs"],
            ])
          },
          {
            key: '2', role: 'option',
            content: new Map([
              ["nl", "MAVO of VMBO"],
            ])
          },
          {
            key: '3', role: 'option',
            content: new Map([
              ["nl", "HAVO, VWO, of MBO"],
            ])
          },
          {
            key: '4', role: 'option',
            content: new Map([
              ["nl", "HBO of WO Bachelor"],
            ])
          },
          {
            key: '5', role: 'option',
            content: new Map([
              ["nl", "WO master of PhD (doctor)"],
            ])
          },
          {
            key: '6', role: 'option',
            content: new Map([
              ["nl", "Dat wil ik niet zeggen"],
            ])
          },
        ]
      })
    }
  }
  
  export class resultaten extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
      super(parentKey, 'resultaten');
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
          ["nl", "Wilt u de resultaten van het onderzoek weten?"],
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


class email extends Item {
  constructor(parentKey: string, condition: Expression, required: boolean) {
    super(parentKey, 'email');
    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Wat is je e-mailadres?'
      ]]),
      questionSubText: new Map([
        ["nl", "Uw e-mailadres wordt bewaard totdat de resultaten van het onderzoek bekend zijn. Het wordt niet voor andere doelen gebruikt. Na het versturen van de resultaten van het onderzoek wordt uw e-mailadres verwijderd."],
      ]),
      confidentialMode: "replace",
      transformLetterCaseTo: 'lower',
      placeholderText: new Map([['nl', 'XXXXXXXX@XXXXX.XX']]),
      customValidations: [{
        key: 'format',
        rule: SurveyEngine.checkResponseValueWithRegex(
          this.key, 'rg.ic',
          '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$'
        ),
        type: 'hard'
      }]  
    })
  }
}


export class UserVerificationQuestion extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'UV');
    
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Controlevraag'],
      ]),
      questionSubText: new Map([
        ['nl', 'Dit is een controlevraag om te bevestigen dat je geen robot bent. Typ het juiste antwoord in het antwoordveld hieronder.'],
      ]),
      responseItemDefs: [
        {
          key: 'uv', role: 'userVerification', mapToRole: 'input',
        }
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
        ["nl", "Hartelijk dank voor uw tijd."],
      ]),
      this.condition,
    )
  }
}

export const Case = new CaseDef();
