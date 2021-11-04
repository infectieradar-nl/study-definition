import { Expression } from "survey-engine/lib/data_types";
import { SurveyEngine } from "../../../case-editor/expression-utils/surveyEngineExpressions";
import { Item } from "../../../case-editor/types/item";
import { ComponentGenerators } from "../../../case-editor/utils/componentGenerators";
import { SurveyItemGenerators } from "../../../case-editor/utils/question-type-generator";

export class Q1aNL extends Item {
    optionKeys = {
        selfTest: '3'
    }

    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q1aNL');
        this.isRequired = isRequired;
    }

    buildItem() {
        const optionDisabled = SurveyEngine.multipleChoice.any(
            this.key, '0'
        );

        return SurveyItemGenerators.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you receive a corona test result since the last survey? (positive or negative?"],
                ["nl", "Heb je sinds de vorige vragenlijst een testuitslag (positief of negatief) gehad voor het nieuwe coronavirus? Meerdere antwoorden mogelijk"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
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
                    key: '1', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Yes, I received the result of a throat/nose swap (PCR)"],
                        ["nl", "Ja, ik heb een testuitslag gehad voor een keel/neus slijmvliestest (PCR/sneltest, geen zelftest)"],
                    ])
                },
                {
                    key: '2', role: 'option',
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
        return SurveyItemGenerators.display({
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
        return SurveyItemGenerators.singleChoice({
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
        positive: '1'
    }

    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1b3NL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "What was your self-test result?"],
                ["nl", "Wat was de uitslag van de zelftest? Wanneer je meerdere zelftesten hebt gedaan en één daarvan was positief, vul dan hier 'positief' in."],
                ["fr", " Quel a été votre température mesurée la plus élevée?"],
            ]),
            responseOptions: [
                {
                    key: this.optionKeys.positive, role: 'option',
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
                        ["en", "I prever not to say"],
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
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "What was the date of the positive selftest? Please guess if you can't remember the date exactly."],
                ["nl", "Wat was de datum van de positieve zelftest? Als je de datum niet meer precies weet mag je deze schatten."],
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

export class Q1jNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1jNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you confirm your testresult of the self test?"],
                ["nl", "Heb je de uitslag van de zelftest laten bevestigen bij een GGD teststraat of ziekenhuis/huisarts?"],
            ]),
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
                        ["en", "Yes, the result was the same"],
                        ["nl", "Ja, de uitslag was hetzelfde"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "Yes, the result was different"],
                        ["nl", "Ja, de uitslag was anders"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "Yes, I'm still waiting for the result"],
                        ["nl", "Ja, ik wacht nog op de uitslag"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "I'm still planning to get my test result confirmed"],
                        ["nl", "Dit ben ik nog van plan"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "I don't want to answer this question"],
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ]
        })
    }
}