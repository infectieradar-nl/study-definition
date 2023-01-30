import { Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../contants";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { UserVerificationQuestion } from "./Case";

class ControleRegistrationDef extends SurveyDefinition {
  Intro: Intro;
  Age: Age;
  Email: Email;
  Consent: Consent;
  UV: UserVerificationQuestion;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.ControleRegistration,
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
    this.Age = new Age(this.key, isRequired);
    this.Email = new Email(this.key, isRequired);
    this.Consent = new Consent(this.key, isRequired);
    this.UV = new UserVerificationQuestion(this.key, isRequired)
    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    this.addItem(this.Intro.get());
    this.addItem(this.Age.get());
    this.addItem(this.Email.get());
    this.addItem(this.Consent.get());
    this.addItem(this.UV.get());
    this.addItem(this.FinalText.get());
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro')
  }

  markdownContent = `
##### <span className="text-primary">Streptokids</span>
### Join as control

Add some text about who should join the study, what will happen when they sign up here, etc.
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

class Age extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Age');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wat is de leeftijd van de persoon voor wie je deze melding doet?'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', 'jaar']
      ]),
      labelBehindInput: true,
      componentProperties: {
        min: 0,
        max: 120
      }
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
        ['nl', 'Aanvullende toestemming zelftest-onderzoek'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om deel te nemen aan het [zelftest-onderzoek](https://www.infectieradar.nl/about-selfteststudy) moeten we toestemming hebben om je adresgegevens te verwerken. Ook hebben we je toestemming nodig om de neus- en keelmonsters die je instuurt te testen in het laboratorium en op te slaan.
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

Door de knop “ik geef toestemming” aan te klikken stem je in met deelname aan het [zelftest-onderzoek van Infectieradar](https://www.infectieradar.nl/about-selfteststudy) en ga je akkoord dat het RIVM je gegevens voor dit onderzoek zal verwerken.

Het onderzoek is gericht op het in kaart brengen van gezondheidsklachten die kunnen wijzen op infectieziekten, zoals het coronavirus (COVID-19). Dit onderzoek is van belang om na te gaan of het aantal mensen met klachten toe- of afneemt en om de verspreiding van infectieziekten in de gaten te houden. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Infectieradar](/privacy).

Ook:
-	Heb ik de informatie op de website van Infectieradar over het [onderzoek](https://www.infectieradar.nl/about-selfteststudy) en de [privacyverklaring](https://www.infectieradar.nl/privacy) over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
-	Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
-	Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming. Na het stopzetten van de deelname zijn alleen nog mijn onderzoeksgegevens en eventueel ingezonden neus- en keelmonsters voor het onderzoek beschikbaar, de onderzoeksgegevens en monsters zijn dan echter niet meer te herleiden tot mij als persoon. Daarnaast gelden de bewaartermijnen, zoals opgegeven in de [privacyverklaring](https://www.infectieradar.nl/privacy), voor mijn overige persoonsgegevens.
-	Weet ik dat de onderzoeksgegevens van mijn eventuele neus- en keelmonster(s) tot 15 jaar na ontvangst bewaard kan worden en later nog voor een ander onderzoek kunnen worden gebruikt. En weet ik dat mijn contactgegevens en accountgegevens 2 jaar na de laatste inlog op Infectieradar of het (zelftest)portaal [GLEAN](https://rivmportal.glean.nl/) en mijn onderzoeksgegevens tot 15 jaar na het invullen van de vragenlijsten worden bewaard en dat onderzoeksgegevens kunnen worden gedeeld met de deelnemers aan het samenwerkingsverband Influenzanet. De onderzoeksresultaten hebben geen bewaartermijn en kunnen dus gepubliceerd blijven.
-	Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord), mijn contactgegevens (naam, adres, woonplaats, postcode, telefoonnummer), mijn onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder andere de eerste 4 cijfers van mijn postcode, mijn geboortejaar en maand, gegevens over mijn gezondheid en zelftest- en neus- en keelmonster-testuitslagen) en mijn eventuele neus- en keelmonster(s) worden verwerkt.
-	Weet ik dat voor het versturen van nieuwe zelftest- en neus- en keelmonster-afnamepakketjes mijn contactgegevens (naam, adres, woonplaats, postcode, telefoonnummer) worden gebruikt.
-	Weet ik dat voor het versturen van de testuitslag van mijn neus- en keelmonster mijn accountgegevens (e-mailadres) en mijn contactgegevens (telefoonnummer) worden gebruikt.
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


class FinalText extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'FinalText');
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ["nl", "I want to register in the control group."],
      ]),
      this.condition,
    )
  }
}

export const ControleRegistration = new ControleRegistrationDef();
