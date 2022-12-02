import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../contants';


class DashboardSample extends SurveyDefinition {

  q100: q100;
  q101: q101;
  //IntroGebruik: IntroGebruik;
  q102: q102;
  q103a: q103a;
  q103b: q103b;
  q104: q104;
 //IntroBegrip: IntroBegrip;
  q105a: q105a;
  q105b: q105b;
  q106: q106;
  q107: q107;
  q108: q108;
  q109: q109;
  q110: q110;
  //IntroLayout: IntroLayout;
  q111: q111;
  q112: q112;
  q113: q113;
  q114: q114;
  q115: q115;
  q116: q116;
  q117: q117;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.Dashboard,
      name: new Map([
        ['nl', 'Vragenlijst actuele resultatenpagina']
      ]),
      description: new Map([
        ['nl', 'Geef je mening over de resultatenpagina van Infectieradar']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 5 minuut']
      ]),
    });

    const isRequired = true;

    this.q100 = new q100(this.key, isRequired);
    const conditionForWantToParticipate = SurveyEngine.singleChoice.any(this.q100.key, '1');
    this.q101 = new q101(this.key, conditionForWantToParticipate, isRequired);
    //this.IntroGebruik = new IntroGebruik(this.key, conditionForWantToParticipate);
    this.q102 = new q102(this.key, conditionForWantToParticipate, isRequired);
    this.q103a = new q103a(this.key,
      SurveyEngine.singleChoice.any(this.q102.key, '0'), isRequired);
    this.q103b = new q103b(this.key,
      SurveyEngine.singleChoice.any(this.q102.key, '1', '2', '3', '4'), isRequired);
    this.q104 = new q104(this.key, conditionForWantToParticipate, isRequired);
    //this.IntroBegrip = new IntroBegrip(this.key, conditionForWantToParticipate);
    this.q105a = new q105a(this.key, conditionForWantToParticipate, isRequired);
    this.q105b = new q105b(this.key, conditionForWantToParticipate, isRequired);
    this.q106 = new q106(this.key, conditionForWantToParticipate, isRequired);
    this.q107 = new q107(this.key, conditionForWantToParticipate, isRequired);
    this.q108 = new q108(this.key, conditionForWantToParticipate, isRequired);
    this.q109 = new q109(this.key, conditionForWantToParticipate, isRequired);
    this.q110 = new q110(this.key, conditionForWantToParticipate, isRequired);
   //this.IntroLayout = new IntroLayout(this.key, conditionForWantToParticipate);
    this.q111 = new q111(this.key, conditionForWantToParticipate, isRequired);
    this.q112 = new q112(this.key, conditionForWantToParticipate, isRequired);
    this.q113 = new q113(this.key, conditionForWantToParticipate, isRequired);
    this.q114 = new q114(this.key, conditionForWantToParticipate, isRequired);
    this.q115 = new q115(this.key, conditionForWantToParticipate, isRequired);
    this.q116 = new q116(this.key, conditionForWantToParticipate, isRequired);
    this.q117 = new q117(this.key, conditionForWantToParticipate, isRequired);
    this.FinalText= new FinalText(this.key);
  }

  buildSurvey() {
    // Define order of the questions here:
    this.addItem(this.q100.get());
    this.addItem(this.q101.get());
    //this.addItem(this.IntroGebruik.get());
    this.addItem(this.q102.get());
    this.addItem(this.q103a.get());
    this.addItem(this.q103b.get());
    this.addItem(this.q104.get());
    //this.addItem(this.IntroBegrip.get());
    this.addItem(this.q105a.get());
    this.addItem(this.q105b.get());
    this.addItem(this.q106.get());
    this.addItem(this.q107.get());
    this.addItem(this.q108.get());
    this.addItem(this.q109.get());
    this.addItem(this.q110.get());
    //this.addItem(this.IntroLayout.get());
    this.addItem(this.q111.get());
    this.addItem(this.q112.get());
    this.addItem(this.q113.get());
    this.addItem(this.q114.get());
    this.addItem(this.q115.get());
    this.addItem(this.q116.get());
    this.addItem(this.q117.get());
    this.addItem(this.FinalText.get());
  }
}



export class q100 extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'q100');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Deelname vragenlijst actuele resultaten pagina"],
      ]),
      // titleClassName: 'd-none',
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'fw-bold mb-2',
          content: new Map([
            ['nl',
              `
We vinden het belangrijk om resultaten uit Infectieradar te delen met deelnemers.

Om dit zo goed mogelijk te blijven doen, willen we je vragen om een korte vragenlijst in te vullen over de “actuele resultaten” op [*www.infectieradar.nl*](https://www.infectieradar.nl). De vragenlijst duurt 5 minuten en is geheel vrijblijvend.`
            ]])
        })
      ],
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja, ik wil wel een aantal vragen beantwoorden over het delen van resultaten"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee, ik wil geen vragen beantwoorden over het delen van resultaten"],
          ])
        },
      ]
    })
  }
}

export class q101 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q101');
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
        ["nl", "Wat is jouw motivatie om mee te doen aan het Infectieradar onderzoek? (meerdere antwoorden mogelijk)"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ik behoor tot een hoog risicogroep voor ernstige coronaklachten"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ik draag graag bij aan de gezondheid van de samenleving"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ik heb graag inzicht in de verspreiding van het coronavirus"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Ik ben geïnteresseerd in infectieziekten vanwege mijn werk/studie/hobby"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ik vind het leuk om bij te dragen aan wetenschappelijk onderzoek"],
          ])
        },
        {
          key: '6', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
      ]
    })
  }
}

/*
class IntroGebruik extends Item {
  constructor(parentKey: string, condition: Expression,) {
    super(parentKey, 'IntroGebruik')
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
            ["nl", "De volgende vragen gaan over hoe vaak je welke onderdelen gebruikt op de [*“actuele resultaten” pagina.*](https://www.infectieradar.nl/results).",
          ])
        }),
      ]
    })
  }
}*/

export class q102 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q102');
    this.isRequired = isRequired
    this.condition = condition;
  }


  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Gebruik van de actuele resultaten pagina"],
      ]),
      // titleClassName: 'd-none',
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'fw-bold mb-2',
          content: new Map([
            ['nl',
              `De volgende vragen gaan over hoe vaak je welke onderdelen gebruikt op de [*actuele resultaten pagina.*](https://www.infectieradar.nl/results).
               Bekijk je wel eens de informatie op de “actuele resultaten” pagina?`
            ]])
        })
      ],
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee, nooit"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja, dagelijks"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ja, wekelijks"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ja, maandelijks"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Ja, zelden"],
          ])
        },
      ]
    })
  }
}

export class q103a extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q103a');
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
        ["nl", "Waarom bekijk je nooit de actuele resultaten?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ik wist niet dat het er was"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ik heb geen interesse"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ik heb geen tijd"],
          ])
        },
        {
          key: '4', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
      ]
    })
  }
}

export class q103b extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q103b');
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
        ["nl", "Welke figuren en resultaten vind je belangrijk? (meerdere antwoorden mogelijk)"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Het figuur met COVID-19 achtige klachten over tijd"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Het figuur met COVID-19 achtige klachten per provincie"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Het figuur met verschillende klachten over tijd"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Het figuur met positieve testuitslagen voor COVID-19"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Het figuur over testgedrag van deelnemers"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Het figuur met de leeftijds- en geslachtsverdeling van de deelnemers"],
          ])
        },
      ]
    })
  }
}

export class q104 extends Item {
  constructor(parentKey: string, condition: Expression,isRequired: boolean) {
    super(parentKey, 'q104');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je suggesties voor resultaten en/of informatie uit het Infectieradar onderzoek die je interessant lijken voor de “actuele resultaten” pagina?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          content: new Map([
            ["nl", "Ja, namelijk:"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee, ik heb geen suggesties"],
          ])
        },
      ]
    })
  }
}

/*class IntroBegrip extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'IntroBegrip');
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
            ["nl", "De volgende vragen gaan over je begrip van het eerste figuur op de [*actuele resultaten pagina*](https://www.infectieradar.nl/results), namelijk: “Trendlijn COVID-19-achtige klachten”. Bekijk het figuur en lees de bijbehorende tekst op de “actuele resultaten” pagina. Ga vervolgens terug naar de vragen."],
          ])
        }),
      ]
    })
  }
}*/

export class q105a extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q105a');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Figuur 'Trendlijn COVID-19-achtige klachten'"],
      ]),
      // titleClassName: 'd-none',
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'fw-bold mb-2',
          content: new Map([
            ['nl',
              `De volgende vragen gaan over je begrip van het eerste figuur op de [*actuele resultaten pagina*](https://www.infectieradar.nl/results), namelijk: “Trendlijn COVID-19-achtige klachten”. Bekijk het figuur en lees de bijbehorende tekst op de “actuele resultaten” pagina. Ga vervolgens terug naar de vragen.
              In dit figuur staat het percentage deelnemers met COVID-19-achtige klachten over tijd. Vind je het makkelijk om dit percentage te begrijpen?`
            ]])
        })
      ],
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Erg makkelijk"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Iets te makkelijk"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Neutraal"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Iets te moeilijk"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Erg moeilijk"],
          ])
        },
      ]
    })
  }
}

export class q105b extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q105b');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "In plaats van een percentage zouden we ook iets anders kunnen weergeven. Stel het percentage is 5%, welke van de alternatieven vind je prettiger?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "5 op de 100 deelnemers"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "1 op de 20 deelnemers"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Tussen de 3% en 5% van de Nederlanders in de leeftijd van 18 tot 75 jaar"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Tussen de 360000 en 600000 Nederlanders in de leeftijd van 18 tot 75 jaar"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ongeveer 1 op de 20 tot 1 op de 33 Nederlanders in de leeftijd van 18 tot 75 jaar"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Geen van de bovenstaande vind ik beter dan 5% van de deelnemers"],
          ])
        },
      ]
    })
  }
}

export class q106 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q106');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Stel: je hebt vorige week in Infectieradar aangegeven dat je koorts hebt. De klacht koorts valt onder de definitie van COVID-19-achtige klachten en daarmee word je meegeteld in de berekening voor personen met COVID-19-achtige klachten. Deze week heb je nog steeds koorts en dit vul je weer in de vragenlijst. Wordt jouw melding deze week opnieuw meegeteld in de figuur over COVID-19-achtige klachten?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}

export class q107 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q107');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "COVID-19-achtige klachten kunnen ook door andere virussen veroorzaakt worden. Een toename of afname in deze klachten kan dus veroorzaakt worden door het coronavirus, maar ook door andere virussen. Is dit iets waar je rekening mee hebt gehouden tijdens het bekijken van het figuur?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja, ik weet dat ander virussen ook deze klachten kunnen veroorzaken en neem dit mee bij het bekijken van het figuur"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Nee, ik weet dat andere virussen ook deze klachten kunnen veroorzaken, maar denk hier niet aan bij het bekijken van het figuur"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Nee, ik wist niet dat COVID-19-achtige-klachten ook door andere virussen veroorzaakt kunnen worden"],
          ])
        },
      ]
    })
  }
}

export class q108 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q108');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat vind je van de lengte van de tekst naast het figuur?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Te lang"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Iets te lang"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Precies goed"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Iets te kort"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Te kort"],
          ])
        },
      ]
    })
  }
}

export class q109 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q109');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat vind je van het taalgebruik van de tekst naast het figuur?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Erg makkelijk"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Iets te makkelijk"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Neutraal"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Iets te moeilijk"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Erg moeilijk"],
          ])
        },
      ]
    })
  }
}

export class q110 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q110');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je suggesties om de figuur en/of de tekst begrijpelijker te maken? Denk hierbij voor het figuur bijvoorbeeld aan een andere weergave en voor de tekst aan een andere woordkeuze, zinsopbouw of uitleg van begrippen."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          content: new Map([
            ["nl", "Ja, namelijk:"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee, de tekst is voor mij goed te begrijpen"],
          ])
        },
      ]
    })
  }
}

/*class IntroLayout extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'IntroLayout');
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
            ["nl", "Open de [*actuele resultaten pagina*](https://www.infectieradar.nl/results). Bekijk de hele pagina en focus op de lay-out. Ga daarna terug naar de vragen."],
          ])
        }),
      ]
    })
  }
}*/

export class q111 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q111');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Kleurgebruik"],
      ]),
      // titleClassName: 'd-none',
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'fw-bold mb-2',
          content: new Map([
            ['nl',
              `Open de [*actuele resultaten pagina*](https://www.infectieradar.nl/results). Bekijk de hele pagina en focus op de lay-out. Ga daarna terug naar de vragen.
              Wat vind je van het kleurgebruik op de “actuele resultaten” pagina?`
            ]])
        })
      ],
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Heel prettig"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Prettig"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Neutraal"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Onprettig"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Erg onprettig"],
          ])
        },
      ]
    })
  }
}

export class q112 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q112');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Wat vind je van het lettertype op de “actuele resultaten” pagina?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Heel prettig"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Prettig"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Neutraal"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Onprettig"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Erg onprettig"],
          ])
        },
      ]
    })
  }
}

export class q113 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q113');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Zou je het fijn vinden als er bovenaan de “actuele resultaten” pagina een inhoudsopgave wordt toegevoegd?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee, ik lees altijd alles"],
          ])
        },
        {
          key: '3', role: 'input',
          content: new Map([
            ["nl", "Nee, anders:"],
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

export class q114 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q114');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Zou je het fijn vinden als er bovenaan de actuele resultaten pagina een samenvatting is van de belangrijkste resultaten?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
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

export class q115 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q115');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Is de volgorde waarop de figuren en teksten met resultaten worden weergegeven logisch?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}

export class q116 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q116');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je suggesties om de lay-out van de “actuele resultaten” pagina te verbeteren? Denk hierbij bijvoorbeeld aan kleurgebruik, wat voor jou een logischere volgorde voor de weergave van resultaten zou zijn en welke onderdelen van belang zijn in een eventuele samenvatting."],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          content: new Map([
            ["nl", "Ja, namelijk:"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}

export class q117 extends Item {
  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'q117');
    this.isRequired = isRequired
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je nog verdere opmerkingen of suggesties voor het verbeteren van de “actuele resultaten” pagina die nog niet aan bod zijn gekomen in de vragenlijst?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'input',
          content: new Map([
            ["nl", "Ja, namelijk:"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}

export class FinalText extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'FinalText');
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ["nl", "Hartelijk dank voor je reactie."],
      ]),
      this.condition,
    )
  }
}

export const Dashboard = new DashboardSample();
