import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { surveyKeys } from '../../infectieradar/contants';
import { Expression } from 'survey-engine/data_types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { expWithArgs, generateLocStrings } from "case-editor-tools/surveys/utils/simple-generators";
import { responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";


class StreptoControlSample extends SurveyDefinition {

intro: intro;
studienummer: studienummer;
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
klachten_seh: klachten_seh;s
antibiotica: antibiotica;
antibiotica_start: antibiotica_start;
ziekenhuis: ziekenhuis;
klachten_huishouden: klachten_huishouden;
klachten_omgeving: klachten_omgeving;
vacc_corona: vacc_corona;
vacc_corona_datum: vacc_corona_datum;
vacc_griep: vacc_griep;
opleiding_ouder: opleiding_ouder;
resultaten: resultaten;
outtro: outtro;

  constructor() {
    super({
      surveyKey: surveyKeys.streptoControl,
      name: new Map([
        ['nl', 'Vragenlijst Streptokokken']
      ]),
      description: new Map([
        ['nl', 'Klik hier voor het invullen van de Streptokokken vragenlijst']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 10 minuten']
      ]),
    });

    const isRequired = true;

    this.intro = new intro(this.key, isRequired);
    this.studienummer = new this.studienummer(this.key, isRequired);
    this.demo_geboortejaar = new this.demo_geboortejaar(this.key, isRequired);
    this.demo_geslacht = new this.demo_geslacht(this.key, isRequired);
    this.demo_postcode = new this.demo_postcode(this.key, isRequired);
    this.demo_huish_totaal = new this.demo_huish_totaal(this.key, isRequired);
    this.demo_huish_kinderen = new this.demo_huish_kinderen(this.key, isRequired);
    this.aandoeningen = new this.aandoeningen(this.key, isRequired);
    this.medicijnen = new this.medicijnen(this.key, isRequired);
    this.kind_oppas = new this.kind_oppas(this.key, isRequired);
    this.kind_opvang = new this.kind_opvang(this.key, isRequired);
    this.kind_school = new this.kind_school(this.key, isRequired);
    this.klachten_kind = new this.klachten_kind(this.key, isRequired);
    this.klachten_huisarts = new this.klachten_huisarts(this.key,
      SurveyEngine.singleChoice.any(this.klachten_kind.key, '1', '2', '3', '4','5','6','7','8','9', '10', '11'), isRequired);
    this.klachten_seh = new this.klachten_seh(this.key,
      SurveyEngine.singleChoice.any(this.klachten_kind.key, '1', '2', '3', '4','5','6','7','8','9', '10', '11'), isRequired);
    this.antibiotica = new this.antibiotica(this.key, isRequired);
    this.antibiotica_start = new this.antibiotica_start(this.key,
      SurveyEngine.singleChoice.any(this.antibiotica.key, '1'), isRequired);
    this.ziekenhuis = new this.ziekenhuis(this.key, isRequired);
    this.klachten_huishouden = new this.klachten_huishouden(this.key, isRequired);
    this.klachten_omgeving = new this.klachten_omgeving(this.key, isRequired);
    this.vacc_corona = new this.vacc_corona(this.key, isRequired);
    this.vacc_corona_datum = new this.vacc_corona_datum(this.key,
      SurveyEngine.singleChoice.any(this.vacc_corona.key, '1', '2', '3', '4','5'), isRequired);
    this.vacc_griep = new this.vacc_griep(this.key, isRequired);
    this.opleiding_ouder = new this.opleiding_ouder(this.key, isRequired);
    this.resultaten = new this.resultaten(this.key, isRequired);
    this.outtro = new this.outtro(this.key, isRequired);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.intro.get());
    this.addItem(this.studienummer.get());
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
    this.addItem(this.klachten_huishouden.get());
    this.addItem(this.klachten_omgeving.get());
    this.addItem(this.vacc_corona.get());
    this.addItem(this.vacc_corona_datum.get());
    this.addItem(this.vacc_griep.get());
    this.addItem(this.opleiding_ouder.get());
    this.addItem(this.resultaten.get());
    this.addItem(this.outtro.get());
  }
}


export class intro extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'intro');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Deelname onderzoek groep A streptokokken bij kinderen"],
      ]),
      // titleClassName: 'd-none',
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'fw-bold mb-2',
          content: new Map([
            ['nl',
              `
Het Centrum Infectieziektebestrijding van het Rijksinstituut voor Volksgezondheid en Milieu (RIVM) doet onderzoek naar groep A streptokokken bij kinderen. De groep A streptokok (GAS) is een bacterie die een besmettelijke infectie kan veroorzaken. De meeste infecties door deze bacterie zijn niet ernstig, bijvoorbeeld krentenbaard of roodvonk. Soms kunnen mensen in korte tijd ernstig ziek worden door de streptokok. Dit heet een ‘invasieve GAS’ infectie. Op dit moment zien we meer kinderen met een invasieve GAS infectie dan normaal. Het RIVM onderzoekt hoe dat kan.

Doel van het onderzoek
Het RIVM onderzoekt welke kinderen een grotere kans hebben op een invasieve GAS infectie.  Wij hopen door dit onderzoek meer inzicht te krijgen in invasieve GAS infectie zodat kinderen in de toekomst minder ziek worden door een invasieve GAS infectie.

Wat houdt meedoen in?
Wilt u meedoen aan het onderzoek? Dan stellen wij u een paar vragen over uw kind en zijn/haar omgeving. De antwoorden zullen ons helpen bij het onderzoek. Het invullen van deze vragenlijst duurt ongeveer 10 minuten. Meedoen aan het onderzoek is vrijwillig. 

Gebruik van de gegevens van uw kind
Het RIVM mag alleen de gegevens van de vragenlijst gebruiken indien u hiervoor toestemming geeft. U heeft al toestemming gegeven om mee te doen aan dit onderzoek, waarvoor hartelijk dank. Door deze vragenlijst in te vullen stemt u in met het gebruiken van de antwoorden voor dit onderzoek. De vragenlijst is anoniem. Dit betekent dat het RIVM niet terug kan vinden door wie deze vragenlijst is ingevuld. 

Meedoen aan dit onderzoek is vrijwillig en u kunt op ieder moment vragen om uw gegevens te laten verwijderen. Dat kan door een e-mail te sturen naar: streptokids@rivm.nl. Meer informatie vindt u in de privacyverklaring van het RIVM.

Als u aan het einde van het onderzoek de resultaten wilt weten, kunt u onderaan de vragenlijst laten weten. `
            ]])
        })
      ],
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Verder"],
          ])
        },
      ]
    })
  }
}

export class studienummer extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'studienummer');
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
        ["nl", "Wat is het studienummer van uw kind? U vindt het studienummer in de uitnodigingsmail voor het onderzoek van het RIVM."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'numberInput',
          // style: [{ key: 'className', value: 'w-100' }],
          content: new Map([
            ["nl", "Studienummer"],
          ]),
          optionProps: { min: 200000000, max: 300000000 } //range?
        },       
      ]
    })
  }
}

export class demo_geboortejaar extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'demo_geboortejaar');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat is het geboortejaar van uw kind?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'numberInput',
          content: new Map([
            ["nl", "Geboortejaar"],
          ]),
          optionProps: { min: 2010, max: 2030 } //range?
        },
      ],
    })
  }
}

export class demo_geslacht extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'demo_geslacht');
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
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'demo_postcode');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat zijn de 4 cijfers van de postcode van het adres waar uw kind woont? Als uw kind op meerdere adressen woont, vragen we het adres te kiezen waar uw kind het meest woont."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          // style: [{ key: 'className', value: 'w-100' }],
          content: new Map([
            ["nl", "Postcode"],
          ]),
          description: new Map([
            ["nl", "de eerste vier cijfers"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'r2',
          type: 'hard',
          rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', this.key, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', this.key, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9][0-9][0-9]$'),
            expWithArgs('responseHasKeysAny', this.key, [responseGroupKey, singleChoiceKey].join('.'), '1')
          )
        }
      ],
      bottomDisplayCompoments: [
        {
          role: 'error',
          content: generateLocStrings(new Map([
            ["nl", "Voer de eerste vier cijfers van je postcode in"],
          ])),
          displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
        }
      ]
    })
  }
}


export class demo_huish_totaal extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'demo_huish_totaal');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Uit hoeveel personen bestaat het huishouden van uw kind in totaal? Reken het kind waarvoor u de vragenlijst invult ook mee. Met huishouden bedoelen we alle mensen met wie uw kind in één huis woont. Als uw kind in meerdere huishoudens woont, vragen we het huishouden te kiezen waar uw kind het meest woont."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          // style: [{ key: 'className', value: 'w-100' }],
          content: new Map([
            ["nl", "Aantal personen huishouden"],
          ]),
        },
      ],
      customValidations: [
        {
          key: 'r2',
          type: 'hard',
          rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', this.key, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', this.key, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9]$'),
            expWithArgs('responseHasKeysAny', this.key, [responseGroupKey, singleChoiceKey].join('.'), '1')
          )
        }
      ],
    })
  }
}


export class demo_huish_kinderen extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'demo_huish_kinderen');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Hoeveel kinderen (18 jaar of jonger) wonen er in totaal in dit huishouden? Reken het kind waarvoor u de vragenlijst invult ook mee."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          // style: [{ key: 'className', value: 'w-100' }],
          content: new Map([
            ["nl", "Aantal personen huishouden"],
          ]),
        },
      ],
      customValidations: [
        {
          key: 'r2',
          type: 'hard',
          rule: expWithArgs('or',
            expWithArgs('not', expWithArgs('hasResponse', this.key, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', this.key, [responseGroupKey, singleChoiceKey, '0'].join('.'), '^[0-9][0-9]$'),
            expWithArgs('responseHasKeysAny', this.key, [responseGroupKey, singleChoiceKey].join('.'), '1')
          )
        }
      ],
    })
  }
}

export class aandoeningen extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'aandoeningen');
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
        ["nl", "Heeft uw kind de afgelopen 4 weken elke dag of elke week de volgende medicijnen gebruikt? (meerdere antwoorden mogelijk)"],
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
            ["nl", "Insuline Onderhoudsantibiotica (dit is antibiotica die uw kind op advies van de dokter langdurigere periode moet slikken)"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Maagzuurremmers"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ibuprofen"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Inhalatiemedicatie (puffers)"],
          ])
        },
        {
          key: '7', role: 'input',
          content: new Map([
            ["nl", "Andere medicijnen, namelijk:"],
          ])
        },
        {
          key: '8', role: 'option',
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
        ["nl", "Ging uw kind de afgelopen 4 weken naar de oppas?"],
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
            ["nl", "Aantal dagen per week:"],
          ])
        },
       ]
    })
  }
}

export class kind_opvang extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'kind_opvang');
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
        ["nl", "Ging uw kind de afgelopen 4 weken naar de kinderdagopvang?"],
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
            ["nl", "Aantal dagen per week:"],
          ])
        },
       ]
    })
  }
}

export class kind_school extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'kind_school');
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
        ["nl", "Ging uw kind de afgelopen 4 weken naar school?"],
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
            ["nl", "Aantal dagen per week:"],
          ])
        },
       ]
    })
  }
}


export class klachten_kind extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'klachten_kind');
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
        ["nl", "Had uw kind in de afgelopen 4 weken last van (meerdere antwoorden mogelijk):"],
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
        ["nl", "Heeft uw kind de afgelopen 4 weken een antibioticakuur gebruikt? Zo ja, welke?"],
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
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) }, //Offset checken
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
        ["nl", "Is uw kind in de afgelopen 4 weken opgenomen (geweest) in het ziekenhuis?"],
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


export class klachten_huishouden extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'klachten_huishouden');
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
        ["nl", "Had iemand in uw huishouden in de afgelopen 4 weken last van een van de volgende klachten? Reken hierbij het kind waarvoor u de vragenlijst invult niet mee. (meerdere antwoorden mogelijk)"],
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


export class klachten_omgeving extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'klachten_omgeving');
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
        ["nl", "Had iemand anders in de directe omgeving van uw kind (zoals opa, oma of vriendjes) in de afgelopen 4 weken last van een van de volgende klachten? (meerdere antwoorden mogelijk)"],
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


export class vacc_corona extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'vacc_corona');
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
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) }, //Offset checken
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

export class outtro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'outtro');
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ["nl", "Hartelijk dank voor het invullen van de vragenlijst."],
      ]),
      this.condition,
    )
  }
}

export const streptoControl = new StreptoControlSample();
