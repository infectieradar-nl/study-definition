import { Expression } from "survey-engine/lib/data_types";
import { SurveyEngine } from "../../../case-editor/expression-utils/surveyEngineExpressions";
import { Item } from "../../../case-editor/types/item";
import { SurveyItemGenerators } from "../../../case-editor/utils/question-type-generator";

export class Q2NL extends Item {
    constructor(parentKey: string, isRequired?: boolean) {
        super(parentKey, 'Q2NL');
        this.isRequired = isRequired;
    }

    buildItem() {
        const itemCondition = SurveyEngine.logic.and(
            SurveyEngine.logic.not(SurveyEngine.hasParticipantFlag('21-vacc', 'full')),
            SurveyEngine.logic.not(SurveyEngine.hasParticipantFlag('21-vacc', 'never')),
        )

        return SurveyItemGenerators.singleChoice({
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
                {
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
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "Not applicable, I am fully vaccinated and not planning to get a third booster vaccination"],
                        ["nl", "Niet meer van toepassing: ik ben volledig gevaccineerd en niet van plan om een derde (booster) vaccinatie te nemen"],
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
                    ["nl", "Om een overzicht te krijgen hoeveel mensen binnen infectieradar al gevaccineerd zijn"],
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
                // style: [{ key: 'variant', value: 'p' }],
            },
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
        return SurveyItemGenerators.multipleChoice({
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

export class Q2bNL extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q2bNL');
        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItemGenerators.dateInput({
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

export class Q2cNL extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q2cNL');
        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItemGenerators.multipleChoice({
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
