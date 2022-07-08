import { ClozeItemTypes, SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { generateLocStrings } from "case-editor-tools/surveys/utils/simple-generators";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { surveyKeys } from "../contants";

class SwabEntryDef extends SurveyDefinition {
  Intro: Intro;
  CodeVal: CodeValQuestion;
  Consent: Consent;
  Name: Name;
  Addr: Address;
  Tel: Telephone;
  Email: Email;


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


    this.Intro = new Intro(this.key);
    this.CodeVal = new CodeValQuestion(this.key, true);
    this.Consent = new Consent(this.key, true);
    this.Name = new Name(this.key, true);
    this.Addr = new Address(this.key, true);
    this.Tel = new Telephone(this.key, true);
    this.Email = new Email(this.key, true);
  }

  buildSurvey(): void {
    this.addItem(this.Intro.get());
    this.addItem(this.CodeVal.get());
    this.addItem(this.Consent.get());
    this.addItem(this.Name.get());
    this.addItem(this.Addr.get());
    this.addItem(this.Tel.get());
    this.addItem(this.Email.get());
  }
}

class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  markdownContent = `
## Self swabbing study

TODO: describe here shortly what this is about, and who should enter
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
          items: [
            {
              key: 'success', role: 'text', content: generateLocStrings(new Map([
                ['nl', 'TODO: valid code, please proceed']
              ]))
            },
            {
              key: 'wrong', role: 'text', content: generateLocStrings(new Map([
                ['nl', 'TODO: wrong code, check your input']
              ]))
            }
          ]
        }
      ]
    })
  }
}

class Consent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Consent');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.consent({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'TODO: title for consent question'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
TODO: current text copied from tekenradar

Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
*We vragen ook om toestemming bij het aanmaken van een account. Omdat meerdere personen/profielen gebruik kunnen maken van hetzelfde account, is het nodig om hier voor dit profiel apart toestemming te geven.*
`]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
**Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

Via Tekenradar.nl wordt onderzocht hoe vaak mensen na een tekenbeet een erythema migrans (rode ring of vlek op de huid) of een andere vorm van de ziekte van Lyme krijgen, en hoe vaak dit leidt tot (ernstige) gezondheidsklachten. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Door onderaan de knop “Ja, ik geef toestemming” aan te klikken stem ik in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga ik akkoord dat het RIVM en/of samenwerkingspartners mijn gegevens voor dit onderzoek zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
- Verklaar ik dat ik 16 jaar of ouder ben, of dat ik de ouder/voogd ben van een kind minder dan 16 jaar oud waarover deze melding gaat (als er twee ouders/voogden zijn moeten zij beiden met deelname instemmen, en bij een kind van 12 t/m 15 jaar moet ook het kind zelf instemmen met deelname aan het onderzoek).
        `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "Ik doe toch niet mee"],
      ]),
    })
  }
}

class Name extends Item {

  optionKeys = {
    forename: 'vn',
    surname: 'an'
  }


  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Name');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Naam'
      ]]),
      confidentialMode: "replace",
      items: [
        ClozeItemTypes.text({ key: 't1', content: new Map([['nl', 'Voornaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.forename, className: 'flex-grow-1', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't2', content: new Map([['nl', 'Achternaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.surname, className: 'flex-grow-1', alignText: 'start' }),
      ],
      customValidations: [
        {
          key: 'Name', rule: SurveyEngine.logic.and(
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.forename}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.surname}`),
          ), type: 'hard'
        }
      ]
    })
  }
}

class Address extends Item {
  optionKeys = {
    nameOffice: 'pn',
    nameDoc: 'nh',
    place: 'plaats'
  }

  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Addr');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'TODO: your postal address to send the kit to'
      ]]),
      confidentialMode: "replace",
      responseItemDefs: [
        {
          key: 'addr', role: 'address',
          items: [
            {
              key: 'street', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'TODO: street label']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'TODO: street placeholder']
              ]))
            },
            {
              key: 'nr', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'TODO: nr label']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'TODO: nr placeholder']
              ]))
            },
            {
              key: 'zip', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'TODO: zip label']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'TODO: zip placeholder']
              ]))
            },
            {
              key: 'city', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'TODO: city label']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'TODO: city placeholder']
              ]))
            },
          ]
        }
      ]
    })
  }
}

class Email extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Email');

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
        'nl', 'Email'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', 'voer je e-mailadres in']])
    })
  }
}

class Telephone extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Tel');

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
        'nl', 'Mijn telefoonnummer'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', 'voer je telefoonnummer in']])
    })
  }
}

export const SwabEntry = new SwabEntryDef();
