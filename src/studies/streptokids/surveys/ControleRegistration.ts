import { Group, Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { surveyKeys } from "../contants";
import { Expression, SurveySingleItem } from "survey-engine/data_types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { UserVerificationQuestion } from "./Case";

class ControleRegistrationDef extends SurveyDefinition {
  Intro: Intro;
  Email: Email;
  Consent: Consent;
  ChildCount: ChildCount;
  Kind1: ChildInfoGroup;
  Kind2: ChildInfoGroup;
  Kind3: ChildInfoGroup;
  Kind4: ChildInfoGroup;
  Kind5: ChildInfoGroup;
  UV: UserVerificationQuestion;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.ControleRegistration,
      name: new Map([
        ["nl", "Registratie als controle"],
      ]),
      description: new Map([
        ["nl", "Klik hier voor informatie en aanmelding RIVM-onderzoek naar streptokokkeninfecties bij kinderen."],
      ]),
      durationText: new Map([
        ["nl", "Invullen duurt hooguit 5 minuten."],
      ]),
      availableFor: 'public',
    });

    const isRequired = true;

    this.Intro = new Intro(this.key);
    this.Email = new Email(this.key, isRequired);
    this.Consent = new Consent(this.key, isRequired);

    this.ChildCount = new ChildCount(this.key, isRequired);

    this.Kind1 = new ChildInfoGroup(this.key, 'kind1', '## **Infos about kind 1**', isRequired, SurveyEngine.responseHasKeysAny(this.ChildCount.key, 'rg.ddg', '1', '2', '3', '4', '5'));
    this.Kind2 = new ChildInfoGroup(this.key, 'kind2', '## **Infos about kind 2**', isRequired, SurveyEngine.responseHasKeysAny(this.ChildCount.key, 'rg.ddg', '2', '3', '4', '5'));
    this.Kind3 = new ChildInfoGroup(this.key, 'kind3', '## **Infos about kind 3**', isRequired, SurveyEngine.responseHasKeysAny(this.ChildCount.key, 'rg.ddg', '3', '4', '5'));
    this.Kind4 = new ChildInfoGroup(this.key, 'kind4', '## **Infos about kind 4**', isRequired, SurveyEngine.responseHasKeysAny(this.ChildCount.key, 'rg.ddg', '4', '5'));
    this.Kind5 = new ChildInfoGroup(this.key, 'kind5', '## **Infos about kind 5**', isRequired, SurveyEngine.responseHasKeysAny(this.ChildCount.key, 'rg.ddg', '5'));

    this.UV = new UserVerificationQuestion(this.key, isRequired)
    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    this.addItem(this.Intro.get());
    this.addItem(this.Consent.get());
    this.addItem(this.Email.get());
    this.addItem(this.ChildCount.get());
    this.addItem(this.Kind1.get());
    this.addItem(this.Kind2.get());
    this.addItem(this.Kind3.get());
    this.addItem(this.Kind4.get());
    this.addItem(this.Kind5.get());
    this.addItem(this.UV.get());
    this.addItem(this.FinalText.get());
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro')
  }

  markdownContent = `
  ##### <span className="text-primary">IGASonderzoek</span>
  ### Informatie en aanmelding RIVM-onderzoek naar streptokokkeninfecties bij kinderen
  
  Het Centrum Infectieziektebestrijding van het Rijksinstituut voor Volksgezondheid en Milieu (RIVM) doet onderzoek naar groep A streptokokken bij kinderen. De groep A streptokok (GAS) is een bacterie die een besmettelijke ziekte kan veroorzaken. De meeste infecties door deze bacterie zijn niet ernstig, bijvoorbeeld roodvonk of krentenbaard. Soms kunnen mensen in korte tijd wel ernstig ziek worden door de streptokok. Dit heet een ‘invasieve GAS infectie’. Op dit moment en ook vorig jaar zien we meer kinderen met een invasieve GAS infectie dan normaal. Het RIVM onderzoekt hoe dat komt.
  
  Doel van het onderzoek
  Het RIVM onderzoekt welke kinderen een grotere kans hebben op een invasieve GAS infectie. Wij hopen door dit onderzoek meer inzicht te krijgen in invasieve GAS infecties zodat kinderen in de toekomst minder vaak ziek worden door een invasieve GAS infectie.
  
  Meedoen aan het onderzoek?
  Heeft u een kind in de leeftijd van 0 tot en met 5 jaar (geboren in of na 2017) en wilt u helpen met dit onderzoek? Dan kunt u zich hier opgeven. 
  Als u zich opgeeft, dan vragen wij u mogelijk in de komende maanden (uiterlijk in mei 2023) om één keer een vragenlijst in te vullen. Het invullen van de vragenlijst duurt ongeveer 10 minuten en is vrijwillig. We vragen dit aan ouders van kinderen zonder invasieve GAS infectie. Ouders van kinderen met een invasieve GAS infectie worden via hun GGD gevraagd om dezelfde vragenlijst in te vullen.
  
  Wilt u meedoen aan het onderzoek? Dan vragen we om de volgende informatie zodat wij uiterlijk in mei 2023 eventueel contact met u op kunnen nemen voor het onderzoek:
  *	Het geboortejaar van uw kind(eren) en maand indien uw kind geboren is in 2022.
  *	Het geslacht van uw kind(eren)
  *	Uw e-mailadres
  Op dit moment is geen verdere informatie nodig. Deze gegevens worden alleen gebruikt om geïnteresseerden voor ons onderzoek vast te stellen. Deze informatie kunt u in het volgende scherm invullen. U krijgt van ons bericht voor het einde van de studie, ook als u niet bent uitgenodigd om de vragenlijst in te vullen. 
  
  Wanneer wordt u uitgenodigd om de vragenlijst in te vullen?
  Wanneer er een kind ziek wordt door een invasieve GAS infectie, zullen wij een vragenlijst sturen naar ouders van een aantal kinderen van dezelfde leeftijd en hetzelfde geslacht. Daarom weten wij nu nog niet zeker of en wanneer we u de vragenlijst precies zullen sturen. Behalve uw e-mailadres en leeftijd en geslacht en uw kind(eren) vragen we daarom nu geen andere gegevens over u of uw kind. Het e-mailadres waar u zich mee opgeeft, gebruiken we om u tussen nu en eind mei 2023 uit te nodigen voor het invullen van de vragenlijst. Het e-mailadres wordt tot 1 jaar na het einde van het onderzoek bewaard en zal niet worden gebruikt voor andere doelen. 
   
  
  Gebruik van de gegevens van uw kind als u meedoet
  Als u zich opgeeft wordt u in de toekomst mogelijk gevraagd om een vragenlijst in te vullen. In de vragenlijst wordt gevraagd naar uw gezin, de gezondheid van uw kind, of uw kind bijvoorbeeld naar school of een kinderdagverblijf gaat, en of er mensen ziek waren in de omgeving. De antwoorden op deze vragen zullen tot 10 jaar na het invullen van de vragenlijst worden bewaard.
  Meedoen aan dit onderzoek is vrijwillig en u kunt op ieder moment stoppen met het onderzoek en uw persoonsgegevens laten verwijderen. Dat kan door een e-mail te sturen naar dit e-mailadres: igasonderzoek@rivm.nl. 
  
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

class ChildInfoGroup extends Group {
  header: header;
  geboortejaar: geboortejaar;
  geboortemaand: geboortemaand;
  geslacht: geslacht;

  constructor(parentKey: string, key: string, headerText: string, isRequired: boolean, condition: Expression) {
    super(parentKey, key);
    this.groupEditor.setCondition(condition);
    this.header = new header(this.key, headerText);
    this.geboortejaar = new geboortejaar(this.key, isRequired);
    this.geboortemaand = new geboortemaand(this.key,
      SurveyEngine.responseHasKeysAny(this.geboortejaar.key, 'rg.ddg', '2022', '2023'),
      isRequired);
    this.geslacht = new geslacht(this.key, isRequired);
  }

  buildGroup(): void {
    this.addItem(this.header.get())
    this.addItem(this.geboortejaar.get())
    this.addItem(this.geboortemaand.get())
    this.addItem(this.geslacht.get())
  }
}


class header extends Item {
  markdown: string;

  constructor(parentKey: string, text: string) {
    super(parentKey, 'header');
    this.markdown = text;
  }


  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          className: 'my-n3 mx-n2 mx-sm-n3 bg-white p-2 pb-1 ps-0 pt-3',
          content: new Map([
            ["nl", this.markdown],
          ]),
        })
      ]
    })
  }
}


class geboortejaar extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'geboortejaar');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat is het geboortejaar van uw kind?"],
      ]),
      responseOptions: [
        {
          key: '2017', role: 'option', content: new Map([
            ["nl", "2017"],
          ]),
        },
        {
          key: '2018', role: 'option', content: new Map([
            ["nl", "2018"],
          ]),
        },
        {
          key: '2019', role: 'option', content: new Map([
            ["nl", "2019"],
          ]),
        },
        {
          key: '2020', role: 'option', content: new Map([
            ["nl", "2020"],
          ]),
        },
        {
          key: '2021', role: 'option', content: new Map([
            ["nl", "2021"],
          ]),
        },
        {
          key: '2022', role: 'option', content: new Map([
            ["nl", "2022"],
          ]),
        },
        {
          key: '2023', role: 'option', content: new Map([
            ["nl", "2023"],
          ]),
        },
      ]
    })
  }
}


class ChildCount extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'ChildCount');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Het aantal kinderen dat u wilt opgeven:"],
      ]),
      questionSubText: new Map([
        ["nl", "U kunt dit formulier invullen voor 1 tot 5 kinderen, geboren in of na 2017."],
      ]),

      responseOptions: [
        {
          key: '1', role: 'option', content: new Map([
            ["nl", "1"],
          ]),
        },
        {
          key: '2', role: 'option', content: new Map([
            ["nl", "2"],
          ]),
        },
        {
          key: '3', role: 'option', content: new Map([
            ["nl", "3"],
          ]),
        },
        {
          key: '4', role: 'option', content: new Map([
            ["nl", "4"],
          ]),
        },
        {
          key: '5', role: 'option', content: new Map([
            ["nl", "5"],
          ]),
        },
      ]
    })
  }
}


class geboortemaand extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'geboortemaand');
    this.condition = condition;
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat is het geboortemaand van uw kind?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option', content: new Map([
            ["nl", "Januari"],
          ]),
        },
        {
          key: '2', role: 'option', content: new Map([
            ["nl", "Februari"],
          ]),
        },
        {
          key: '3', role: 'option', content: new Map([
            ["nl", "Maart"],
          ]),
        },
        {
          key: '4', role: 'option', content: new Map([
            ["nl", "April"],
          ]),
        },
        {
          key: '5', role: 'option', content: new Map([
            ["nl", "Mei"],
          ]),
        },
        {
          key: '6', role: 'option', content: new Map([
            ["nl", "Juni"],
          ]),
        },
        {
          key: '7', role: 'option', content: new Map([
            ["nl", "Juli"],
          ]),
        },
        {
          key: '8', role: 'option', content: new Map([
            ["nl", "Augustus"],
          ]),
        },
        {
          key: '9', role: 'option', content: new Map([
            ["nl", "September"],
          ]),
        },
        {
          key: '10', role: 'option', content: new Map([
            ["nl", "Oktober"],
          ]),
        },
        {
          key: '11', role: 'option', content: new Map([
            ["nl", "November"],
          ]),
        },
        {
          key: '12', role: 'option', content: new Map([
            ["nl", "December"],
          ]),
        },
      ]
    })
  }
}

export class geslacht extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'geslacht');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Het geslacht van mijn kind is"],
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
            ["nl", "Anders/wil ik liever niet zeggen"],
          ])
        },
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
        ['nl', 'Toestemmingsverklaring IGAS onderzoek'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
            Geef toestemming voor het verwerken van uw gegevens.
            `]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
        **Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

        Met het klikken op de onderstaande knop “Ik geef toestemming” geeft u geïnformeerde toestemming om deel te nemen aan het RIVM-onderzoek naar streptokokkeninfecties bij kinderen. Voor de verwerking van deze gegevens heeft het RIVM een grondslag, die volgt uit de AVG en de Wet op het RIVM. 
        Ook:
        
        •	Heb ik de informatie over het onderzoek en de [privacyverklaring] (https://www.rivm.nl/privacy) over het gebruiken van de persoonsgegevens door het RIVM goed gelezen en begrepen. Ik kon vragen stellen en indien ik vragen had zijn die voldoende beantwoord. Ik had genoeg tijd om te beslissen of ik meedoe. Als ik nog verdere vragen heb, kan ik contact opnemen met de onderzoekers van het RIVM per e-mail: igasonderzoek@rivm.nl
        •	Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder een reden te noemen, kan stoppen met het onderzoek en dat ik mijn toestemming voor deelname en/of van mijn kind(eren) kan intrekken. Ik weet dat ik dan ook kan verzoeken om reeds verzamelde gegevens te verwijderen. Dit kan door contact op te nemen met de onderzoekers van het RIVM per e-mail: igasonderzoek@rivm.nl
        •	Weet ik dat mijn e-mailadres tot 1 jaar na het einde van het onderzoek en de overige onderzoeksgegevens tot 10 jaar na het onderzoek worden bewaard.
        •	Verklaar ik dat ik ouder of voogd ben van het kind/de kinderen over wie de vragenlijst wordt ingevuld. 
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
        ["nl", "Ik wil me registreren."],
      ]),
      this.condition,
    )
  }
}

export const ControleRegistration = new ControleRegistrationDef();
