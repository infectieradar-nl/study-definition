import { Expression } from "survey-engine/data_types";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { ParticipantFlags } from "../participantFlags";


export class Q1aNL extends Item {
  optionKeys = {
    selfTest: '3',
    pcr: '1',
    blood: '2',
    no: '0',
  }

  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1aNL');
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    const optionDisabled = SurveyEngine.multipleChoice.any(
      this.key, this.optionKeys.no
    );

    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "Did you receive a corona test result since the last survey? (positive or negative?"],
        ["nl", "Heb je sinds de vorige vragenlijst een testuitslag (positief of negatief) gehad voor COVID-19? (Meerdere antwoorden mogelijk)"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["en", "No, I did not receive a test result"],
            ["nl", "Nee, ik heb geen testuitslag gehad"],
          ])
        },
        {
          key: this.optionKeys.selfTest, role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["en", "Yes, I received the result of a self-test"],
            ["nl", "Ja, ik heb een testuitslag gehad voor een zelftest"],
          ])
        },
        {
          key: this.optionKeys.pcr, role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["en", "Yes, I received the result of a throat/nose swap (PCR)"],
            ["nl", "Ja, ik heb een testuitslag gehad voor een keel/neus slijmvliestest (PCR/sneltest, geen zelftest)"],
          ])
        },
        {
          key: this.optionKeys.blood, role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["en", "Yes, I received the result of a bloodtest (antibodytest)"],
            ["nl", "Ja, ik heb een testuitslag gehad voor een bloedtest"],
          ])
        },
      ],
    })
  }
}


export class Q2title extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'Q2title');
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.text({
          content: new Map([
            ["en", "The following questions are about the self-test"],
            ["nl", "De volgende vragen gaan over de zelftest"],
          ])
        })
      ]
    })
  }
}



export class Q1kNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1kNL');
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
        ["en", "How many self tests did you take since the last questionnaire?"],
        ["nl", "Hoeveel zelftesten heb je sinds de vorige vragenlijst gedaan?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "1"],
            ["nl", "1"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "2"],
            ["nl", "2"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "3"],
            ["nl", "3"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["en", "More than 3"],
            ["nl", "Meer dan 3"],
          ])
        },
      ]
    })
  }
}

export class Q1b3NL extends Item {
  optionKeys = {
    positive: '1',
    negative: '2',
  }

  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1b3NL');
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
        ["en", "What was your self-test result?"],
        ["nl", "Wat was de uitslag van de zelftest? Wanneer je meerdere zelftesten hebt gedaan en één daarvan was positief, vul dan hier 'positief' in."],
        ["fr", " Quel a été votre température mesurée la plus élevée?"],
      ]),
      bottomDisplayCompoments: [ComponentGenerators.markdown({
        content: new Map([
          ["nl", `
Vul het formulier helemaal in om uit te vinden of je een neus- en keelmonster moet uitvoeren.
`],
        ]),
        displayCondition: SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.key, this.optionKeys.negative, this.optionKeys.positive),
          SurveyEngine.participantFlags.hasKeyAndValue(
            ParticipantFlags.selfSwabbing.key,
            ParticipantFlags.selfSwabbing.values.active
          )
        ),
        className: 'mt-2 text-primary fw-bold',
      })],
      responseOptions: [
        {
          key: this.optionKeys.positive, role: 'option',
          content: new Map([
            ["en", "Positive, evidence for infection with coronavirus"],
            ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
          ])
        },
        {
          key: this.optionKeys.negative, role: 'option',
          content: new Map([
            ["en", "Negative, NO evidence for infection with coronavirus"],
            ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "I prefer not to say"],
            ["nl", "Dit wil ik niet aangeven"],
          ])
        },
      ]
    })
  }
}

export class Q1d3NL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1d3NL');
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
        ["en", "What was the date of the selftest? Please guess if you can't remember the date exactly."],
        ["nl", "Wat was de datum van de zelftestafname? Als je de datum niet meer precies weet mag je deze schatten."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'dateInput',
          optionProps: {
            min: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: -2592000 }) },
            max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: 10 }) },
          },
          content: new Map([
            ["en", "Choose date"],
            ["nl", "Kies de dag"],
            ["fr", "Sélectionner la date"],
          ])
        },
      ]
    })
  }
}

export class Q3title extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'Q3title');
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.text({
          content: new Map([
            ["en", "The following questions are about the nose/throat swab"],
            ["nl", "De volgende vragen gaan over de keel/neus slijmvliestest"],
          ])
        })
      ]
    })
  }
}

export class Q1d1NL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1d1NL');
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
        ["en", "What was the date of the nose/throat swab? Please guess if you can't remember the date exactly."],
        ["nl", "Wat was de datum van de keel/neus slijmvliestest? Als je de datum niet meer precies weet mag je deze schatten."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'dateInput',
          optionProps: {
            min: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: -2592000 }) },
            max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: 10 }) },
          },
          content: new Map([
            ["en", "Choose date"],
            ["nl", "Kies de dag"],
            ["fr", "Sélectionner la date"],
          ])
        },
      ]
    })
  }
}



export class Q1fNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1fNL');
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
        ["en", "In the two weeks before your test were you warned by the mobile phone app CoronaMelder?"],
        ["nl", "Ben je in de twee weken voor je test gewaarschuwd door de mobiele telefoon app CoronaMelder?"],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "No, I don't have the CoronaMelder app installed on my phone"],
            ["nl", "Nee, ik heb de app CoronaMelder niet geïnstalleerd op mijn mobiel."],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "No, I have the app installed, but haven't been warned"],
            ["nl", "Nee, ik heb de app CoronaMelder wel geïnstalleerd op mijn mobiel maar ben niet gewaarschuwd."],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Yes, I have the app installed and have been warned"],
            ["nl", "Ja, ik heb de app CoronaMelder geïnstalleerd op mijn mobiel en ik ben gewaarschuwd."],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "I don't want to say"],
            ["nl", "Dit wil ik niet aangeven"],
          ])
        },
      ]
    })
  }
}

export class Q1gNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1gNL');
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
        ["en", "Where did you get yourself tested?"],
        ["nl", "Waar heb je jezelf (de laatste keer) laten testen?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Hospital or general practitioner"],
            ["nl", "Ziekenhuis of huisarts"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["en", "At a commercial company (own initiative)"],
            ["nl", "Bij een bedrijf (op eigen initiatief)"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["en", "At a commercial company (via employer)"],
            ["nl", "Bij een bedrijf (via mijn werkgever)"],
          ])
        },
        {
          key: '7', role: 'option',
          content: new Map([
            ["en", "Abroad"],
            ["nl", "In het buitenland"],
          ])
        },
        {
          key: '8', role: 'option',
          content: new Map([
            ["en", "I don't know"],
            ["nl", "Dat weet ik niet meer"],
          ])
        },
      ]
    })
  }
}

export class Q1b1NL extends Item {
  optionKeys = {
    positive: '1',
    negative: '2',
  }
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1b1NL');
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
        ["en", "What was your nose/throat swab test result?"],
        ["nl", "Wat was de uitslag van de keel/neus slijmvliestest?"],
        ["fr", " Quel a été votre température mesurée la plus élevée?"],
      ]),
      bottomDisplayCompoments: [ComponentGenerators.markdown({
        content: new Map([
          ["nl", `
Vul het formulier helemaal in om uit te vinden of je een neus- en keelmonster moet uitvoeren.
`],
        ]),
        displayCondition: SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.key, this.optionKeys.negative, this.optionKeys.positive),
          SurveyEngine.participantFlags.hasKeyAndValue(
            ParticipantFlags.selfSwabbing.key,
            ParticipantFlags.selfSwabbing.values.active
          )
        ),
        className: 'mt-2 text-primary fw-bold',
      })],
      responseOptions: [
        {
          key: this.optionKeys.positive, role: 'option',
          content: new Map([
            ["en", "Positive, evidence for infection with coronavirus"],
            ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
          ])
        },
        {
          key: this.optionKeys.negative, role: 'option',
          content: new Map([
            ["en", "Negative, NO evidence for infection with coronavirus"],
            ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "I prefer not to say"],
            ["nl", "Dit wil ik niet aangeven"],
          ])
        },
      ]
    })
  }
}

export class Q4title extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'Q4title');
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.text({
          content: new Map([
            ["en", "The following questions are about the bloodtest"],
            ["nl", "De volgende vragen gaan over de bloedtest"],
          ])
        })
      ]
    })
  }
}

export class Q1dNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1dNL');
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
        ["en", "On which day was the blood taken for the corona test? Please guess if you can't remember the date exactly."],
        ["nl", "Wanneer is de bloedtest voor het coronavirus bij je gedaan? Als je de datum niet meer precies weet mag je deze schatten. Het gaat om de datum dat je bloed is afgenomen."],
      ]),
      responseOptions: [
        {
          key: '0', role: 'dateInput',
          optionProps: {
            min: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: -14776000 }) },
            max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: 10 }) },
          },
          content: new Map([
            ["en", "Choose date"],
            ["nl", "Kies de dag"],
            ["fr", "Sélectionner la date"],
          ])
        },
      ]
    })
  }
}

export class Q1b2NL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q1b2NL');
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
        ["en", "What was your blood-test result?"],
        ["nl", "Wat was de uitslag van de bloedtest?"],
        ["fr", " Quel a été votre température mesurée la plus élevée?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Positive, evidence for infection with coronavirus"],
            ["nl", "Positief, dus WEL besmet (geweest) met het coronavirus"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Negative, NO evidence for infection with coronavirus"],
            ["nl", "Negatief, dus GEEN bewijs voor besmetting met het coronavirus"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "I prefer not to say"],
            ["nl", "Dit wil ik niet aangeven"],
          ])
        },
      ]
    })
  }
}

