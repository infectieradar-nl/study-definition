import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ClozeItemTypes, SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { generateLocStrings } from "case-editor-tools/surveys/utils/simple-generators";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { surveyKeys } from "../contants";
import { ParticipantFlags } from "../participantFlags";

class SwabEntryDef extends SurveyDefinition {
  Intro: Intro;
  CodeVal: CodeValQuestion;
  Consent: Consent;
  Infos: Infos;
  Name: Name;
  Addr: Address;
  Tel: Telephone;
  TelConfirm: TelephoneConfirm;
  Email: Email;
  EmailConfirm: EmailConfirm;


  constructor() {
    super({
      surveyKey: surveyKeys.SwabEntry,
      name: new Map([
        ["en", "Register for Testing in Infectieradar"],
        ["nl", "Aanmelden voor Testen in Infectieradar"],
      ]),
      description: new Map([
        ["en", "Clcik here to participate in selftests"],
        ["nl", "Klik hier om je aan te melden voor het ontvangen van zelftesten."],
      ]),
      durationText: new Map([
        ["en", "Fill in your personal details so we can send you the tests, and you can see testresults."],
        ["nl", "Laat je gegevens achter zodat we je de testen kunnen toesturen, en je je uitslag kan inzien."],
      ])
    });


    this.Intro = new Intro(this.key);
    this.CodeVal = new CodeValQuestion(this.key, true, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue(
        ParticipantFlags.selfSwabbing.key,
        ParticipantFlags.selfSwabbing.values.invitedWithoutCode,
      ),
    ));
    this.Consent = new Consent(this.key, true);

    const showContactQuestions = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(
        ParticipantFlags.selfSwabbing.key,
        ParticipantFlags.selfSwabbing.values.invitedWithoutCode,
      ),
      SurveyEngine.hasResponse(this.CodeVal.key, 'rg.cv')
    );
    this.Infos = new Infos(this.key, showContactQuestions);
    this.Name = new Name(this.key, true, showContactQuestions);
    this.Addr = new Address(this.key, true, showContactQuestions);
    this.Tel = new Telephone(this.key, true, showContactQuestions);
    this.TelConfirm = new TelephoneConfirm(this.key, true, this.Tel.key, showContactQuestions);
    this.Email = new Email(this.key, true, showContactQuestions);
    this.EmailConfirm = new EmailConfirm(this.key, true, this.Email.key, showContactQuestions);
  }

  buildSurvey(): void {
    this.addItem(this.Intro.get());
    this.addItem(this.CodeVal.get());
    this.addItem(this.Consent.get());
    this.addItem(this.Infos.get());
    this.addItem(this.Name.get());
    this.addItem(this.Addr.get());
    this.addItem(this.Tel.get());
    this.addItem(this.TelConfirm.get());
    this.addItem(this.Email.get());
    this.addItem(this.EmailConfirm.get());
  }
}

class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  markdownContent = `
## Testen met Infectieradar
Om Corona beter in de gaten te houden en meer te weten welke andere ziekteverwekkers ook klachten veroorzaken vragen we een geselecteerde groep deelnemers coronazelftesten uit te voeren. Soms vragen we ook om een neus- en keelmonster. Dit neus- en keelmonster wordt in het laboratorium onderzocht voor corona (ook het variant) en andere ziekteverwekkers (bijvoorbeeld griep of een ander coronavirus).
Deelnemers aan dit aanvullend onderzoek zijn uitgenodigd per brief en ontvangen gratis coronazelftesten en krijgen een uitslag van de neus- en keeltesten.

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

class Infos extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'Infos');
    this.condition = condition;
  }

  markdownContent = `
## Naam, adres, e-mail en 06-nummer
Voor het versturen en ontvangen van testen gebruikt het RIVM een [zelftestportaal](https://rivmportal.glean.nl/user/auth). Dit is een aparte website waar je extra testen kunt bestellen en je uitslag kan inzien.
Dit [zelftestportaal](https://rivmportal.glean.nl/user/auth) staat los van de Infectieradarwebsite en maakt gebruik van een inlogprocedure met e-mail en SMS.
Daarom vragen we hieronder je naam/adres/e-mail en 06-nummer achter te laten. De testen ontvang je dan automatisch in enkele weken.
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
  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'CodeVal');
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Controleren van de code bovenaan je uitnodigingsbrief'],
      ]),
      questionSubText: new Map([
        ['nl', 'Voer hier de code in'],
      ]),
      responseItemDefs: [
        {
          key: 'cv', role: 'entryCodeValidation', mapToRole: 'input',
          items: [
            {
              key: 'success', role: 'text', content: generateLocStrings(new Map([
                ['nl', 'Code is juist, ga verder']
              ]))
            },
            {
              key: 'wrong', role: 'text', content: generateLocStrings(new Map([
                ['nl', 'Deze code is niet gevonden (controleer) of deze code is al eens gebruikt']
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
        ['nl', 'Aanvullende toestemming'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om testen te ontvangen moeten we toestemming hebben om je adresgegevens te verwerken. Ook hebben we je toestemming nodig om de neus- en keelmonsters die je instuurt te testen in het laboratorium en op te slaan.
Vink hieronder "Toestemming geven" aan om de toestemmingsverklaring te lezen.
`]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
**Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

Door de knop “ik geef toestemming” aan te klikken stem je in met deelname aan het aanvullende testonderzoek van Infectieradar en ga je akkoord dat het RIVM je gegevens voor dit onderzoek zal verwerken .

Het onderzoek is gericht op het in kaart brengen van gezondheidsklachten die kunnen wijzen op infectieziekten, zoals het coronavirus. Dit onderzoek is van belang om na te gaan of het aantal mensen met klachten toe- of afneemt en om de verspreiding van infectieziekten in de gaten te houden. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Infectieradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Ook:
-	Heb ik de informatie op de website van Infectieradar over het onderzoek en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf) over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
-	Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
-	Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming. Na het stopzetten van de deelname zijn alleen nog mijn onderzoeksgegevens en eventueel ingezonden neus- en keelmonsters voor het onderzoek beschikbaar, de onderzoeksgegevens en monsters zijn dan echter niet meer te herleiden tot mij als persoon. Daarnaast gelden de bewaartermijnen, zoals opgegeven in de privacyverklaring, voor mijn overige persoonsgegevens.
-	Weet ik dat de onderzoeksgegevens van mijn eventuele neus- en keelmonster(s) tot 15 jaar na ontvangst bewaard kan worden en later nog voor een ander onderzoek gebruikt kan worden. En weet ik dat mijn contactgegevens en accountgegevens 2 jaar na de laatste inlog op de websites van het RIVM zelftestportaal en mijn onderzoeksgegevens tot 30 jaar na het invullen van de vragenlijsten worden bewaard en dat onderzoeksgegevens kunnen worden gedeeld met de deelnemers aan het samenwerkingsverband Influenzanet. De onderzoeksresultaten hebben geen bewaartermijn en kunnen dus gepubliceerd blijven.
-	Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord), mijn contactgegevens (naam, adres, woonplaats, postcode, telefoonnummer), mijn onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder andere de eerste 4 cijfers van mijn postcode, mijn geboortejaar en maand, gegevens over mijn gezondheid en zelftest- en zelfswab-uitslagen) en mijn eventuele neus- en keelmonster(s) worden verwerkt.
-	Weet ik dat voor het versturen van nieuwe zelftesten en neus- en keelmonster(s) mijn accountgegevens (e-mailadres en wachtwoord) en mijn contactgegevens (naam, adres, woonplaats, postcode, telefoonnummer) worden gebruikt.
-	Weet ik dat voor het versturen van de testuitslag van mijn neus- en keelmonster(s) mijn accountgegevens (e-mailadres) en mijn contactgegevens (naam, telefoonnummer) worden gebruikt.
-	Verklaar ik dat ik 16 jaar of ouder ben.
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
        'nl', 'Wat is je naam?'
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
        'nl', 'Wat is je adres?'
      ]]),
      confidentialMode: "replace",
      responseItemDefs: [
        {
          key: 'addr', role: 'address',
          items: [
            {
              key: 'street', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'Straatnaam']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'Straatnaam']
              ]))
            },
            {
              key: 'nr', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'Nummer (en toevoegingen)']
              ])),
              description: generateLocStrings(new Map([
                ['nl', '##ab']
              ]))
            },
            {
              key: 'zip', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'Postcode']
              ])),
              description: generateLocStrings(new Map([
                ['nl', '1234 AB']
              ]))
            },
            {
              key: 'city', role: 'text',
              content: generateLocStrings(new Map([
                ['nl', 'Woonplaats']
              ])),
              description: generateLocStrings(new Map([
                ['nl', 'Woonplaats']
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
        'nl', 'Wat is je e-mailadres?'
      ]]),
      confidentialMode: "replace",
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

class EmailConfirm extends Item {
  emailRefKey: string;

  constructor(parentKey: string, required: boolean, emailRefKey: string, condition?: Expression) {
    super(parentKey, 'EmailConfirm');

    this.condition = condition;
    this.isRequired = required;
    this.emailRefKey = emailRefKey;
  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Voer je e-mailadres nogmaals in.'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', 'XXXXXXXX@XXXXX.XX']]),
      customValidations: [{
        key: 'equals',
        rule: SurveyEngine.compare.eq(
          SurveyEngine.getResponseValueAsStr(this.key, 'rg.ic'),
          SurveyEngine.getResponseValueAsStr(this.emailRefKey, 'rg.ic'),
        ),
        type: 'hard'
      }]

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
        'nl', 'Wat is je 06-nummer? (gebruik de internationale notatie: +316nummer)'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', '+316########']]),
      customValidations: [{
        key: 'format',
        rule: SurveyEngine.checkResponseValueWithRegex(
          this.key,
          'rg.ic',
          '^((\\+316){1}[1-9]{1}[0-9]{7})|((\\+324){1}[1-9]{1}[0-9]{7})|((\\+336){1}[1-9]{1}[0-9]{7,9})|((\\+337){1}[1-9]{1}[0-9]{7,9})|((\\+4915){1}[0-9]{7,9})|((\\+4916){1}[0-9]{7,9})|((\\+4917){1}[0-9]{7,9})|((\\+44){1}[0-9]{7,11})$'
        ),
        type: 'hard'
      }]
    })
  }
}

class TelephoneConfirm extends Item {
  telRefKey: string;

  constructor(parentKey: string, required: boolean, telRefKey: string, condition?: Expression) {
    super(parentKey, 'TelConfirm');

    this.telRefKey = telRefKey;
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
        'nl', 'Voer je 06-nummer nogmaals in.'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', '+316########']]),
      customValidations: [{
        key: 'equals',
        rule: SurveyEngine.compare.eq(
          SurveyEngine.getResponseValueAsStr(this.key, 'rg.ic'),
          SurveyEngine.getResponseValueAsStr(this.telRefKey, 'rg.ic'),
        ),
        type: 'hard'
      }]
    })
  }
}

export const SwabEntry = new SwabEntryDef();
