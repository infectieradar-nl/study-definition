import { Expression } from "survey-engine/lib/data_types";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";


export class Q1aNL extends Item {
    optionKeys = {
        selfTest: '3',
        pcr: '1',
        blood: '2',
    }

    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q1aNL');
        this.isRequired = isRequired;
    }

    buildItem() {
        const optionDisabled = SurveyEngine.multipleChoice.any(
            this.key, '0'
        );

        return SurveyItems.multipleChoice({
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
                    key: this.optionKeys.pcr, role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Yes, I received the result of a throat/nose swap (PCR)"],
                        ["nl", "Ja, ik heb een testuitslag gehad voor een keel/neus slijmvliestest (PCR/sneltest, geen zelftest)"],
                    ])
                },
                {
                    key: this.optionKeys.blood, role: 'option',
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
        return SurveyItems.display({
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
        return SurveyItems.singleChoice({
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
        return SurveyItems.singleChoice({
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
        return SurveyItems.singleChoice({
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
        return SurveyItems.singleChoice({
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

export class Q3title extends Item {
    constructor(parentKey: string, condition: Expression) {
        super(parentKey, 'Q3title');
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
                        ["en", "The following questions are about the nose/throat swab"],
                        ["nl", "De volgende vragen gaan over de keel/neus slijmvliestest"],
                    ])
                })
            ]
        })
    }
}

export class Q1d1NL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1d1NL');
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
                ["en", "What was the date of the nose/throat swab? Please guess if you can't remember the date exactly."],
                ["nl", "Wat was de datum van de keel/neus slijmvliestest? Als je de datum niet meer precies weet mag je deze schatten."],
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

export class Q1cNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1cNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.dropDown({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "How many days after your first symptoms was the swap/sample taken?"],
                ["nl", "Hoeveel dagen na de eerste klachten ben je getest?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option', content: new Map([
                        ["en", "Not applicable, I did not have any symptoms"],
                        ["nl", "Niet van toepassing, ik had/heb geen symptomen"],
                    ]),
                },
                {
                    key: '1', role: 'option', content: new Map([
                        ["en", "On the same day as the first symptoms"],
                        ["nl", "Op dezelfde dag als de eerste klachten"],
                    ]),
                },
                {
                    key: '2', role: 'option', content: new Map([
                        ["en", "1 day"],
                        ["nl", "1 dag"],
                        ["fr", "1 jour"],
                    ]),
                },
                {
                    key: '3', role: 'option', content: new Map([
                        ["en", "2 days"],
                        ["nl", "2 dagen"],
                        ["fr", "2 jours"],
                    ]),
                },
                {
                    key: '4', role: 'option', content: new Map([
                        ["en", "3 days"],
                        ["nl", "3 dagen"],
                        ["fr", "3 jours"],
                    ]),
                },
                {
                    key: '5', role: 'option', content: new Map([
                        ["en", "4 days"],
                        ["nl", "4 dagen"],
                        ["fr", "4 jours"],
                    ]),
                },
                {
                    key: '6', role: 'option', content: new Map([
                        ["en", "5 days"],
                        ["nl", "5 dagen"],
                        ["fr", "5 jours"],
                    ]),
                },
                {
                    key: '7', role: 'option', content: new Map([
                        ["en", "6 days"],
                        ["nl", "6 dagen"],
                        ["fr", "6 jours"],
                    ]),
                },
                {
                    key: '8', role: 'option', content: new Map([
                        ["en", "7 days"],
                        ["nl", "7 dagen"],
                        ["fr", "7 jours"],
                    ]),
                },
                {
                    key: '9', role: 'option', content: new Map([
                        ["en", "8 days"],
                        ["nl", "8 dagen"],
                        ["fr", "8 jours"],
                    ]),
                },
                {
                    key: '10', role: 'option', content: new Map([
                        ["en", "9 days"],
                        ["nl", "9 dagen"],
                        ["fr", "9 jours"],
                    ]),
                },
                {
                    key: '11', role: 'option', content: new Map([
                        ["en", "10 days"],
                        ["nl", "10 dagen"],
                        ["fr", "10 jours"],
                    ]),
                },
                {
                    key: '12', role: 'option', content: new Map([
                        ["en", "11 days"],
                        ["nl", "11 dagen"],
                        ["fr", "11 jours"],
                    ]),
                },
                {
                    key: '13', role: 'option', content: new Map([
                        ["en", "12 days"],
                        ["nl", "12 dagen"],
                        ["fr", "12 jours"],
                    ]),
                },
                {
                    key: '14', role: 'option', content: new Map([
                        ["en", "13 days"],
                        ["nl", "13 dagen"],
                        ["fr", "13 jours"],
                    ]),
                },
                {
                    key: '15', role: 'option', content: new Map([
                        ["en", "14 days"],
                        ["nl", "14 dagen"],
                        ["fr", "14 jours"],
                    ]),
                },
                {
                    key: '16', role: 'option', content: new Map([
                        ["en", "More than 14 days"],
                        ["nl", "meer dan 14 dagen"],
                        ["fr", "Plus de 14 jours"],
                    ]),
                },
                {
                    key: '17', role: 'option', content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Dat weet ik niet (meer)"],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                    ]),
                },
            ]
        })
    }
}

export class Q1eNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1eNL');
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
                ["en", "In the two weeks before your test were you approached in the context of contact-tracing by the GGD (local public health service)?"],
                ["nl", "Ben je in de twee weken voor je test benaderd door de GGD in verband met contactonderzoek?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "No, I have not been contacted"],
                        ["nl", "Nee, ik ben niet door de GGD benaderd in verband met contactonderzoek"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "Yes, I am contacted"],
                        ["nl", "Ja, ik ben wel door de GGD benaderd in verband met contactonderzoek"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "I don't want to say"],
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ]
        })
    }
}

export class Q1fNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1fNL');
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
                ["en", "In the two weeks before your test were you warned by the mobile phone app CoronaMelder?"],
                ["nl", "Ben je in de twee weken voor je test gewaarschuwd door de mobiele telefoon app CoronaMelder?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "No, I don't have the CoronaMelder app installed on my phone"],
                        ["nl", "Nee, ik heb de app CoronaMelder niet geïnstalleerd op mijn mobiel."],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "No, I have the app installed, but haven't been warned"],
                        ["nl", "Nee, ik heb de app CoronaMelder wel geïnstalleerd op mijn mobiel maar ben niet gewaarschuwd."],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "Yes, I have the app installed and have been warned"],
                        ["nl", "Ja, ik heb de app CoronaMelder geïnstalleerd op mijn mobiel en ik ben gewaarschuwd."],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "I don't want to say"],
                        ["nl", "Dit wil ik niet aangeven"],
                    ])
                },
            ]
        })
    }
}

export class Q1gNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1gNL');
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
                ["en", "Where did you get yourself tested?"],
                ["nl", "Waar heb je jezelf (de laatste keer) laten testen?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Hospital or general practitioner"],
                        ["nl", "Ziekenhuis of huisarts"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "GGD testing facility"],
                        ["nl", "GGD teststraat"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "GGD testing facility for health care workers and teachers"],
                        ["nl", "GGD teststraat via de prioriteitsregeling voor zorgmedewerkers en leraren"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "GGD visited my home address"],
                        ["nl", "GGD is langs geweest"],
                    ])
                },
                {
                    key: '9', role: 'option',
                    content: new Map([
                        ["en", "At a specific testing facility for Testen voor Toegang"],
                        ["nl", "Bij een speciale teststraat voor Testen voor Toegang"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "At a commercial company (own initiative)"],
                        ["nl", "Bij een bedrijf (op eigen initiatief)"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    content: new Map([
                        ["en", "At a commercial company (via employer)"],
                        ["nl", "Bij een bedrijf (via mijn werkgever)"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    content: new Map([
                        ["en", "Abroad"],
                        ["nl", "In het buitenland"],
                    ])
                },
                {
                    key: '8', role: 'option',
                    content: new Map([
                        ["en", "I don't know"],
                        ["nl", "Dat weet ik niet meer"],
                    ])
                },
            ]
        })
    }
}

export class Q1hNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1hNL');
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
                ["en", "Did you pay for the test?"],
                ["nl", "Heb je zelf betaald voor de test?"],
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
                        ["en", "Yes"],
                        ["nl", "Ja"],
                    ])
                },
            ]
        })
    }
}

export class Q1b1NL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1b1NL');
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
                ["en", "What was your nose/throat swab test result?"],
                ["nl", "Wat was de uitslag van de keel/neus slijmvliestest?"],
                ["fr", " Quel a été votre température mesurée la plus élevée?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
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

export class Q1iNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1iNL');
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
                ["en", "How many hours after the test did you get the results?"],
                ["nl", "Hoeveel uur na de test heb je de uitslag gekregen?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option', content: new Map([
                        ["nl", "Binnen 1 uur"],
                    ])
                },
                {
                    key: '2', role: 'option', content: new Map([
                        ["nl", "Tussen 1 - 4 uur"],
                    ])
                },
                {
                    key: '3', role: 'option', content: new Map([
                        ["nl", "Tussen 4 - 24 uur"],
                    ])
                },
                {
                    key: '4', role: 'option', content: new Map([
                        ["nl", "Tussen 24 - 48 uur"],
                    ])
                },
                {
                    key: '5', role: 'option', content: new Map([
                        ["nl", "Na 48 uur"],
                    ])
                },
            ]
        })
    }
}

export class Q4title extends Item {
    constructor(parentKey: string, condition: Expression) {
        super(parentKey, 'Q4title');
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
                        ["en", "The following questions are about the bloodtest"],
                        ["nl", "De volgende vragen gaan over de bloedtest"],
                    ])
                })
            ]
        })
    }
}

export class Q1dNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1dNL');
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
                ["en", "On which day was the blood taken for the corona test? Please guess if you can't remember the date exactly."],
                ["nl", "Wanneer is de bloedtest voor het coronavirus bij je gedaan? Als je de datum niet meer precies weet mag je deze schatten. Het gaat om de datum dat je bloed is afgenomen."],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'dateInput',
                    optionProps: {
                        min: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: -14776000 }) },
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

export class Q1b2NL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q1b2NL');
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
                ["en", "What was your blood-test result?"],
                ["nl", "Wat was de uitslag van de bloedtest?"],
                ["fr", " Quel a été votre température mesurée la plus élevée?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
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
