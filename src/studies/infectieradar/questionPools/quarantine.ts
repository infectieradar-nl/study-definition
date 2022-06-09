import { Expression } from "survey-engine/data_types";
import { Item } from "case-editor-tools/surveys/types";
import { SurveyItems } from "case-editor-tools/surveys";

export class Q12NL extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q12NL');
        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["nl", "Heb je de afgelopen week in quarantaine gezeten?"],
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

    getHelpGroupContent() {
        return [
            {
                content: new Map([
                    ["nl", "Verschil tussen quarantaine en isolatie"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["nl", "Er is een belangrijk verschil tussen quarantaine en isolatie. Als je een positieve testuitslag krijgt, heb je COVID-19. Je bent dan een aantal dagen besmettelijk en gaat daarom in isolatie. Dit betekent dat je je afzondert om te voorkomen dat je andere mensen besmet. Nadat je hebt gehoord dat jouw huisgenoot of een nauw contact corona heeft en zelf misschien ook besmet bent ga je in quarantaine. Dit doe je uit voorzorg, zodat als je inderdaad besmet bent geraakt, het virus zich niet verder verspreidt."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

export class Q12aNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q12aNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            //helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["nl", "Zit je vandaag nog in quarantaine?"],
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

export class Q12bNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q12bNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            //helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["nl", "Heb je door de quarantaine de afgelopen week tenminste 1 dag niet kunnen werken of niet naar school gekund?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik heb dag(en) werk/school gemist"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Nee (ik kon bijvoorbeeld thuiswerken, online de les volgen)"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Niet van toepassing, afgelopen week had ik geen werk/school; bijvoorbeeld pensioen/vakantie/langdurig ziek etc.)"],
                    ])
                },
            ]
        })
    }

}

export class Q12cNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q12cNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            //helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["nl", "Heb je de afgelopen week ten minste 1 dag niet kunnen werken of niet naar school gekund om een andere reden dan quarantaine?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Niet van toepassing, afgelopen week had ik geen werk/school; bijvoorbeeld pensioen/vakantie/langdurig ziek etc.)"],
                    ])
                },
            ]
        })
    }

}

export class Q12dNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q12dNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            //helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["nl", "Heb je vandaag nog steeds niet kunnen werken of naar school kunnen gaan?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik ben vandaag niet aan het werk/naar school"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["nl", "Nee (ik kon bijvoorbeeld thuiswerken, online de les volgen)"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["nl", "Niet van toepassing, ik hoef vandaag niet te werken of naar school"],
                    ])
                },
            ]
        })
    }

}