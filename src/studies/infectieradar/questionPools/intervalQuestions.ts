import { Expression, SurveyItem, SurveySingleItem } from "survey-engine/data_types";
import { matrixKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
import { ItemEditor } from "case-editor-tools/surveys/survey-editor/item-editor";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentEditor } from "case-editor-tools/surveys/survey-editor/component-editor";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { initMatrixQuestion, ResponseRowCell } from "case-editor-tools/surveys/responseTypeGenerators/matrixGroupComponent";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "case-editor-tools/surveys/utils/simple-generators";
import { ParticipantFlags } from "../participantFlags";
import { cisImagineInline } from "./cisImagineInline";

//import { generateLocStrings } from "case-editor-tools/surveys/utils/simple-generators";


// vaccinatie vraag

//FLU
export class Q_flu_vaccine_interval extends Item {
  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q_flu_vaccine_interval');
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
        ["nl", "Heb je dit griepseizoen (2024/2025) een griepprik gehaald?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Yes"],
            ["nl", "Ja, deze heb ik gehaald"],
            ["fr", "Oui"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "No"],
            ["nl", "Nee, deze heb ik (nog) niet gehaald"],
            ["fr", "Non"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
    return [
      {
        content: new Map([

          ["nl", "Waarom vragen we dit?"],

        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([

          ["nl", "We willen de beschermende werking van het vaccin onderzoeken."],

        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should I answer it?"],
          ["nl", "Hoe zal ik deze vraag beantwoorden?"],
          ["fr", "Comment dois-je répondre?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
          ["nl", "Zeg ja wanneer je de griepprik hebt gehad. Normaal ontvang je een griepprik in het najaar"],
          ["fr", "Répondez oui si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}

export class Q_flu_vaccine_datum_interval extends Item {
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q_flu_vaccine_datum_interval');
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
        ["nl", "Wanneer ben je dit griepseizoen (2024/2025) gevaccineerd tegen de griep?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'num', num: 1725141601 }, //2024-09-01
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["en", "Choose date:"],
            ["nl", "Kies datum (als je de datum niet meer precies weet mag je deze schatten):"],
            ["fr", "Sélectionner une date"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "I don't know/can't remember"],
            ["nl", "Dat weet ik niet (meer)"],
            ["fr", "Je ne sais pas, je ne m'en souviens plus"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
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
          ["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],
          ["nl", "Het weten van de timing van vaccinatie is belangrijk om de effectiviteit te schatten."],
          ["fr", "Savoir quand les gens sont vaccinés nous permet d'évaluer le succès des campagnes de vaccination."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should I answer it?"],
          ["nl", "Hoe zal ik deze vraag beantwoorden?"],
          ["fr", "Comment dois-je répondre?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],
          ["nl", "Probeer zo goed mogelijk te antwoorden, de exacte datum is niet belangrijk, maar wel of het aan het begin of het eind van de maand was."],
          ["fr", "Essayez de répondre le plus précisément possible. Si vous ne connaissez pas la date précise, donnez votre meilleure estimation. Par exemple, vous pouvez vous rappeler du mois, puis essayez de vous souvenir si c'était au début ou à la fin du mois. Essayez de vous servir d'événements importants (p. ex. vacances ou anniversaire) pour vous aider à vous rafraîchir la mémoire."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}


// COVID
export class Q_covid_vaccine_interval extends Item {
  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q_covid_vaccine_interval');
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
        ["nl", "Heb je dit griepseizoen (2024/2025) een coronaprik gehaald?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Yes"],
            ["nl", "Ja, deze heb ik gehaald"],
            ["fr", "Oui"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "No"],
            ["nl", "Nee, deze heb ik (nog) niet gehaald"],
            ["fr", "Non"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
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
          ["en", "Report yes, if you received the vaccine this season, usually in the autumn."],
          ["nl", "We willen de beschermende werking van het vaccin onderzoeken."],
          ["fr", "Nous aimerions savoir à quel point la protection par le vaccin fonctionne."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should I answer it?"],
          ["nl", "Hoe zal ik deze vraag beantwoorden?"],
          ["fr", "Comment dois-je répondre?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Report yes, if you received the vaccine this season, usually in the autumn. If you get vaccinated after filling in this questionnaire, please return to this and update your answer."],
          ["nl", "Zeg ja wanneer je de coronaprik hebt gehad. Normaal ontvang je een coronoaprik in het najaar"],
          ["fr", "Répondez oui si vous avez été vacciné cette saison, habituellement à l'automne. Si vous vous faites vacciner après avoir rempli ce questionnaire, merci de revenir et corriger votre réponse."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}

export class Q_covid_vaccine_datum_interval extends Item {
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q_covid_vaccine_datum_interval');
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

        ["nl", "Wanneer ben je dit griepseizoen (2024/2025) gevaccineerd tegen corona?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'num', num: 1725141601 }, //2024-09-01
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["en", "Choose date:"],
            ["nl", "Kies datum (als je de datum niet meer precies weet mag je deze schatten):"],
            ["fr", "Sélectionner une date"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "I don't know/can't remember"],
            ["nl", "Dat weet ik niet (meer)"],
            ["fr", "Je ne sais pas, je ne m'en souviens plus"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
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
          ["en", "Knowing when people are vaccinated tells us how well the vaccination programme is being carried out."],
          ["nl", "Het weten van de timing van vaccinatie is belangrijk om de effectiviteit te schatten."],
          ["fr", "Savoir quand les gens sont vaccinés nous permet d'évaluer le succès des campagnes de vaccination."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
      {
        content: new Map([
          ["en", "How should I answer it?"],
          ["nl", "Hoe zal ik deze vraag beantwoorden?"],
          ["fr", "Comment dois-je répondre?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "Please, try and answer as accurately as possible. If you don't know the precise date, please give your best estimate. For instance, you might remember the month, then try and remember if it was at the beginning or the end of the month. Were there any significant events (e.g. a holiday or a birthday) that might help jog your memory?"],
          ["nl", "Probeer zo goed mogelijk te antwoorden, de exacte datum is niet belangrijk, maar wel of het aan het begin of het eind van de maand was."],
          ["fr", "Essayez de répondre le plus précisément possible. Si vous ne connaissez pas la date précise, donnez votre meilleure estimation. Par exemple, vous pouvez vous rappeler du mois, puis essayez de vous souvenir si c'était au début ou à la fin du mois. Essayez de vous servir d'événements importants (p. ex. vacances ou anniversaire) pour vous aider à vous rafraîchir la mémoire."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}




//  Question about pregnancy
export class Q12 extends Item {
  constructor(parentKey: string, condition?: Expression, isRequired?: boolean) {
    super(parentKey, 'Q12');
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
        ["en", "Are you currently pregnant?"],
        ["nl", "Ben je op dit moment zwanger?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "Yes"],
            ["nl", "Ja"],
            ["fr", "Oui"],
          ])
        }, {
          key: '1', role: 'option',
          content: new Map([
            ["en", "No"],
            ["nl", "Nee"],
            ["fr", "Non"],
          ])
        }, {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Don't know/would rather not answer"],
            ["nl", "Dit weet ik niet/wil ik liever niet aangeven"],
            ["fr", "Je ne sais pas, je ne désire pas répondre"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
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
          ["en", "Infections during pregnancy can be different."],
          ["nl", "Infecties kunnen soms anders verlopen bij zwangeren."],
          ["fr", "La grossesse peut entraîner des complications si vous êtes infecté par la grippe."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}

export class Q12b extends Item {
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q12b');
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
        ["en", "Which trimester of the pregnancy are you in?"],
        ["nl", "In welk trimester ben je van je zwangerschap?"],
        ["fr", "A quel stade de grossesse êtes-vous?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["en", "First trimester (week 1-12)"],
            ["nl", "Eerste trimester (week 1-12)"],
            ["fr", "Premier trimestre (semaine 1-12)"],
          ])
        }, {
          key: '1', role: 'option',
          content: new Map([
            ["en", "Second trimester (week 13-28)"],
            ["nl", "Tweede trimester (week 13-28)"],
            ["fr", "Deuxième trimestre (semaine 13-28)"],
          ])
        }, {
          key: '2', role: 'option',
          content: new Map([
            ["en", "Third trimester (week 29-delivery)"],
            ["nl", "Derde trimester (week 29 tot bevalling)"],
            ["fr", "Troisième trimestre (semaine 29 ou plus)"],
          ])
        }, {
          key: '3', role: 'option',
          content: new Map([
            ["en", "Don't know/would rather not answer"],
            ["nl", "Dit weet ik niet / wil ik niet aangeven"],
            ["fr", "Je ne sais pas, je ne désire pas répondre"],
          ])
        },
      ],
    })
  }

  getHelpGroupContent() {
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
          ["en", "The stage of pregnancy might alter your infection, although this is not very clear."],
          ["nl", "Infecties kunnen soms anders verlopen per trimester van een zwangerschap, maar heel duidelijk is dit nog niet."],
          ["fr", "Le stade de grossesse pourrait influencer les risques de grippe grave, bien que ce soit pas démontré."],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}

export class Q_healthrank extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q_healthrank');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      //helpGroupContent: this.getHelpGroupContent(),
      questionText: new Map([
        ["en", "On a scale from 0 to 100, how good or bad was your health last week?"],
        ["nl", "Hoe goed of slecht was je gezondheid de afgelopen week?"],
      ]),
      questionSubText: new Map([
        ["en", "The scale goes from 0 to 100, 100 means the best health status you can imagine and 0 means the worst health status you can imagine."],
        ["nl", "Deze schaal loopt van 0 tot 100, waarbij 100 staat voor de beste gezondheid die je je kunt voorstellen en 0 staat voor de slechtste gezondheid die je je kunt voorstellen."],
      ]),
      sliderLabel: new Map([
        ["en", "Your answer:"],
        ["nl", "Jouw selectie:"],
      ]),
      noResponseLabel: new Map([
        ["en", "Change the value of the slider by dragging the button."],
        ["nl", "Sleep de knop om je keuze te maken."],
      ]),
      min: 0,
      max: 100,
      stepSize: 1,
    })
  }
}

export class Q_CIS extends Item {
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q_CIS');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Vermoeidheid en concentratie afgelopen twee weken"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'border-bottom mb-3 pb-2',
          content: new Map([
            ["nl", `Hieronder staan 13 uitspraken waarmee je kunt aangeven hoe je jezelf **de laatste twee weken** hebt gevoeld. Je kunt elke vraag beantwoorden door in één van de zeven hokjes een kruisje te zetten. De plaats van het kruisje geeft aan in welke mate je vindt dat de uitspraak op jou van toepassing is. Wanneer je vindt dat het antwoord niet 'ja, dat klopt', maar ook niet 'nee, dat klopt niet' is, zet dan een kruisje in het hokje dat het meest overeenkomt met je gevoel. Bijvoorbeeld zo:

${cisImagineInline}

**Klik hieronder je keuze aan:**`]
          ])
        })
      ],
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "ja, dat klopt"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", ""],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", ""],
          ])
        },
        {
          key: '4', content: new Map([
            ["nl", ""],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", ""],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", ""],
          ])
        },
        {
          key: '7', content: new Map([
            ["nl", "nee, dat klopt niet"],
          ])
        },
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik voel me moe."],
          ])
        },
        {
          key: 'b', content: new Map([
            ["nl", "Nadenken kost me moeite."],
          ])
        },
        {
          key: 'c', content: new Map([
            ["nl", "Lichamelijk voel ik me uitgeput."],
          ])
        },
        {
          key: 'd', content: new Map([
            ["nl", "Ik voel me fit."],
          ])
        },
        {
          key: 'e', content: new Map([
            ["nl", "Als ik ergens mee bezig ben, kan ik mijn gedachten er goed bijhouden."],
          ])
        },
        {
          key: 'f', content: new Map([
            ["nl", "Ik voel me slap."],
          ])
        },
        {
          key: 'g', content: new Map([
            ["nl", "Ik kan me goed concentreren."],
          ])
        },
        {
          key: 'h', content: new Map([
            ["nl", "Ik voel me uitgerust."],
          ])
        },
        {
          key: 'i', content: new Map([
            ["nl", "Het kost me moeite ergens mijn aandacht bij te houden."],
          ])
        },
        {
          key: 'j', content: new Map([
            ["nl", "Lichamelijk voel ik me in een slechte conditie."],
          ])
        },
        {
          key: 'k', content: new Map([
            ["nl", "Ik ben snel moe."],
          ])
        },
        {
          key: 'l', content: new Map([
            ["nl", "Mijn gedachten dwalen makkelijk af."],
          ])
        },
        {
          key: 'm', content: new Map([
            ["nl", "Lichamelijk voel ik me in een uitstekende conditie."],
          ])
        },
      ],
    })
  }
}


export class Q_mMRC extends Item {
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q_mMRC');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Kortademigheid"],
      ]),
      questionSubText: new Map([
        ["nl", "Welke van de onderstaande uitspraken is voor jou op dit moment het meest van toepassing?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ik word alleen kortademig bij zware inspanning."],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([

            ["nl", "Ik word alleen kortademig als ik me moet haasten op vlak terrein of als ik tegen een lichte helling oploop."],

          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Door mijn kortademigheid loop ik op vlak terrein langzamer dan andere mensen van mijn leeftijd of moet ik stoppen om op adem te komen als ik mijn eigen tempo loop."],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Na ongeveer 100 meter lopen op vlak terrein moet ik na een paar minuten stoppen om op adem te komen."],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ik ben te kortademig om het huis uit te gaan, of ik ben kortademig tijdens het aan- of uitkleden."],
          ])
        },
      ],
    })
  }
}


//Zelf-gerapporteerde post-infection symptoms
export class Q_longsymptoms extends Item {
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q_longsymptoms');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je op dit moment langdurige gezondheidsklachten waarvan je denkt dat deze deels of geheel door een infectieziekte besmetting komen (bijvoorbeeld door een virus of bacterie)?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Nee, dat heb ik nooit gehad."],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Nee, wel gehad, maar nu niet meer."],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ja, nog een beetje klachten door een infectieziekte."],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Ja, nog veel klachten door een infectieziekte."],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ja, nog zeer veel klachten door een infectieziekte."],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Ik heb wel klachten, maar die komen door een andere reden dan een infectieziekte besmetting."],
          ])
        },
        
      ],
    })
  }
}
//IPQ  vragen over perceptie van klachten
export class Q_IPQ extends Item {
  constructor(parentKey: string,condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q_IPQ');
    this.isRequired = isRequired;
    this.condition = condition;
  }
  
  buildItem() {
    return SurveyItems.simpleLikertGroup({
      questionText: new Map([
          ["nl", "Je hebt zojuist aangegeven dat je gezondheidsklachten hebt. Onderstaande vragen gaan over deze klachten. Klik alsjeblieft bij elke vraag het getal aan dat je mening het beste weergeeft."],
      ]),
      scaleOptions: [
          {
              key: '0', content: new Map([
                  ["nl", "0"],
              ])
          },
          {
              key: '1', content: new Map([
                  ["nl", "1"],
              ]),
          }, {
              key: '2', content: new Map([
                  ["nl", "2"],
              ])
          }, {
              key: '3', content: new Map([
                  ["nl", "3"],
              ])
          }, {
              key: '4', content: new Map([
                  ["nl", "4"],
              ]),
          }, {
              key: '5', content: new Map([
                  ["nl", "5"],
              ])
          }, {
              key: '6', content: new Map([
                  ["nl", "6"],
              ])
          }, {
              key: '7', content: new Map([
                  ["nl", "7"],
              ])
          }, {
              key: '8', content: new Map([
                  ["nl", "8"],
              ])
          }, {
              key: '9', content: new Map([
                  ["nl", "9"],
              ])
          }, {
              key: '10', content: new Map([
                  ["nl", "10"],
              ])
          }
      ],
      rows: [
          {
              key: 'a', content: new Map([
                  ["nl", "Hoeveel beïnvloeden je klachten je leven?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'b', content: new Map([
                  ["nl", "Hoe lang denk je dat je klachten zullen duren?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 een zeer korte tijd - 10 mijn hele leven']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'c', content: new Map([
                  ["nl", "Hoeveel controle vind je dat je hebt over je klachten?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal geen controle - 10 zeer veel controle']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'd', content: new Map([
                  ["nl", "Hoeveel denk je dat een behandeling kan helpen bij je klachten?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal niet -  10 zeer veel']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'e', content: new Map([
                  ["nl", "Hoe sterk ervaar je klachten?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal geen klachten - 10 veel ernstige klachten']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'f', content: new Map([
                  ["nl", "Hoe bezorgd ben je over je klachten?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal niet bezorgd - 10 zeer bezorgd']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'g', content: new Map([
                  ["nl", "In welke mate vind je dat je je klachten begrijpt?"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal geen begrip - 10 zeer veel begrip']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
          {
              key: 'h', content: new Map([
                  ["nl", "Hoeveel invloed hebben de klachten op je stemming? (Bijvoorbeeld: maakt de ziekte je boos, bang, van streek of somber?)"],
              ]), descriptions: [
                  ComponentGenerators.text({
                      content: new Map([
                          ['nl', '0 helemaal geen invloed - 10 zeer veel invloed']
                      ]),
                      className: "fst-italic mb-1"
                  }),
              ]
          },
      ]
  });
}
}
//Oorzaak van zelf-gerapporteerde post-infection symptoms
export class Q_longsymptoms_condition extends Item {
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q_longsymptoms_condition');
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
        ["nl", "Door welke infectieziekte denk je dat je langdurige gezondheidsklachten hebt?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "COVID-19 (Long COVID / Post-COVID)"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ziekte van Lyme"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ziekte van Pfeiffer (Epstein-Barr virus)"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Gordelroos / Waterpokken"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Q-koorts"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Polio"],
          ])
        },
        {
          key: '8', role: 'option',
          content: new Map([
            ["nl", "Griep (Influenzavirus)"],
          ])
        },
        {
          key: '7', role: 'input',
          style: [{ key: 'maxLength', value: '160' }],
          content: new Map([
            ["nl", "Anders, namelijk"],
          ])
        },
        
      ],
    })
  }
}



