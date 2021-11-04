import { Expression } from "survey-engine/lib/data_types";
import { SurveyEngine } from "../../../case-editor/expression-utils/surveyEngineExpressions";
import { Group } from "../../../case-editor/types/group";
import { Item } from "../../../case-editor/types/item";
import { ComponentGenerators } from "../../../case-editor/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../case-editor/utils/question-type-generator";



export class HasSymptomsGroup extends Group {
    /*
    Q1: QuestionAboutMedicalHistory;
    Q3: LymeGroup;
    */
    Q4: Q4;

    constructor(parentKey: string, groupCondition: Expression) {
        super(parentKey, 'G3');

        this.groupEditor.setCondition(groupCondition);

        const isRequired = true;

        /*this.Q1 = new QuestionAboutMedicalHistory(this.key, false, q1Condition);
        this.Q3 = new LymeGroup(this.key);*/
        this.Q4 = new Q4(this.key, isRequired);
    }

    buildGroup() {
        this.addItem(this.Q4.get());
        //this.addPageBreak();
        //this.addItem(this.Q3.get());
    }
}

export class SymptomsGroup extends Group {
    Title: SymptomsTitle;
    QSymptoms: SymptomsQuestion;

    constructor(parentKey: string) {
        super(parentKey, 'q1')

        this.Title = new SymptomsTitle(this.key);
        this.QSymptoms = new SymptomsQuestion(this.key, true);
    }

    buildGroup() {
        this.addItem(this.Title.get());
        this.addItem(this.QSymptoms.get())
    }
}

class SymptomsTitle extends Item {
    constructor(parentKey: string) {
        super(parentKey, '1');
    }

    buildItem() {
        return SurveyItemGenerators.display({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            condition: this.condition,
            content: [
                ComponentGenerators.text({
                    content: new Map([
                        ["en", "Please choose if you had any of the following symptoms since your last survey."],
                        ["nl", "Geef alsjeblieft aan of je geen of tenminste één van de volgende klachten hebt gehad in de afgelopen week"],
                    ])
                }),
            ]
        })
    }
}

class SymptomsQuestion extends Item {
    optionKeys = {
        no: '0'
    }

    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, '1');
        this.isRequired = isRequired;
    }

    buildItem() {
        const optionDisabled = SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no);

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you have any general symptoms such as"],
                ["nl", "Had je in de afgelopen week geen, één of meerdere van deze klachten? (chronische klachten hoeven hier niet gemeld te worden)"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option', content: new Map([
                        ["en", "No symptoms"],
                        ["nl", "Nee, geen van deze klachten"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Fever"],
                        ["nl", "Koorts"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Chills"],
                        ["nl", "Koude rillingen"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Runny or blocked nose"],
                        ["nl", "Loopneus of verstopte neus"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Sneezing"],
                        ['nl', "Niezen"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Sore throat"],
                        ["nl", "Zere keel"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Cough"],
                        ["nl", "Hoesten"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Shortness of breath"],
                        ["nl", "Kortademig (snel buiten adem)"],
                    ])
                },
                {
                    key: '8', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Headache"],
                        ["nl", "Hoofdpijn"],
                    ])
                },
                {
                    key: '9', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Muscle/joint pain"],
                        ["nl", "Spierpijn/Gewrichtspijn (niet sportgerelateerd)"],
                    ])
                },
                {
                    key: '10', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Chest pain"],
                        ["nl", "Pijn op de borst"],
                    ])
                },
                {
                    key: '11', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Feeling tired or exhausted (malaise)"],
                        ["nl", "Vermoeid en lamlendig (algehele malaise)"],
                    ])
                },
                {
                    key: '12', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Loss of appetite"],
                        ["nl", "Verminderde eetlust"],
                    ])
                },
                {
                    key: '13', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Coloured sputum/phlegm"],
                        ["nl", "Verkleurd slijm"],
                    ])
                },
                {
                    key: '14', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Watery, bloodshot eyes"],
                        ["nl", "Waterige of bloeddoorlopen ogen"],
                    ])
                },
                {
                    key: '15', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Nausea"],
                        ["nl", "Misselijkheid"],
                    ])
                },
                {
                    key: '16', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Vomiting"],
                        ["nl", "Overgeven"],
                    ])
                },
                {
                    key: '17', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Diarrhoea (at least three times a day)"],
                        ["nl", "Diarree (minstens 3 keer per dag)"],
                    ])
                },
                {
                    key: '18', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Stomach ache"],
                        ["nl", "Buikpijn"],
                    ])
                },
                {
                    key: '19', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Loss of smell"],
                        ["nl", "Geen reuk"],
                    ])
                },
                {
                    key: '20', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Loss of taste"],
                        ["nl", "Geen smaak"],
                    ])
                },
                {
                    key: '21', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Nose bleed"],
                        ["nl", "Bloedneus"],
                    ])
                },
                {
                    key: '22', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Rash"],
                        ["nl", "Huiduitslag"],
                    ])
                },
            ],
        })
    }
}


class Q4 extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q4');

        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([['en', 'TODO']]),
            responseOptions: [],
            /*
            content: new Map([
                ['en', 'Hello']
            ]),*/
        })
    }
}

export class FinalText extends Item {
    constructor(parentKey: string) {
        super(parentKey, 'FinalText');
    }

    buildItem() {
        return SurveyItemGenerators.surveyEnd(
            this.parentKey,
            new Map([
                //["en", "This was all for now, please submit your responses. By filling out this survey regularly (eg. weekly), you can help us fight the virus."],
                ["nl", "Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Dank voor het invullen. Volgende week vragen we je weer."],
            ]),
            this.condition,
        )
    }
}