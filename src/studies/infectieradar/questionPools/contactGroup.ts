import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { DateDisplayComponentProp, Group, Item, StyledTextComponentProp } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { Expression, SurveySingleItem, Validation } from "survey-engine/data_types";

export class ContactGroup extends Group {

  Infos: Infos;
  Q1: Q1;
  Q2: Q2;
  Instruct_contact: Instruct_contact;
  ContactMatrixForHome: ContactMatrix;
  ContactMatrixForWork: ContactMatrix;
  ContactMatrixForSchool: ContactMatrix;
  ContactMatrixForLeisure: ContactMatrix;
  ContactMatrixForOther: ContactMatrix_other;
  QFragile: QFragile;


  constructor(parentKey: string, isRequired: boolean, groupCondition?: Expression) {
    super(parentKey, 'Contact')
    this.groupEditor.setCondition(groupCondition)

    // Initialize/Configure questions here:
    this.Infos = new Infos(this.key);
    this.Q1 = new Q1(this.key, isRequired);
    this.Q2 = new Q2(this.key, SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes), isRequired);

    const conditionForInstruct = SurveyEngine.compare.gt(SurveyEngine.multipleChoice.selectionCount(this.Q2.key), 1);

    this.Instruct_contact = new Instruct_contact(this.key, conditionForInstruct);

    const conditionForHome = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.home);
    this.ContactMatrixForHome = new ContactMatrix(
      this.key,
      'ContactsHome',
      [
        {
          content: new Map([
            ['nl', `Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren `
            ]])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -1 }),
          dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', ` THUIS hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Thuis = je woning (bijv. gezinsleden, bezoekers)`],
          ])
        }, 
        /* code werkt nog niet:
          {
          questionSubText: new Map([
          ['nl', 'Thuis = je woning (bijv. gezinsleden, bezoekers)'],
          ])
        },*/      
      ],
      conditionForHome,
      isRequired,
    );


    /// WORK
    const conditionForWork = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.work);
    this.ContactMatrixForWork = new ContactMatrix(
      this.key,
      'ContactsWork',
      /*new Map([//['en', 'Indicate the number of contacts at work (per age category and gender)'],*/
        [
          {
            content: new Map([
              [
                'nl', `Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren `
              ]])
          },
          {
            date: SurveyEngine.timestampWithOffset({ days: -1 }),
            dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
            languageCodes: ['nl']
          },
          {
            content: new Map([
              ['nl', ` op je WERK hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Werk = je werk (bijv. klanten, collega's)`],
            ])
          }
        ],
      conditionForWork,
      isRequired
    );

    /// SCHOOL
    const conditionForSchool = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.school);
    this.ContactMatrixForSchool = new ContactMatrix(
      this.key,
      'ContactsSchool',
      /*new Map([['en', 'Indicate the number of contacts at school (per age category and gender)'],*/
        [
          {
            content: new Map([
              [
                'nl', `Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren `
              ]])
          },
          {
            date: SurveyEngine.timestampWithOffset({ days: -1 }),
            dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
            languageCodes: ['nl']
          },
          {
            content: new Map([
              ['nl', ` op SCHOOL hebt gesproken, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). School = onderwijsinstellingen (bijv. docenten, klasgenoten)`],
            ])
          }
        ],
        conditionForSchool,
      isRequired
    );

    /// LEISURE
    const conditionForLeisure = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.leisure);
    this.ContactMatrixForLeisure = new ContactMatrix(
      this.key,
      'ContactsLeisure',
      /*new Map([['en', 'Indicate the number of contacts during leisure (per age category and gender)'],*/
        [
          {
            content: new Map([
              [
                'nl', `Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren `
              ]])
          },
          {
            date: SurveyEngine.timestampWithOffset({ days: -1 }),
            dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
            languageCodes: ['nl']
          },
          {
            content: new Map([
              ['nl', ` tijdens VRIJE TIJD hebt gesproken en/of aangeraakt, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Vrije tijd = geplande activiteiten met anderen (bijv. mensen die je ontmoet in een café, sportschool of bij iemand anders thuis).`],
            ])
          }
        ],
      conditionForLeisure,
      isRequired
    );

    /// OTHER
    const conditionForOther = SurveyEngine.multipleChoice.any(this.Q2.key, this.Q2.optionKeys.other);
    this.ContactMatrixForOther = new ContactMatrix_other(
      this.key,
      'ContactsOther',
      /*new Map([['en', 'Indicate the number of contacts during other activities (per age category)'],*/
        [
          {
            content: new Map([
              [
                'nl', `Geef alsjeblieft het aantal personen aan (per leeftijdscategorie en geslacht) waarmee je gisteren `
              ]])
          },
          {
            date: SurveyEngine.timestampWithOffset({ days: -1 }),
            dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
            languageCodes: ['nl']
          },
          {
            content: new Map([
              ['nl', ` tijdens OVERIGE ACTIVITEITEN hebt gesproken en/of aangeraakt, of waarbij dichtbij bent geweest in dezelfde kamer (binnen 3 meter). Overige activiteiten = alle locaties die niet worden genoemd in de andere groepen (bijv. mensen die je ontmoet in het openbaar vervoer).`],
            ])
          }
        ],
      conditionForOther,
      isRequired
    );

    this.QFragile = new QFragile(this.key, isRequired)
  }

  buildGroup() {
    this.addItem(this.Infos.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addPageBreak();
    this.addItem(this.Instruct_contact.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForHome.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForWork.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForSchool.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForLeisure.get());
    this.addPageBreak();
    this.addItem(this.ContactMatrixForOther.get());
    this.addPageBreak();
    this.addItem(this.QFragile.get());
  }

  getPrefillRules(): Expression[] {
    return [
      /// HOME:
      ...this.ContactMatrixForHome.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForHome.key, `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForHome.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForHome.key, `rg.rm.${key}-${this.ContactMatrixForHome.columnInfos[1].key}`, '0')
      ),
      /// WORK:
      ...this.ContactMatrixForWork.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForWork.key, `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForWork.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForWork.key, `rg.rm.${key}-${this.ContactMatrixForWork.columnInfos[1].key}`, '0')
      ),
      /// SCHOOL:
      ...this.ContactMatrixForSchool.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForSchool.key, `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForSchool.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForSchool.key, `rg.rm.${key}-${this.ContactMatrixForSchool.columnInfos[1].key}`, '0')
      ),
      /// LEISURE:
      ...this.ContactMatrixForLeisure.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForLeisure.key, `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[0].key}`, '0')
      ),
      ...this.ContactMatrixForLeisure.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForLeisure.key, `rg.rm.${key}-${this.ContactMatrixForLeisure.columnInfos[1].key}`, '0')
      ),
      /// OTHER:
      ...this.ContactMatrixForOther.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForOther.key, `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[0].key}`, '0')
      ),
      //...this.ContactMatrixForOther.rowInfos.map(rowInfo => { return rowInfo.key; }).map(key =>
      //  StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.ContactMatrixForOther.key, `rg.rm.${key}-${this.ContactMatrixForOther.columnInfos[1].key}`, '0')
      //),
    ];
  }
}


class Intro extends Item {
  constructor(parentKey: string) {
    super(parentKey, 'Intro');
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
## Periodieke vragenlijst
Deze vragenlijst stellen we vier keer per jaar.
De vragenlijst gaat over vaccinatie, lange termijn klachten en de overdracht van luchtweginfecties.
            `],
          ]),
        })
      ]
    })
  }
}




class Infos extends Item {
  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Infos');
    this.condition = condition;
  }

  markdownContent = `
## Overdracht luchtweginfecties
Door informatie te delen over de plek, leeftijd en geslacht van personen met wie je spreekt of dichtbij bent, help je ons om de overdracht van luchtweginfecties beter te begrijpen en te voorspellen.
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
          className: ''
        })
      ]
    })
  }
}


class Instruct_contact extends Item {
  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Instruct_contact');
    this.condition = condition;
  }

  markdownContent = `
## Instructie
Per plek vragen we nu naar het aantal personen per geslacht en leeftijdscategorie.
Als er personen zijn die je op meerdere plekken in wilt vullen, vul deze alleen in op de plek met het langst durende contact. Bijvoorbeeld gezinsleden of huisgenoten die je thuis maar ook op een andere plek hebt gesproken vallen dan (waarschijnlijk) alleen onder thuis.
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
          className: ''
        })
      ]
    })
  }
}


const dropdownOptions = [
  { key: '0', label: new Map([["nl", "0"],]), },
  { key: '1', label: new Map([["nl", "1"],]), },
  { key: '2', label: new Map([["nl", "2"],]), },
  { key: '3', label: new Map([["nl", "3"],]), },
  { key: '4', label: new Map([["nl", "4"],]), },
  { key: '5', label: new Map([["nl", "5"],]), },
  { key: '6', label: new Map([["nl", "6"],]), },
  { key: '8', label: new Map([["nl", "7-9"],]), },
  { key: '12', label: new Map([["nl", "10-14"],]), },
  { key: '17', label: new Map([["nl", "15-19"],]), },
  { key: '25', label: new Map([["nl", "20-30"],]), },
  { key: '40', label: new Map([["nl", "31-49"],]), },
  { key: '50+', label: new Map([["nl", "50+"],]), },
];



class ContactMatrix extends Item {
  qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[];

  rowInfos: Array<{ key: string, label: Map<string, string> }> = [
    {
      key: 'r1', label: new Map([
        ["nl", "0-3 jaar"],
      ]),
    },
    {
      key: 'r2', label: new Map([
        ["nl", "4-6 jaar"],
      ]),
    },
    {
      key: 'r3', label: new Map([
        ["nl", "7-12 jaar"],
      ]),
    },
    {
      key: 'r4', label: new Map([
        ["nl", "13-18 jaar"],
      ]),
    },
    {
      key: 'r5', label: new Map([
        ["nl", "19-29 jaar"],
      ]),
    },
    {
      key: 'r6', label: new Map([
        ["nl", "30-39 jaar"],
      ]),
    },
    {
      key: 'r7', label: new Map([
        ["nl", "40-49 jaar"],
      ]),
    },
    {
      key: 'r8', label: new Map([
        ["nl", "50-59 jaar"],

      ]),
    },
    {
      key: 'r9', label: new Map([
        ["nl", "60-69 jaar"],
      ]),
    },
    {
      key: 'r10', label: new Map([
        ["nl", "70-79 jaar"],
      ]),
    },
    {
      key: 'r11', label: new Map([
        ["nl", "80-89 jaar"],
      ]),
    },
    {
      key: 'r12', label: new Map([
        ["nl", "90+ jaar"],
      ]),
    },
  ];

  columnInfos: Array<{ key: string, label: Map<string, string> }> = [
    {
      key: 'f', label: new Map([
        ["nl", "Vrouw"],
      ]),
    },
    {
      key: 'm', label: new Map([
        ["nl", "Man"],
      ]),
    }
  ];

  constructor(parentKey: string,
    itemKey: string,
    qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[],
    condition: Expression,
    isRequired?: boolean) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }

  generateRows() {
    const rowCategories = this.rowInfos.map(row => {
      return {
        key: row.key, role: 'row', label: row.label,
      }
    });

    const rows: any[] = [];
    rowCategories.forEach(row => {
      rows.push(row);
    })

    return rows;
  }

  validationRules(): Validation[] {
    return [
      {
        key: 'v1',
        type: 'hard',
        // at least one value is not 0
        rule: SurveyEngine.logic.or(
          ...this.rowInfos.map(row => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(this.key, `rg.rm.${row.key}-${this.columnInfos[0].key}`),
                '0'
              )
            )
          }),
          ...this.rowInfos.map(row => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(this.key, `rg.rm.${row.key}-${this.columnInfos[1].key}`),
                '0'
              )
            )
          })
        )
      }
    ];
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.responsiveMatrix({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
      responseType: 'dropdown',
      breakpoint: 'sm',
      columns: this.columnInfos,
      rows: this.generateRows(),
      dropdownConfig: {
        unselectedLabeL: new Map([
          ["nl", "Selecteer een optie"],
        ]),
        options: dropdownOptions
      },
      customValidations: this.validationRules(),
    })
  }
}


class ProtectionUsage extends Item {
  qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[];

  constructor(parentKey: string,
    itemKey: string,
    qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[],
    condition: Expression,
    isRequired?: boolean) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }

  buildItem(): SurveySingleItem {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
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
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Dit weet ik niet meer."],
          ])
        },
      ]
    })
  }
}


class Q1 extends Item {

  optionKeys = {
    yes: '1',
    no: '0',
    other: '3',
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'Q1');
    this.isRequired = isRequired;
  }


  buildItem(): SurveySingleItem {

    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Heb je gisteren `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -1 }),
          dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', ' met tenminste één ander persoon gesproken en/of aangeraakt, of ben je dichtbij een ander geweest in dezelfde kamer (binnen 3 meter)?'],
          ])
        }
      ],
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, ik heb met tenminste één ander persoon gesproken en/of aangeraakt, of ben dichtbij een ander geweest in dezelfde kamer (binnen 3 meter)."],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee, ik heb met niemand gesproken en/of aangeraakt, en ik ben NIET dichtbij iemand anders geweest in dezelfde kamer (binnen 3 meter)."],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["nl", "Dat wil ik liever niet zeggen"],
          ])
        }
      ]
    });
  }
}

class Q2 extends Item {
  optionKeys = {
    home: '1',
    work: '2',
    school: '3',
    leisure: '4',
    other: '5',
  };

  constructor(parentKey: string, condition: Expression, isRequired?: boolean) {
    super(parentKey, 'Q2');
    this.isRequired = isRequired;
    this.condition = condition;
  }


  buildItem(): SurveySingleItem {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ["nl", "Selecteer alsjeblieft alle plekken waar je tenminste met één persoon hebt gesproken en/of aangeraakt, of dichtbij bent geweest in dezelfde kamer (binnen 3 meter)?"],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.home, role: 'option',
          content: new Map([
            ["nl", "Thuis: je woning (bijv. gezinsleden, bezoekers)."],
          ])
        },
        {
          key: this.optionKeys.work, role: 'option',
          content: new Map([
            ["nl", "Werk: je werk (bijv. klanten, collega's)"],
          ])
        },
        {
          key: this.optionKeys.school, role: 'option',
          content: new Map([
            ["nl", "School: onderwijsinstellingen (bijv. docenten, klasgenoten)"],
          ])
        },
        {
          key: this.optionKeys.leisure, role: 'option',
          content: new Map([
            ["nl", "Vrije tijd: geplande activiteiten met anderen (bijv. mensen die je ontmoet in een café, wandeling, sport(school) of bij iemand anders thuis)."],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["nl", "Overige activiteiten: alle locaties die hierboven niet worden genoemd (bijv. mensen die je ontmoet in het openbaar vervoer of winkel)."],
          ])
        }
      ]
    })
  }
}


class QFragile extends Item {

  optionKeys = {
    no: '0',
  };

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'QFragile');
    this.isRequired = isRequired;
  }

  buildItem(): SurveySingleItem {

    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
        [
          {
            content: new Map([
              ['nl', `Heb je gisteren `],
            ])
          },
          {
            date: SurveyEngine.timestampWithOffset({ days: -1 }),
            dateFormat: '(EEEE) ', /*'EEEE dd.MM,',*/
            languageCodes: ['nl']
          },
          {
            content: new Map([
              ['nl', ' een instelling met (veel) kwetsbare mensen bezocht?'],
            ])
          }
        ],
      questionSubText: new Map([
          ["nl", "Kwetsbare mensen zijn mensen met een extra hoog risico voor ernstige klachten bij een besmetting"],
        ]),
      responseOptions: [
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, '1', '2', '3', '4', '5', 'other')
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ja, een verpleeg- of verzorgingstehuis"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ja, een instelling voor begeleid wonen"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ja, een ziekenhuis"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Ja, een zorginstelling anders dan een ziekenhuis (bijvoorbeeld huisarts, fysiotherapeut, vaccinatiekliniek)"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ja, een hospice"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
        {
          key: 'other', role: 'input',
          style: [{ key: 'maxLength', value: '160' }],
          content: new Map([
            ["nl", "Anders: "],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no)
        },
      ]
    })
  }
}


class ContactMatrix_other extends Item {
  qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[];
  rowInfos: Array<{ key: string, label: Map<string, string> }> = [
    { key: 'ro1', label: new Map([["nl", "0-3 jaar"],]), },
    { key: 'ro2', label: new Map([["nl", "4-12 jaar"],]), },
    { key: 'ro3', label: new Map([["nl", "13-18 jaar"],]), },
    { key: 'ro4', label: new Map([["nl", "19-39 jaar"],]), },
    { key: 'ro5', label: new Map([["nl", "40-59 jaar"],]), },
    { key: 'ro6', label: new Map([["nl", "60-79 jaar"],]), },
    { key: 'ro7', label: new Map([["nl", "80+ jaar"],]), },
  ];
  columnInfos: Array<{ key: string, label: Map<string, string> }> = [
    { key: 'mf', label: new Map([["nl", "Aantal personen"],]), },
  ];
  constructor(parentKey: string, itemKey: string, qText: Map<string, string> | (StyledTextComponentProp | DateDisplayComponentProp)[], condition: Expression, isRequired?: boolean) {
    super(parentKey, itemKey);
    this.isRequired = isRequired;
    this.condition = condition;
    this.qText = qText;
  }
  generateRows() {
    const rowCategories = this.rowInfos.map(row => {
      return { key: row.key, role: 'row', label: row.label, }
    });
    const rows: any[] = [];
    rowCategories.forEach(row => {
      rows.push(row);
    })
    return rows;
  }
  validationRules(): Validation[] {
    return [
      {
        key: 'v1',
        type: 'hard',
        // at least one value is not 0
        rule: SurveyEngine.logic.or(
          ...this.rowInfos.map(row => {
            return SurveyEngine.logic.not(
              SurveyEngine.compare.eq(
                SurveyEngine.getResponseValueAsStr(this.key, `rg.rm.${row.key}-${this.columnInfos[0].key}`),
                '0'
              )
            )
          })
        )
      }
    ];
  }
  buildItem(): SurveySingleItem {
    return SurveyItems.responsiveMatrix({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.qText,
      responseType: 'dropdown',
      breakpoint: 'sm',
      columns: this.columnInfos,
      rows: this.generateRows(),
      dropdownConfig: {
        unselectedLabeL: new Map([
          ["nl", "Selecteer een optie"],
        ]),
        options: dropdownOptions
      },
      customValidations: this.validationRules(),
    })
  }
}
