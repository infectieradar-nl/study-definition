import { Expression, SurveyItem } from "survey-engine/data_types";
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
//import { CISexample } from "./images";

// vaccinatie vraag
export class Qvaccin_up extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Qvaccin_up');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Heb je je in de laatste 3 maanden laten vaccineren?"],
      ]),
      helpGroupContent: this.getHelpGroupContent(),
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

  getHelpGroupContent() {
    return [
      {
        content: new Map([
          ["en", "Why are we asking this?"],
          ["nl", "Waarom vragen we dit?"],
          ["nl-be", "Waarom vragen we dit?"],
          ["fr", "Pourquoi demandons-nous cela?"],
        ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["en", "To find out whether the chance of getting flu is different between genders."],
          ["nl", "Om de informatie over vaccinaties aan te passen."],
          ["nl-be", "Om te kijken naar verschillen tussen mannen en vrouwen."],
          ["fr", "Pour savoir si le risque de contracter la grippe est différent entre hommes et femmes."],
        ]),
        style: [{ key: 'variant', value: 'p' }, { key: 'className', value: 'm-0' }],
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


//CIS fatigue and CIS concentration
/*export const Q_CIS = (parentKey: string, isRequired?: boolean, keyOverride?: string): SurveyItem => {
  const itemKey = keyOverride ? keyOverride : 'CIS';

  const imageContent = `
<img src="https://longcovid.rivm.nl/assets/images/CISquestion.jpg" width="70%"/>
`

  return SurveyItemGenerators.simpleLikertGroup({
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    questionText: new Map([
      ["nl", "Vermoeidheid"],
    ]),
    topDisplayCompoments: [
      {
        role: 'text',
        style: [{ key: 'variant', value: 'p' }],
        content: generateLocStrings(new Map([
          ["nl", "Op deze pagina staan 8 uitspraken waarmee je kunt aangeven hoe je jezelf de laatste twee weken hebt gevoeld."],
        ]))
      },

      {
        role: 'text',
        style: [{ key: 'variant', value: 'p' }],
        content: generateLocStrings(new Map([
          ["nl", "Klik hieronder aan welk van de antwoorden het meest overeenkomt met jouw gevoel."],
        ]))
      },
      {
        role: 'text',
        style: [{ key: 'variant', value: 'p' }],
        content: generateLocStrings(new Map([
          ["nl", "Bijvoorbeeld als je je wel wat slap voelt, maar niet zo erg slap, kun je een van de vakjes aanklikken die in de buurt staan van de antwoordmogelijkheid 'ja, dat klopt'. Dus bijvoorbeeld als volgt:"],
        ]))
      },
      ComponentGenerators.markdown({
        content: new Map([
          ['nl', imageContent]
        ])
      }),
      {
        role: 'text',
        style: [{ key: 'className', value: 'mb-1 border-bottom border-1 border-grey-5 pt-1 mt-2 fw-bold' }],
        content: generateLocStrings(new Map([
          ["nl", "1 = ja, dat klopt, 7 = nee, dat klopt niet"],
        ]))
      },
      {
        role: 'text',
        style: [{ key: 'variant', value: 'p' }],
        content: generateLocStrings(new Map([
          ["nl", "Vink hieronder aan welk van de antwoorden het meest overeenkomt met je gevoel."],
        ]))
      },
    ],
    scaleOptions: [
      {
        key: '1', content: new Map([
          ["nl", "1 ja dat klopt"],
        ])
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
          ["nl", "7 nee dat klopt niet"],
        ])
      }
    ],
    rows: [
      {
        key: 'a', content: new Map([
          ["nl", "Ik voel me moe"],
        ]),
      },
      {
        key: 'b', content: new Map([
          ["nl", "Nadenken kost me moeite"],
        ]),
      },
      {
        key: 'c', content: new Map([
          ["nl", "Lichamelijk voel ik me uitgeput"],
        ])
      },
      {
        key: 'd', content: new Map([
          ["nl", "Ik voel me fit"],
        ])
      },
      {
        key: 'e', content: new Map([
          ["nl", "Als ik ergens mee bezig ben, kan ik mijn gedachten er goed bijhouden"],
        ]),
      },
      {
        key: 'f', content: new Map([
          ["nl", "Ik voel me slap"],
        ])
      },
      {
        key: 'g', content: new Map([
          ["nl", "Het kost me moeite ergens mijn aandacht bij te houden"],
        ])
      },
      {
        key: 'h', content: new Map([
          ["nl", "Lichamelijk voel ik me in een slechte conditie"],
        ])
      },
      {
        key: 'i', content: new Map([
          ["nl", "Ik ben gauw moe"],
        ])
      },
      {
        key: 'j', content: new Map([
          ["nl", "Mijn gedachten dwalen gemakkelijk af"],
        ]),
      },
      {
        key: 'k', content: new Map([
          ["nl", "Lichamelijk voel ik me in een uitstekende conditie"],
        ])
      },
    ]
  });
}

//mMRC
export const Q_mMRC = (parentKey: string, condition?: Expression, isRequired?: boolean, keyOverride?: string): SurveyItem => {
  const itemKey = keyOverride ? keyOverride : 'mMRC';
  return SurveyItemGenerators.singleChoice({
    condition: condition,
    parentKey: parentKey,
    itemKey: itemKey,
    isRequired: isRequired,
    questionText: new Map([
      ["nl", "Kortademigheid"],
    ]),
    questionSubText: new Map([
      ["nl", "Welke van de onderstaande uitspraken is voor jou op dit moment het meest van toepassing?"],
    ]),
    responseOptions: [{
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

//Zelf-gerapporteerde LC
export const Q_langdurige_klachten = (parentKey: string, isRequired?: boolean, condition?: Expression, keyOverride?: string): SurveyItem => {
  const itemKey = keyOverride ? keyOverride : 'Q11';

  return SurveyItemGenerators.singleChoice({
    parentKey: parentKey,
    itemKey: itemKey,
    condition: condition,
    questionText: new Map([
      ["nl", "Heb je op dit moment langdurige gezondheidsklachten waarvan je denkt dat deze deels of geheel door het coronavirus komen?"],
    ]),
    responseOptions: [
      {
        key: 'nee', role: 'option',
        content: new Map([
          ["nl", "Nee"],
        ])
      },
      {
        key: 'ja_beetje', role: 'option',
        content: new Map([
          ["nl", "Ja, nog een beetje klachten door het coronavirus"],
        ])
      },
      {
        key: 'ja_veel', role: 'option',
        content: new Map([
          ["nl", "Ja, nog veel klachten door het coronavirus"],
        ])
      },
      {
        key: 'ja_zeerveel', role: 'option',
        content: new Map([
          ["nl", "Ja, nog zeer veel klachten door het coronavirus"],
        ])
      },
      {
        key: 'notanymore', role: 'option',
        content: new Map([
          ["nl", "Nee, niet meer"],
        ])
      }
    ],
    isRequired: isRequired,
  });
}
*/
