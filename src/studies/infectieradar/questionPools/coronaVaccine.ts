import { Expression } from "survey-engine/data_types";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { ParticipantFlags } from "../participantFlags";


export class Q2NL extends Item {
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q2NL');
    this.isRequired = isRequired;
  }

  buildItem() {
    const itemCondition = SurveyEngine.compare.lt(
      SurveyEngine.participantFlags.getAsNum(ParticipantFlags.lastReplyToVaccination.key),
      SurveyEngine.timestampWithOffset({ days: -4 * 7 })
    )

    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: itemCondition,
      questionText: new Map([
        ["en", "Did you receive a vaccination against corona since the last survey?"],
        ["nl", "Heb je sinds de vorige vragenlijst een vaccinatie ontvangen tegen het coronavirus?"],
      ]),
      helpGroupContent: this.getHelpGroupcontent(),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "No"],
            ["nl", "Nee"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "No, I have been invited and are planning to go"],
            ["nl", "Nee, ik ben sinds de vorige vragenlijst wel uitgenodigd voor vaccinatie en ben van plan om nog te gaan"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "No, I have been invited, but refuse to go"],
            ["nl", "Nee, ik ben sinds de vorige vragenlijst wel uitgenodigd, maar ik ben van plan om NIET te gaan"],
          ])
        },
        /*{
            key: '3', role: 'option',
            content: new Map([
                ["en", "Yes, I have been vaccinated for the first time against the coronavirus"],
                ["nl", "Ja, ik heb sinds de vorige vragenlijst een eerste vaccinatie ontvangen tegen het coronavirus"],
            ])
        },
        {
            key: '4', role: 'option',
            content: new Map([
                ["en", "Yes, I have been vaccinated for the second time against the coronavirus"],
                ["nl", "Ja, ik heb sinds de vorige vragenlijst een tweede vaccinatie ontvangen tegen het coronavirus"],
            ])
        },
        {
            key: '5', role: 'option',
            content: new Map([
                ["en", "Yes, I have been vaccinated for the third time against the coronavirus"],
                ["nl", "Ja, ik heb sinds de vorige vragenlijst een derde (booster) vaccinatie ontvangen tegen het coronavirus"],
            ])
        },*/
        {
          key: '6', role: 'option',
          content: new Map([
            ["en", "Not applicable, I am fully vaccinated and not planning to get a (booster) vaccination"],
            ["nl", "Niet meer van toepassing, ik heb de basisserie afgerond en niet van plan om een (booster) vaccinatie te nemen"],
          ])
        },
        {
          key: '7', role: 'option',
          content: new Map([
            ["en", "Yes, I've been vaccinated once but I'm not fully vaccinated"],
            ["nl", "Ja, ik heb één vaccinatie tegen het coronavirus ontvangen maar de basisserie niet afgerond"],
          ])
        },
        {
          key: '8', role: 'option',
          content: new Map([
            ["en", "Yes, I've received one or two vaccinations, I'm fully vaccinated"],
            ["nl", "Ja, ik heb de basisserie van één of twee prikken nu afgerond"],
          ])
        },
        {
          key: '9', role: 'option',
          content: new Map([
            ["en", "Yes, I'm fully vaccinated and received the first booster"],
            ["nl", "Ja, ik heb de basisserie afgerond en een eerste booster ontvangen"],
          ])
        },
        {
          key: '10', role: 'option',
          content: new Map([
            ["en", "Yes, I'm fully vaccinated and received the second booster"],
            ["nl", "Ja, ik heb de basisserie afgerond en een tweede booster ontvangen"],
          ])
        },
      ],
    })
  }

  private getHelpGroupcontent() {
    return [
      {
        content: new Map([
          ["en", "Why do we ask this question?"],
          ["nl", "Waarom vragen we dit?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "To create an overview of how many participants are vaccinated"],
          ["nl", "Om een overzicht te krijgen hoeveel mensen binnen infectieradar al gevaccineerd zijn."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should you answer this question?"],
          ["nl", "Hoe zal ik deze vraag beantwoorden?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Please indicate whether you are vaccinated."],
          ["nl", "Geef aan of je sinds het invullen van de vorige vragenlijst een vaccinatie gehad hebt.  Wij onthouden de antwoorden  uit eerdere vragenlijsten en weten dus zo of je al gevaccineerd bent. Vul 'nee' in wanneer je sinds het invullen van de vorige vragenlijst geen nieuwe vaccinatie hebt gehad, maar al wel een of twee keer gevaccineerd bent."],
        ]),
      },
      {
        content: new Map([
          ["nl", "Wat betekent basisserie afgerond?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["nl", "Als je de basisserie van vaccinaties tegen Corona hebt afgerond kan dit op verschillende manieren, namelijk: 1 vaccin met Janssen; OF 1 vaccin met moderna/pfizer/astraZeneca en een doorgemaakte Corona infectie; OF 2 vaccins met moderna/pfizer/astraZeneca; OF 3x Moderna/Pfizer/AsteraZenica (voor immuungecompromitteerde)."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      // style: [{ key: 'variant', value: 'p' }],
    ]
  }
}

export class Q2aNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q2aNL');
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dateInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["en", "At what date did you get your vaccination? Please guess if you can't remember the date exactly."],
        ["nl", "Wat is de datum waarop je bent gevaccineerd? Als je de datum niet meer precies weet mag je deze schatten."],
      ]),
      dateInputMode: "YMD",
      placeholderText: new Map([
        ["en", "Choose date"],
        ["nl", "Kies de dag"],
      ]),
      minRelativeDate: { delta: { seconds: -7776000 } },
      maxRelativeDate: { delta: { seconds: 10 } },
    })
  }
}

export class Q2bNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q2bNL');
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
        ["en", "With which vaccin are you vaccinated?"],
        ["nl", "Met welk vaccin ben je gevaccineerd?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "BioNTech/Pfizer"],
            ["nl", "BioNTech/Pfizer"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Moderna"],
            ["nl", "Moderna"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "AstraZeneca"],
            ["nl", "AstraZeneca"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["en", "CureVac"],
            ["nl", "CureVac"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["en", "Janssen"],
            ["nl", "Janssen"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["en", "Sanofi"],
            ["nl", "Sanofi"],
          ])
        },
        {
          key: '7', role: 'option',
          content: new Map([
            ["en", "I don't know"],
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}

export class Q2cNL extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q2cNL');
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
        ["en", "What were your reasons for NOT getting a coronavirus vaccination?"],
        ["nl", "Wat zijn voor jouw de belangrijkste redenen om geen vaccin tegen het coronavirus te halen?"],
      ]),
      helpGroupContent: this.getHelpGroupcontent(),
      topDisplayCompoments: [
        ComponentGenerators.text({
          className: 'mb-2',
          content: new Map([
            ['en', 'Select all options that apply'],
            ['nl', 'Meerdere antwoorden mogelijk'],
          ])
        })
      ],
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "I have already had corona"],
            ["nl", "Ik heb al corona gehad"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "I don't belong to a risk group"],
            ["nl", "Ik behoor niet tot een risicogroep"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "I believe the vaccine is too new"],
            ["nl", "Ik vind het vaccin te nieuw"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["en", "I am afraid of possible side-effects"],
            ["nl", "Ik ben bang voor mogelijke bijwerkingen (op lange of korte termijn)"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["en", "I don't like vaccinations"],
            ["nl", "Ik hou niet van het krijgen van vaccinaties"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["en", "I doubt the effectiveness of the coronavaccine"],
            ["nl", "Ik twijfel aan de werking van het coronavaccin"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["en", "Other reason(s)"],
            ["nl", "Andere reden"],
          ])
        },
      ],
    })
  }

  private getHelpGroupcontent() {
    return [
      {
        content: new Map([
          ["en", "Why are we asking this?"],
          ["nl", "Waarom vragen we dit?"],
          ["fr", "Pourquoi demandons-nous cela?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "We would like to know why some people get vaccinated and others do not."],
          ["nl", "We willen graag onderzoeken waarom sommige mensen zich wel laten vaccineren en anderen niet."],
          ["fr", "Nous aimerions savoir pourquoi certaines personnes se font vacciner et d'autres pas."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should I answer it?"],
          ["nl", "Hoe moet ik deze vraag beantwoorden?"],
          ["fr", "Comment dois-je répondre?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Tick all those reasons that were important in your decision."],
          ["nl", "Geef alle redenen aan die een rol spelen in de beslissing."],
          ["fr", "Cochez toutes les raisons qui ont influencé votre décision."],
        ]),
        // style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}
