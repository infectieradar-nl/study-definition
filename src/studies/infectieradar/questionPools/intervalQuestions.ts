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

//import { generateLocStrings } from "case-editor-tools/surveys/utils/simple-generators";


// vaccinatie vraag

//FLU
export class Q_flu_vaccine_interval extends Item {
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q_flu_vaccine_interval');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je dit griepseizoen (2023/2024) een griepprik gehaald?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja, deze heb ik gehaald"],
            ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            
            ["nl", "Nee, deze heb ik (nog) niet gehaald."],
            
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
       
        ["nl", "Wanneer ben je dit griepseizoen (2023/2024) gevaccineerd tegen de griep?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            
            ["nl", "Kies datum:"],
            ["fr", "Sélectionner une date"],
          ])
        },
        {
          key: '0', role: 'option',
          content: new Map([
           
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
  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q_covid_vaccine_interval');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
       
        ["nl", "Heb je dit griepseizoen (2023/2024) een coronaprik gehaald?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
         
            ["nl", "Ja, deze heb ik gehaald"],
            ["fr", "Oui"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["en", "No"],
            ["nl", "Nee, deze heb ik (nog) niet gehaald."],
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
       
        ["nl", "Wanneer ben je dit griepseizoen (2023/2024) gevaccineerd tegen corona?"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'dateInput',
          optionProps: {
            min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -21427200) },
            max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 0) }
          },
          content: new Map([
            ["en", "Choose date:"],
            ["nl", "Kies datum:"],
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
  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
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

class q1_2 extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'q1_2');
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
        ["en", "On a scale from 0 to 100, how good or bad was your health last week because of the symptoms?"],
        ["nl", "Hoe goed of slecht was je gezondheid, in de afgelopen week, door je gemelde klachten?"],
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
        ["nl", "Vermoeidheid en concentratie"],
      ]),
      //TODO: CIS image; doesn't display image yet
      // SdB: I have tried making an image folder and sourcing from there but no luck. Maybe from the IR website gives better luck.
      questionSubText: new Map([
        ["nl", `Hieronder staan 13 uitspraken waarmee je kunt aangeven hoe je jezelf de laatste twee weken hebt gevoeld. Je kunt elke vraag beantwoorden door in één van de zeven hokjes een kruisje te zetten. De plaats van het kruisje geeft aan in welke mate je vindt dat de uitspraak op jou van toepassing is. Wanneer je vindt dat het antwoord niet 'ja, dat klopt', maar ook niet 'nee, dat klopt niet' is, zet dan een kruisje in het hokje dat het meest overeenkomt met je gevoel. Bijvoorbeeld zo:
        '<img src = "data:image/png;base64,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" width = "70%">'
       `],
      ]),
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
            ["nl", "Mijn gedachten dwalen makkelijk af"],
          ])
        },
        {
          key: 'm', content: new Map([
            ["nl", "Lichamelijk voel ik me in een uitstekende conditie"],
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
      ["nl", "Heb je op dit moment langdurige gezondheidsklachten waarvan je denkt dat deze deels of geheel door een infectieziekte komen?"],
    ]),
    responseOptions: [
      {
        key: '1', role: 'option',
        content: new Map([
          ["nl", "Nee"],
        ])
      },
      {
        key: '2', role: 'option',
        content: new Map([
          ["nl", "Ja, nog een beetje klachten door een infectieziekte."],
        ])
      },
      {
        key: '3', role: 'option',
        content: new Map([
          ["nl", "Ja, nog veel klachten door een infectieziekte."],
        ])
      },
      {
        key: '4', role: 'option',
        content: new Map([
          ["nl", "Ja, nog zeer veel klachten door een infectieziekte."],
        ])
      },
      {
        key: '5', role: 'option',
        content: new Map([
          ["nl", "Nee, nu niet meer."],
          ])
        },
      ],
    })
  }
}



