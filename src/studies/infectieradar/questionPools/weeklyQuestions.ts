import { Expression } from "survey-engine/lib/data_types";
import { matrixKey, responseGroupKey } from "case-editor-tools/constants/key-definitions";
import { ItemEditor } from "case-editor-tools/surveys/survey-editor/item-editor";
import { Item, Group } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { initMatrixQuestion, ResponseRowCell } from "case-editor-tools/surveys/survey-items";
import { SurveyItems, SurveyEngine } from "case-editor-tools/surveys";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "case-editor-tools/surveys/utils/simple-generators";
import { ParticipantFlags } from "../participantFlags";




export class HasSymptomsGroup extends Group {
    Q2: Q2;
    Q3: Q3;
    Q4: Q4;
    Q5: Q5;
    FeverGroup: FeverGroup; // Q6 fever group
    ContactGroup: ContactGroup; // contact
    Q9: Q9;
    Q9b: Q9b;
    Q10NL: Q10NL;
    Q10bNL: Q10bNL;
    Q10cNL: Q10cNL;
    Q11: Q11;



    constructor(parentKey: string, groupCondition: Expression, hasFeverCondition: Expression) {
        super(parentKey, 'HS');

        this.groupEditor.setCondition(groupCondition);

        this.Q2 = new Q2(this.key, true);
        this.Q3 = new Q3(this.key,
            SurveyEngine.logic.or(
                SurveyEngine.logic.not(SurveyEngine.hasResponse(this.Q2.key, 'rg.scg')),
                SurveyEngine.singleChoice.none(this.Q2.key, this.Q2.optionsKey.yes)
            ), true);
        this.Q4 = new Q4(this.key, this.Q3.key, true);
        this.Q5 = new Q5(this.key, true);
        this.FeverGroup = new FeverGroup(this.key, hasFeverCondition);
        this.ContactGroup = new ContactGroup(this.key);
        this.Q9 = new Q9(this.key, true);
        this.Q9b = new Q9b(this.key, SurveyEngine.multipleChoice.any(this.Q9.key, this.Q9.optionKeys.antivirals), true);
        this.Q10NL = new Q10NL(this.key, true);
        const conditionForTimeOffwork = SurveyEngine.singleChoice.any(this.Q10NL.key, this.Q10NL.optionKeys.yes)
        this.Q10bNL = new Q10bNL(this.key, conditionForTimeOffwork, true);
        this.Q10cNL = new Q10cNL(this.key, conditionForTimeOffwork, true);
        this.Q11 = new Q11(this.key, true);


    }

    buildGroup() {
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.FeverGroup.get());
        this.addItem(this.ContactGroup.get());
        this.addItem(this.Q9.get());
        this.addItem(this.Q9b.get());
        this.addItem(this.Q10NL.get());
        this.addItem(this.Q10bNL.get());
        this.addItem(this.Q10cNL.get());
        this.addItem(this.Q11.get());


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
        super(parentKey, 'title');
    }

    buildItem() {
        return SurveyItems.display({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            condition: this.condition,
            content: [
                ComponentGenerators.text({
                    content: new Map([
                        ["en", "Please choose if you had any of the following symptoms since your last survey."],
                        ["nl", "Geef alsjeblieft aan of je geen of tenminste ????n van de volgende klachten hebt gehad in de afgelopen week"],
                    ])
                }),
            ]
        })
    }
}

class SymptomsQuestion extends Item {
    optionKeys = {
        no: '0',
        fever: '1',
    }

    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, '1');
        this.isRequired = isRequired;
    }

    buildItem() {
        const optionDisabled = SurveyEngine.multipleChoice.any(this.key, this.optionKeys.no);

        return SurveyItems.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you have any general symptoms such as"],
                ["nl", "Had je in de afgelopen week geen, ????n of meerdere van deze klachten? (chronische klachten hoeven hier niet gemeld te worden)"],
            ]),
            responseOptions: [
                {
                    key: this.optionKeys.no, role: 'option', content: new Map([
                        ["en", "No symptoms"],
                        ["nl", "Nee, geen van deze klachten"],
                    ])
                },
                {
                    key: this.optionKeys.fever, role: 'option',
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


class Q2 extends Item {
    optionsKey = {
        no: '1',
        yes: '0',
    }
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q2');

        this.isRequired = isRequired;
        this.condition = SurveyEngine.hasParticipantFlag(ParticipantFlags.hasOnGoingSymptoms.key, ParticipantFlags.hasOnGoingSymptoms.values.yes);
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "On your last visit, you reported that you were still ill. Are the symptoms you report today part of the same bout of illness?"],
                ["nl", "In je laatste vragenlijst gaf je aan nog steeds klachten te hebben. Behoren de klachten die je nu meldt tot dezelfde klachtenperiode als de klachten die je de vorige keer al gemeld had?"],
            ]),
            responseOptions: [
                {
                    key: this.optionsKey.yes, role: 'option',
                    content: new Map([
                        ["en", "Yes"],
                        ["nl", "Ja"],

                    ])
                },
                {
                    key: this.optionsKey.no, role: 'option',
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Ik weet het niet (meer)."],
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
                    ["en", "To make filling out the rest of the survey quicker for you."],
                    ["nl", "Om te bepalen of je klachten worden veroorzaakt door (mogelijk) een nieuwe of dezelfde infectie als de vorige keer."],
                    ["fr", "Afin que vous puissiez remplir le reste de l'enqu??te plus rapidement."],
                    ["nl-be", "Om het invullen van de rest van de vragenlijst te versnellen."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                    ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "If you believe that the symptoms you have reported today are caused by the same bout of illness as your previous symptoms, please tick ???yes???."],
                    ["nl", "Als je denkt dat de klachten die je vandaag raporteert nog worden veroorzaakt door dezelfde infectie/probleem (dezelfde klachtenperiode), beantwoord dan de vraag met 'Ja'"],
                    ["fr", "Si vous pensez que les sympt??mes que vous avez d??clar??s aujourd'hui sont caus??s par le m??me ??pisode de maladie que vos sympt??mes pr??c??dents, s'il vous pla??t cochez ??oui?? . Pour gagner du temps, nous avons rempli les informations que vous nous avez d??j?? fournies sur votre maladie.  S'il vous pla??t, v??rifiez qu'elles sont toujours correctes ou faites les modifications n??cessaires si, par exemple, vous avez consult?? un m??decin ou pris plus de temps hors travail depuis la derni??re fois que vous avez r??pondu au questionnaire."],
                    ["nl-be", "Als u denkt dat de klachten die u vandaag raporteert nog worden veroorzaakt door dezelfde infectie/probleem (dezelfde klachtenperiode), beantwoord dan de vraag met 'Ja'. Sommige antwoorden zijn dan alvast ingevuld op basis van de antwoorden van vorige keer. Kunt u controleren of deze nog steeds kloppen? Bijvoorbeeld of u nu wel naar de huisarts bent geweest of niet naar het werk bent geweest."],
                ]),
            },
        ]
    }
}

class Q3 extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q3');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        const editor = new ItemEditor(undefined, { itemKey: this.key, isGroup: false });
        editor.setVersion(1);

        // QUESTION TEXT
        editor.setTitleComponent(
            generateTitleComponent(new Map([
                ["en", "When did the first symptoms appear?"],
                ["nl", "Op welke dag kwamen de eerste klachten opzetten? Als je de datum niet precies meer weet, kies dan een geschatte datum"],
                ["fr", "Quand les premiers sympt??mes sont-ils apparus?"],
                ["nl-be", "Op welke dag verschenen de eerste symptomen? Als u de exacte datum niet meer weet, selecteer dan een geschatte datum."],

            ]))
        );

        // CONDITION
        editor.setCondition(
            this.condition
        );


        // INFO POPUP
        editor.setHelpGroupComponent(
            generateHelpGroupComponent([
                {
                    content: new Map([
                        ["en", "Why are we asking this?"],
                        ["nl", "Waarom vragen we dit?"],
                        ["fr", "Pourquoi demandons-nous cela?"],
                        ["nl-be", "Waarom vragen we dit?"],
                    ]),
                    style: [{ key: 'variant', value: 'h5' }],
                },
                {
                    content: new Map([
                        ["en", "To help us work out the number of cases that arise each day."],
                        ["nl", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag."],
                        ["fr", "Pour nous aider ?? travailler sur le nombre de cas de grippe qui se d??clarent chaque jour."],
                        ["nl-be", "Dit helpt ons vast te stellen hoeveel mensen er klachten krijgen per dag/week."],
                    ]),
                    style: [{ key: 'variant', value: 'p' }],
                },
                {
                    content: new Map([
                        ["en", "How should I answer it?"],
                        ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                        ["fr", "Comment dois-je r??pondre?"],
                        ["nl-be", "Hoe moet ik deze vraag beantwoorden?"],
                    ]),
                    style: [{ key: 'variant', value: 'h5' }],
                },
                {
                    content: new Map([
                        ["en", "Please give as accurate an estimate as possible."],
                        ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                        ["fr", "Donnez, s'il vous pla??t, une estimation aussi pr??cise que possible."],
                        ["nl-be", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ]),
                },
            ])
        );

        // RESPONSE PART
        const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
        editor.addExistingResponseComponent({
            key: '0', role: 'dateInput',
            properties: {
                min: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', -2592000) },
                max: { dtype: 'exp', exp: expWithArgs('timestampWithOffset', 10) },
            },
            description: generateLocStrings(new Map([
                ["en", "Choose date"],
                ["nl", "Kies de dag"],
                ["fr", "S??lectionner la date"],
                ["nl-be", "Kies datum"],
            ]))
        }, rg?.key);

        // VALIDATIONs
        if (this.isRequired) {
            editor.addValidation({
                key: 'r1',
                type: 'hard',
                rule: expWithArgs('hasResponse', this.key, responseGroupKey)
            });
        }

        return editor.getItem();
    }
}

class Q4 extends Item {
    optionKeys = {
        stillIll: '2'
    }
    keySymptomsStart: string;

    constructor(parentKey: string, keySymptomsStart: string, isRequired: boolean) {
        super(parentKey, 'Q4');

        this.isRequired = isRequired;
        this.keySymptomsStart = keySymptomsStart;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "When did your symptoms end?"],
                ["nl", "Op welke dag waren je klachten weer verdwenen?"],
                ["fr", "Quand vos sympt??mes ont-ils disparu?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'dateInput',
                    optionProps: {
                        min: {
                            dtype: 'exp', exp: {
                                name: 'getAttribute',
                                data: [
                                    { dtype: 'exp', exp: expWithArgs('getResponseItem', this.keySymptomsStart, [responseGroupKey, '0'].join('.')) },
                                    { str: 'value', dtype: 'str' }
                                ],
                                returnType: 'int',
                            }
                        },
                        max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: 10 }) },
                    },
                    content: new Map([
                        ["en", "Choose date"],
                        ["nl", "Kies de dag"],
                        ["fr", "S??lectionner la date"],
                    ])
                },
                {
                    key: this.optionKeys.stillIll, role: 'option',
                    content: new Map([
                        ["en", "I am still ill"],
                        ["nl", "Ik heb nog steeds klachten."],
                        ["fr", "Je suis encore malade"],
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
                    ["en", "Using the beginning and end dates of symptoms we can work out how long respiratory infections last."],
                    ["nl", "Op basis van de eerste en laatste dag van klachten kunnen we uitrekenen hoelang je last hebt gehad van (deze) klachten."],
                    ["fr", "En utilisant les dates de d??but et de fin des sympt??mes, nous pouvons travailler sur la dur??e des infections respiratoires."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr", "Donnez, s'il vous pla??t, une estimation aussi pr??cise que possible."],
                ]),
            },
        ]
    }
}

class Q5 extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q5');
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
                ["en", "Did your symptoms develop suddenly over a few hours?"],
                ["nl", "Kwamen je klachten plotseling opzetten? (binnen een paar uur)"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "Yes"],
                        ["nl", "Ja"],
                        ["fr", "Oui"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee"],
                        ["fr", "Non"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Ik weet dit niet (meer)."],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
                    ["en", "Sudden onset of symptoms is believed to be common for flu."],
                    ["nl", "Dat klachten plotseling (binnen een paar uur) opzetten is gelinkt aan griep"],
                    ["fr", "L'apparition soudaine des sympt??mes est consid??r?? comme commune pour la grippe."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your symptoms appeared over a few hours rather than gradually developing over a few days."],
                    ["nl", "Beantwoord de vraag met Ja wanneer de klachten binnen enkele uren kwamen opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr", "Cochez ??oui?? si vos sympt??mes sont apparus en quelques heures plut??t que progressivement sur quelques jours."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
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
                //["en", "This was all for now, please submit your responses. By filling out this survey regularly (eg. weekly), you can help us fight the virus."],
                ["nl", "Dit was de laatste vraag. Sla je antwoorden op door op verzenden te klikken. Dank voor het invullen. Volgende week vragen we je weer."],
            ]),
            this.condition,
        )
    }
}

export class FeverGroup extends Group {
    QFeverStart: QFeverStart;
    QFeverDevelopedSuddenly: QFeverDevelopedSuddenly;
    QTempertureTaken: QTempertureTaken;
    QHighestTemp: QHighestTemp;


    constructor(parentKey: string, groupCondition: Expression) {
        super(parentKey, 'Q6')
        this.groupEditor.setCondition(groupCondition);

        this.QFeverStart = new QFeverStart(this.key, true);
        this.QFeverDevelopedSuddenly = new QFeverDevelopedSuddenly(this.key, true);
        this.QTempertureTaken = new QTempertureTaken(this.key, true);
        this.QHighestTemp = new QHighestTemp(this.key, SurveyEngine.singleChoice.any(this.QTempertureTaken.key, this.QTempertureTaken.optionKeys.yes), true)

    }

    buildGroup() {
        this.addItem(this.QFeverStart.get());
        this.addItem(this.QFeverDevelopedSuddenly.get());
        this.addItem(this.QTempertureTaken.get());
        this.addItem(this.QHighestTemp.get());
    }
}

class QFeverStart extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'a');

        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "When did your fever begin?"],
                ["nl", "Op welke dag kwam de koorts opzetten? Als je de dag niet precies weet, kies dan een geschatte datum"],
                ["fr", "Quand est-ce que votre fi??vre a commenc???"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: '1', role: 'dateInput',
                    optionProps: {
                        min: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: -21427200 }) },
                        max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({ seconds: 0 }) },
                    },
                    content: new Map([
                        ["en", "Choose date"],
                        ["nl", "Kies de dag"],
                        ["fr", "S??lectionner la date"],
                    ])
                },
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "I don't know/can't rember"],
                        ["nl", "Ik weet het niet (meer)."],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                    ])
                },
            ],
        })
    }

    private getHelpGroupContent() {
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
                    ["en", "Fever is very important for diagnosing, so we want to know when this started."],
                    ["nl", "Koorts is belangrijk in de diagnose, daarom willen we graag weten wanneer deze klachten begonnen."],
                    ["fr", "La fi??vre est tr??s importante pour le diagnostic de la grippe. Nous voulons donc savoir quand cela a commenc??."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Please give as accurate an estimate as possible."],
                    ["nl", "Wees alsjeblieft zo nauwkeurig mogelijk."],
                    ["fr", "Donnez, s'il vous pla??t, une estimation aussi pr??cise que possible."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class QFeverDevelopedSuddenly extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'b');

        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did your fever develop suddenly over a few hours?"],
                ["nl", "Kwam de koorts plotseling opzetten? (binnen een paar uur)"],
                ["fr", "Est-ce que votre fi??vre s'est d??clar??e soudainement, en l'espace de quelques heures?"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Yes"],
                        ["nl", "Ja"],
                        ["fr", "Oui"],
                    ])
                },
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee"],
                        ["fr", "Non"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "I don't know"],
                        ["nl", "Dat weet ik niet (meer)"],
                        ["fr", "Je ne sais pas"],
                    ])
                },
            ],
        })
    }

    private getHelpGroupContent() {
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
                    ["en", "Certain illnesses are associated with a sudden onset of fever"],
                    ["nl", "Sommige ziekten veroorzaken een plotselinge koorts."],
                    ["fr", "La grippe est souvent associ??e ?? une apparition soudaine de fi??vre."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick yes if your fever appeared over a few hours rather than gradually developing over a few days."],
                    ["nl", "Beantwoord de vraag met Ja wanneer de koorts binnen enkele uren kwam opzetten, in plaats van een geleidelijke ontwikkeling over een aantal dagen."],
                    ["fr", "Cochez ??oui?? si votre fi??vre est apparue en quelques heures plut??t que progressivement sur quelques jours."],
                ]),
            },
        ]
    }
}

class QTempertureTaken extends Item {
    optionKeys = {
        yes: '1',
    }
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'c');

        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you take your temperature?"],
                ["nl", "Heb je de temperatuur gemeten?"],
                ["fr", "Avez-vous pris votre temp??rature?"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: this.optionKeys.yes, role: 'option',
                    content: new Map([
                        ["en", "Yes"],
                        ["nl", "Ja"],
                        ["fr", "Oui"],
                    ])
                },
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee"],
                        ["fr", "Non"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "I don't know"],
                        ["nl", "Dat weet ik niet (meer)"],
                        ["fr", "Je ne sais pas"],
                    ])
                },
            ],
        })
    }

    private getHelpGroupContent() {
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
                    ["en", "Infections often cause a high temperature. However, not everyone takes their temperature when they are ill."],
                    ["nl", "Infecties veroorzaken vaak een hoge temperatuur. Echter, niet iedereen meet hun temperatuur wanneer ze ziek zijn."],
                    ["fr", "La grippe est souvent associ??e ?? une temp??rature ??lev??e. Cependant tout le monde ne prend pas sa temp??rature lorsqu'il est malade."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Answer yes, if you took your temperature using a thermometer."],
                    ["nl", "Beantwoord deze vraag met Ja wanneer je de temperatuur hebt gemeten met een thermometer."],
                    ["fr", "Cochez ??oui?? si vous avez pris votre temp??rature ?? l'aide d'un thermom??tre."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class QHighestTemp extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'd');
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
                ["en", "What was your highest temperature measured?"],
                ["nl", "Wat is je hoogst gemeten temperatuur?"],
                ["fr", "Quel a ??t?? votre temp??rature mesur??e la plus ??lev??e?"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Below 37.0??C"],
                        ["nl", "Onder de 37,0??C"],
                        ["fr", "Moins de 37??C"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "37.0?? - 37.4??C"],
                        ["nl", "37,0??C - 37,4??C"],
                        ["fr", "37?? ??? 37.4??C"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "37.5?? - 37.9??C"],
                        ["nl", "37,5?? - 37,9??C"],
                        ["fr", "37.5?? ??? 37.9??C"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "38.0?? - 38.9??C"],
                        ["nl", "38,0?? - 38,9??C"],
                        ["fr", "38?? ??? 38.9??C"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "39.0?? - 39.9??C"],
                        ["nl", "39,0?? - 39,9??C"],
                        ["fr", "39?? ??? 39.9??C"],
                    ])
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["en", "40.0??C or more"],
                        ["nl", "40,0??C of meer"],
                        ["fr", "40??C ou plus"],
                    ])
                },
                {
                    key: '7', role: 'option',
                    content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Dat weet ik niet (meer)."],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                    ])
                },
            ],
        })
    }

    private getHelpGroupContent() {
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
                    ["en", "Certain infections often causes a high temperature."],
                    ["nl", "Bepaalde infectieziekten veroorzaken een hoge temperatuur."],
                    ["fr", "La grippe provoque souvent une temp??rature ??lev??e."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Give the highest temperature you recorded during this episode of illness."],
                    ["nl", "Geef de hoogste temperatuur die je gemeten hebt tijdens je klachtenperiode."],
                    ["fr", "Indiquez la plus haute temp??rature que vous avez enregistr??e au cours de cette ??pisode de maladie."],
                ]),
            },
        ]
    }
}

class ContactGroup extends Group {
    Q7: Q7;
    Q7a: Q7a;
    Q7b: Q7b;

    constructor(parentKey: string) {
        super(parentKey, 'contact')

        this.Q7 = new Q7(this.key, true);
        this.Q7a = new Q7a(this.key, SurveyEngine.multipleChoice.any(this.Q7.key, this.Q7.optionKeys.gp), true);
        this.Q7b = new Q7b(this.key, SurveyEngine.multipleChoice.none(this.key, '0', '5'), this.Q7.key, true);
    }

    buildGroup() {
        this.addItem(this.Q7.get());
        this.addItem(this.Q7a.get());
        this.addItem(this.Q7b.get());
    }
}

class Q7 extends Item {
    optionKeys = {
        gp: '1'
    }
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q7');

        this.isRequired = isRequired;
    }

    buildItem() {
        const optionDisabled = SurveyEngine.multipleChoice.any(
            this.key,
            '0', '5'
        )

        return SurveyItems.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Because of your symptoms, did you VISIT (see face to face) any medical services?"],
                ["nl", "Heb je een arts gezien of gesproken vanwege je klachten? En zo ja, waar? (meerdere antwoorden mogelijk)"],
                ["fr", "En raison de vos sympt??mes, avez-vous rendu visite (en personne) ?? des services m??dicaux ?"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    disabled: SurveyEngine.multipleChoice.none(
                        this.key,
                        '0'
                    ),
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee, ik heb geen medische hulp gezocht"],
                        ["fr", "Non"],
                    ])
                },
                {
                    key: this.optionKeys.gp, role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "GP or GP's practice nurse"],
                        ["nl", "Ja, bij de huisarts of huisartsassistent"],
                        ["fr", "M??decin g??n??raliste"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Hospital accident & emergency department / out of hours service"],
                        ["nl", "Ja, bij de eerste hulp van het ziekenhuis of de huisartsenpost"],
                        ["fr", "Service des urgences d'un h??pital/clinique ou m??decin de garde"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Hospital admission"],
                        ["nl", "Ja, ik ben opgenomen in het ziekenhuis"],
                        ["fr", "Consultation ambulatoire ?? l'h??pital"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    disabled: optionDisabled,
                    content: new Map([
                        ["en", "Other medical services"],
                        ["nl", "Ja, ik heb andere medische hulp gezocht"],
                        ["fr", "Autre service m??dical"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    disabled: SurveyEngine.multipleChoice.none(
                        this.key,
                        '5'
                    ),
                    content: new Map([
                        ["en", "No, but I have an appointment scheduled"],
                        ["nl", "Nog niet, maar ik heb een afspraak gemaakt"],
                        ["fr", "Non, mais j'ai rendez-vous prochainement"],
                    ])
                },
            ],
        })
    }

    private getHelpGroupContent() {
        return [
            {
                content: new Map([
                    ["en", "Why are we asking this?"],
                    ["nl", "Waarom vragen we dit?"],
                    ["fr", "Pourquoi demandons-nous cela ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To find out whether people contact the health services because of their symptoms."],
                    ["nl", "Om uit te zoeken welk percentage van mensen met bepaalde klachten medische hulp zoeken."],
                    ["fr", "Pour savoir si la population entre en contact avec les services de sant?? en raison de ses sympt??mes."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment dois-je r??pondre ?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick all of those that apply. If you are due to see attend, then tick the final option."],
                    ["nl", "Selecteer alle relevante vormen van medische hulp die je hebt bezocht. Wanneer je nog niet bent geweest maar wel een afspraak heeft gemaakt, selecteer dan de laatste optie."],
                    ["fr", "Merci de cocher toutes les r??ponses qui s'appliquent . Si vous avez rendez-vous prochainement, merci de cocher l'option finale."],
                ]),
            },
        ]
    }
}

class Q7a extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q7a');

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
                ["en", "Did you visit the GP practice for your consult with the GP?"],
                ["nl", "Heb je de huisartspraktijk bezocht voor het gesprek met de huisarts/huisartsassistent?"],
            ]),
            helpGroupContent: this.getHelpGroupContent(),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "No, the consult happend by phone or video-connection (video consult)"],
                        ["nl", "Nee, ik heb de huisarts/huisartsassistent alleen gesproken per telefoon/video verbinding (video-consult)"],
                    ])
                },

                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Yes, I went to the GP practice to consult the GP"],
                        ["nl", "Ja, ik ben naar de huisartspraktijk gegaan, en heb daar met de huisarts/huisartsassistent gesproken"],
                    ])
                },
            ]
        })
    }

    private getHelpGroupContent() {
        return [
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Select the most relevant option"],
                    ["nl", "Geef aan of je ook de huisartspraktijk hebt bezocht."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class Q7b extends Item {
    Q7key: string;

    constructor(parentKey: string, condition: Expression, Q7key: string, isRequired: boolean) {
        super(parentKey, 'Q7b');

        this.isRequired = isRequired;
        this.condition = condition;
        this.Q7key = Q7key;
    }

    buildItem() {
        const itemKey = this.key;
        const editor = new ItemEditor(undefined, { itemKey: itemKey, isGroup: false });
        editor.setVersion(1);

        // QUESTION TEXT
        editor.setTitleComponent(
            generateTitleComponent(new Map([
                ["en", "How soon after your symptoms appeared did you first VISIT a medical service?"],
                ["nl", "Waar en hoe snel na de start van je klachten heb je voor de EERSTE keer medische hulp gezocht?"],
                ["fr", "Combien de temps apr??s que vos sympt??mes soient apparus avez-vous visit?? un service m??dical ?"],
            ]))
        );

        // CONDITION
        editor.setCondition(this.condition);

        // INFO POPUP
        editor.setHelpGroupComponent(
            generateHelpGroupComponent([
                {
                    content: new Map([
                        ["en", "Why are we asking this?"],
                        ["nl", "Waarom vragen we dit?"],
                        ["fr", "Pourquoi demandons-nous cela ?"],
                    ]),
                    style: [{ key: 'variant', value: 'h5' }],
                },
                {
                    content: new Map([
                        ["en", "To find out how quickly people with symptoms are seen by the health services."],
                        ["nl", "Om uit te zoeken hoe snel mensen met klachten worden gezien door een medische hulpdienst/specialist."],
                        ["fr", "Pour savoir ?? quelle vitesse les personnes pr??sentant des sympt??mes sont vus par les services de sant??."],
                    ]),
                    style: [{ key: 'variant', value: 'p' }],
                },
                {
                    content: new Map([
                        ["en", "How should I answer it?"],
                        ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                        ["fr", "Comment dois-je r??pondre ?"],
                    ]),
                    style: [{ key: 'variant', value: 'h5' }],
                },
                {
                    content: new Map([
                        ["en", "Only record the time until your FIRST contact with the health services."],
                        ["nl", "Geef alleen het aantal dagen van het begin van de klachten tot je EERSTE bezoek aan de desbetreffende medische hulpverlener/specialist."],
                        ["fr", "En saisissant le temps s??parant l'apparition de vos sympt??mes et votre PREMIER contact avec les services de sant??."],
                    ]),
                },
            ])
        );

        // RESPONSE PART
        const rg = editor.addNewResponseComponent({ role: 'responseGroup' });
        editor.addExistingResponseComponent({
            role: 'text',
            content: generateLocStrings(
                new Map([
                    ['en', 'Select the correct number of days'],
                    ['nl', 'Selecteer het juiste aantal dagen'],
                    ["fr", "s??lectionnez toutes les options applicables"],
                ])),
        }, rg?.key);
        const ddOptions: ResponseRowCell = {
            key: 'col1', role: 'dropDownGroup', items: [
                {
                    key: '0', role: 'option', content: new Map([
                        ["en", "Same day"],
                        ["nl", "Op dezelfde dag als de eerste klachten"],
                        ["fr", "Jour m??me"],
                    ]),
                },
                {
                    key: '1', role: 'option', content: new Map([
                        ["en", "1 day"],
                        ["nl", "1 dag"],
                        ["fr", "1 jour"],
                    ]),
                },
                {
                    key: '2', role: 'option', content: new Map([
                        ["en", "2 days"],
                        ["nl", "2 dagen"],
                        ["fr", "2 jours"],
                    ]),
                },
                {
                    key: '3', role: 'option', content: new Map([
                        ["en", "3 days"],
                        ["nl", "3 dagen"],
                        ["fr", "3 jours"],
                    ]),
                },
                {
                    key: '4', role: 'option', content: new Map([
                        ["en", "4 days"],
                        ["nl", "4 dagen"],
                        ["fr", "4 jours"],
                    ]),
                },
                {
                    key: '5', role: 'option', content: new Map([
                        ["en", "5 days"],
                        ["nl", "5 dagen"],
                        ["fr", "5 jours"],
                    ]),
                },
                {
                    key: '6', role: 'option', content: new Map([
                        ["en", "6 days"],
                        ["nl", "6 dagen"],
                        ["fr", "6 jours"],
                    ]),
                },
                {
                    key: '7', role: 'option', content: new Map([
                        ["en", "7 days"],
                        ["nl", "7 dagen"],
                        ["fr", "7 jours"],
                    ]),
                },
                {
                    key: '8', role: 'option', content: new Map([
                        ["en", "8 days"],
                        ["nl", "8 dagen"],
                        ["fr", "8 jours"],
                    ]),
                },
                {
                    key: '9', role: 'option', content: new Map([
                        ["en", "9 days"],
                        ["nl", "9 dagen"],
                        ["fr", "9 jours"],
                    ]),
                },
                {
                    key: '10', role: 'option', content: new Map([
                        ["en", "10 days"],
                        ["nl", "10 dagen"],
                        ["fr", "10 jours"],
                    ]),
                },
                {
                    key: '11', role: 'option', content: new Map([
                        ["en", "11 days"],
                        ["nl", "11 dagen"],
                        ["fr", "11 jours"],
                    ]),
                },
                {
                    key: '12', role: 'option', content: new Map([
                        ["en", "12 days"],
                        ["nl", "12 dagen"],
                        ["fr", "12 jours"],
                    ]),
                },
                {
                    key: '13', role: 'option', content: new Map([
                        ["en", "13 days"],
                        ["nl", "13 dagen"],
                        ["fr", "13 jours"],
                    ]),
                },
                {
                    key: '14', role: 'option', content: new Map([
                        ["en", "14 days"],
                        ["nl", "14 dagen"],
                        ["fr", "14 jours"],
                    ]),
                },
                {
                    key: '15', role: 'option', content: new Map([
                        ["en", "More than 14 days"],
                        ["nl", "meer dan 14 dagen"],
                        ["fr", "Plus de 14 jours"],
                    ]),
                },
                {
                    key: '16', role: 'option', content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Dat weet ik niet (meer)"],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
                    ]),
                },
            ]
        };

        const rg_inner = initMatrixQuestion(matrixKey, [
            {
                key: 'header', role: 'headerRow', cells: [
                    {
                        key: 'col0', role: 'text', content: new Map([
                            ["en", "Medical Service"],
                            ["nl", "Medische hulpverlener"],
                            ["fr", "Service m??dical"],
                        ]),
                    },
                    {
                        key: 'col1', role: 'text'
                    },
                ]
            },
            {
                key: 'r1', role: 'responseRow', cells: [
                    {
                        key: 'col0', role: 'label', content: new Map([
                            ["en", "GP or GP'r practice nurse"],
                            ["nl", "Huisarts of huisartsassistent"],
                            ["fr", "M??decin g??n??raliste"],
                        ]),
                    },
                    { ...ddOptions }
                ],
                displayCondition: SurveyEngine.multipleChoice.any(this.Q7key, '1'),
            },
            {
                key: 'r2', role: 'responseRow', cells: [
                    {
                        key: 'col0', role: 'label', content: new Map([
                            ["en", "Hospital accident & department/out of hours service"],
                            ["nl", "Eerste hulp van het ziekenhuis of huisartsenpost"],
                            ["fr", "Service des urgences d'un h??pital/clinique ou m??decin de garde"],
                        ]),
                    },
                    { ...ddOptions }
                ],
                displayCondition: SurveyEngine.multipleChoice.any(this.Q7key, '3'),
            },
            {
                key: 'r3', role: 'responseRow', cells: [
                    {
                        key: 'col0', role: 'label', content: new Map([
                            ["en", "Hospital admission"],
                            ["nl", "Ziekenhuisopname"],
                            ["fr", "Consultation ambulatoire ?? l'h??pital"],
                        ]),
                    },
                    { ...ddOptions }
                ],
                displayCondition: SurveyEngine.multipleChoice.any(this.Q7key, '2'),
            },
            {
                key: 'r4', role: 'responseRow', cells: [
                    {
                        key: 'col0', role: 'label', content: new Map([
                            ["en", "Other medical services"],
                            ["nl", "Andere medische hulp."],
                            ["fr", "Autre service m??dical"],
                        ]),
                    },
                    { ...ddOptions }
                ],
                displayCondition: SurveyEngine.multipleChoice.any(this.Q7key, '4'),
            },
        ]);
        editor.addExistingResponseComponent(rg_inner, rg?.key);

        // VALIDATIONs
        if (this.isRequired) {
            editor.addValidation({
                key: 'r1',
                type: 'hard',
                rule: SurveyEngine.hasResponse(this.key, 'rg')
            });
        }

        return editor.getItem();
    }
}

class Q9 extends Item {
    optionKeys = {
        antivirals: '3',
    }
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q9');
        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "Did you take medication for these symptoms?"],
                ["nl", "Heb je vanwege je klachten medicijnen gebruikt? En zo ja, welke?"],
            ]),
            topDisplayCompoments: [
                ComponentGenerators.text({
                    className: "mb-1",
                    content: new Map([
                        ['en', 'Select all options that apply'],
                        ['nl', 'Meerdere antwoorden mogelijk'],
                    ])
                })
            ],
            responseOptions: [
                {
                    key: '0',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '6'),
                    content: new Map([
                        ["en", "No medication"],
                        ["nl", "Nee, ik heb geen medicijnen gebruikt"],
                        ["fr", "Aucun m??dicament"],
                    ])
                },
                {
                    key: '1',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Pain killers (e.g. paracetamol, lemsip, ibuprofen, aspirin, calpol, etc)"],
                        ["nl", "Ja, pijnstillers zoals paracetamol, aspirine of ibuprofen"],
                        ["fr", "M??dicaments contre la douleur ou la fi??vre (p. ex. Paracetamol, Dafalgan, Ibuprofen, Aspirin, Pretuval, etc)"],
                    ])
                },
                {
                    key: '2',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Cough medication (e.g. expectorants)"],
                        ["nl", "Ja, medicijnen om het hoesten te onderdrukken"],
                        ["fr", "M??dicaments contre la toux (p. ex. expectorants)"],
                    ])
                },
                {
                    key: '9',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Hayfever medication"],
                        ["nl", "Ja, medicatie tegen hooikoorts"],

                    ])
                },
                {
                    key: this.optionKeys.antivirals,
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Antivirals (Tamiflu, Relenza)"],
                        ["nl", "Ja, antivirale middelen zoals Tamiflu of Relenza"],
                        ["fr", "Antiviraux (par ex. Tamiflu)"],
                    ])
                },
                {
                    key: '4',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Antibiotics"],
                        ["nl", "Ja, antibiotica"],
                        ["fr", "Antibiotiques"],
                    ])
                },
                {
                    key: '7',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Homeopathy"],
                        ["nl", "Ja, homeopathische middelen"],
                        ["fr", "Hom??opathie"],
                    ])
                },
                {
                    key: '8',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Alternative medicine (essential oil, phytotherapy, etc.)"],
                        ["nl", "Ja, alternatieve medicatie (essenti??le olie, fytotherapie enz.)"],
                        ["fr", "M??decines douces (huiles essentielles, phytoth??rapie, etc.)"],
                    ])
                },
                {
                    key: '5',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0', '6'),
                    content: new Map([
                        ["en", "Other"],
                        ["nl", "Ja, andere medicatie"],
                        ["fr", "Autre"],
                    ])
                },
                {
                    key: '6',
                    role: 'option',
                    disabled: SurveyEngine.multipleChoice.any(this.key, '0'),
                    content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Dit wil ik niet aangeven"],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
                    ["en", "To find out who gets treated, and how effective treatment is."],
                    ["nl", "Om uit te zoeken wie er medicatie neemt, en hoe effectief deze behandeling is."],
                    ["fr", "Pour savoir qui se fait soigner, et si le traitement est efficace."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe moet ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Only record those medications that you used because of this illness. If you are on other medications because of a pre-existing illness then do not record these."],
                    ["nl", "Geef alleen de medicatie aan die je gebruikt in verband met je gemelde klachten. Medicatie die je gebruikt voor een al bestaande aandoening hoef je niet te noemen."],
                    ["fr", "Ne saisissez que les m??dicaments que vous pris en raison de cette ??pisode de maladie. Si vous avez pris d'autres m??dicaments pour une maladie pr??existante, alors ne les enregistrez pas."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class Q9b extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q9b');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "How long after the beginning of your symptoms did you start taking antiviral medication?"],
                ["nl", "Hoe snel nadat je klachten opkwamen ben je begonnen met het gebruiken van antivirale middelen?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "Same day (within 24 hours)"],
                        ["nl", "Dezelfde dag (binnen 24 uur)"],
                        ["fr", "Le jour m??me (dans les 24 heures)"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "1 day"],
                        ["nl", "1 dag"],
                        ["fr", "1 jour"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "2 days"],
                        ["nl", "2 dagen"],
                        ["fr", "2 jours"],
                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "3 days"],
                        ["nl", "3 dagen"],
                        ["fr", "3 jours"],
                    ])
                }, {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "4 days"],
                        ["nl", "4 dagen"],
                        ["fr", "4 jours"],
                    ])
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "5-7 days"],
                        ["nl", "5-7 dagen"],
                        ["fr", "5 ??? 7 jours"],
                    ])
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["en", "More than 7 days"],
                        ["nl", "Meer dan 7 dagen"],
                        ["fr", "Plus de 7 jours"],
                    ])
                }, {
                    key: '7', role: 'option',
                    content: new Map([
                        ["en", "I don't know/can't remember"],
                        ["nl", "Dat weet ik niet (meer)."],
                        ["fr", "Je ne sais pas / je ne m'en souviens plus"],
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
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Antivirals are thought to be most effective if taken quickly after disease onset."],
                    ["nl", "Antivirale middelen werken beter wanneer ze snel worden genomen na het begin van de klachten."],
                    ["fr", "Les antiviraux sont suppos??s ??tre plus efficace si pris rapidement apr??s l'apparition de la maladie ."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Report the time until you first started taking antivirals (which may not be the same day as you got your prescription)."],
                    ["nl", "Geef het aantal dagen tussen het begin van de klachten en de dag dat je met de antivirale middelen begon."],
                    ["fr", "Signaler le temps ??coul?? jusqu'?? ce que vous ayez commenc?? ?? prendre des antiviraux (qui peut ne pas ??tre le m??me jour que celui ou vous avez obtenu votre prescription)."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class Q10NL extends Item {
    optionKeys = {
        yes: '2'
    }
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q10NL');
        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ["en", "Did you change your daily routine because of your illness?"],
                ["nl", "Heb je je vanwege je klachten ziek gemeld van werk/school?"],
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
                        ["en", "Yes, but I did not take time off work/school"],
                        ["nl", "Nee, maar het had wel effect op mijn dagelijkse praktijk"],

                    ])
                },
                {
                    key: this.optionKeys.yes, role: 'option',
                    content: new Map([
                        ["en", "Yes, I took time off work/school"],
                        ["nl", "Ja"],

                    ])
                },
                {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "Not applicable, I don't have work/school"],
                        ["nl", "Niet van toepassing, ik heb geen werk/school"],

                    ])
                },
            ]
        })
    }
}

class Q10bNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q10bNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "Are you still off work/school?"],
                ["nl", "Ben je nog steeds ziek gemeld van werk/school?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Yes"],
                        ["nl", "Ja"],
                        ["fr", "Oui"],
                    ])
                },
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "No"],
                        ["nl", "Nee"],
                        ["fr", "Non"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "Other (e.g. I wouldn???t usually be at work/school today anyway)"],
                        ["nl", "Anders (ik hoefde vandaag sowieso niet naar werk/school)"],
                        ["fr", "Autre (p. ex ??Je ne me serais de toute fa??on pas rendu au travail / ?? l'??cole aujourd'hui??)"],
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
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To estimate the average  amount of time that people take off work, we need to know if people are still off work."],
                    ["nl", "Om uit te rekenen hoeveel dagen mensen thuisblijven vanwege klachten."],
                    ["fr", "Afin d'estimer le temps moyen que les gens passent en arr??t de travail."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Tick ???yes??? if you would be at work/school today if you were not currently ill."],
                    ["nl", "Antwoord 'Ja' als je vanwege klachten vandaag nog thuis zit in plaats van werk/school"],
                    ["fr", "Cochez ??oui?? si vous vous seriez rendu au travail / ?? l'??cole aujourd'hui si vous n'??tiez pas actuellement malade."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

class Q10cNL extends Item {
    constructor(parentKey: string, condition: Expression, isRequired: boolean) {
        super(parentKey, 'Q10cNL');
        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItems.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            helpGroupContent: this.getHelpGroupContent(),
            questionText: new Map([
                ["en", "How long have you been off work/school?"],
                ["nl", "Hoeveel dagen ben je ziek gemeld van werk/school?"],
            ]),
            responseOptions: [
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "1 day"],
                        ["nl", "1 dag"],
                        ["fr", "1 jour"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "2 days"],
                        ["nl", "2 dagen"],
                        ["fr", "2 jours"],
                    ])
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "3 days"],
                        ["nl", "3 dagen"],
                        ["fr", "3 jours"],
                    ])
                }, {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "4 days"],
                        ["nl", "4 dagen"],
                        ["fr", "4 jours"],
                    ])
                },
                {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "5 days"],
                        ["nl", "5 dagen"],
                        ["fr", "5 jours"],
                    ])
                }, {
                    key: '6', role: 'option',
                    content: new Map([
                        ["en", "6 to 10 days"],
                        ["nl", "6 tot 10 dagen"],
                        ["fr", "6 ?? 10 jours"],
                    ])
                }, {
                    key: '7', role: 'option',
                    content: new Map([
                        ["en", "11 to 15 days"],
                        ["nl", "11 tot 15 dagen"],
                        ["fr", "11 ?? 15 jours"],
                    ])
                }, {
                    key: '8', role: 'option',
                    content: new Map([
                        ["en", "More than 15 days"],
                        ["nl", "Meer dan 15 dagen"],
                        ["fr", "Plus de 15 jours"],
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
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To measure the effect of symptoms on people???s daily lives."],
                    ["nl", "Om het effect te bepalen van de klachten op je dagelijksleven"],
                    ["fr", "Afin de mesurer l'effet des sympt??mes sur la vie quotidienne des gens."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "Only count the days that you normally would have been in school or work (e.g. don???t count weekends)."],
                    ["nl", "Tel alleen de dagen waar je normaal naar het werk/school had moeten gaan"],
                    ["fr", "Ne comptez que les jours durant lesquels vous seriez normalement all?? ?? l'??cole ou au travail (par exemple, ne comptez pas le week-end)."],
                ]),
            },
        ]
    }
}

class Q11 extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q11');
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
                ["en", "What do you think is causing your symptoms?"],
                ["nl", "Heb je zelf enig idee waar je klachten vandaan komen?"],
            ]),
            responseOptions: [
                {
                    key: '0', role: 'option',
                    content: new Map([
                        ["en", "Flu or flu-like illness"],
                        ["nl", "Ja, ik heb griep, of griepachtige verschijnselen"],
                        ["fr", " Grippe ou syndrome pseudo-grippal"],
                    ])
                },
                {
                    key: '1', role: 'option',
                    content: new Map([
                        ["en", "Common cold"],
                        ["nl", "Ja, ik ben verkouden"],
                        ["fr", "Rhume / refroidissement"],
                    ])
                },
                {
                    key: '2', role: 'option',
                    content: new Map([
                        ["en", "Allergy/hay fever"],
                        ["nl", "Ja ik heb last van een allergie/ hooikoorts"],
                        ["fr", " Allergie / rhume des foins"],
                    ])
                },
                {
                    key: '6', role: 'option',
                    content: new Map([
                        ["en", "Ashtma"],
                        ["nl", "Ja, ik heb last van astma"],
                        ["fr", "Asthme"],
                    ])
                }, {
                    key: '3', role: 'option',
                    content: new Map([
                        ["en", "Gastroenteritis/gastric flu"],
                        ["nl", "Ja, ik heb maag-darmklachten of buikgriep"],
                        ["fr", "Gastro-ent??rite / grippe intestinale"],
                    ])
                },
                {
                    key: '9', role: 'option',
                    content: new Map([
                        ["en", "Coronavirus (COVID-19)"],
                        ["nl", "Ja, het coronavirus (COVID-19, longcovid)"],
                        ["fr", "Coronavirus (COVID-19)"],
                    ])
                },
                {
                    key: '10', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik heb een vaccinatie gehad die de klachten heeft veroorzaakt"],
                    ])
                },
                {
                    key: '4', role: 'option',
                    content: new Map([
                        ["en", "Other"],
                        ["nl", "Ja, ik heb een andere ziekte of reden die de klachten hebben veroorzaakt"],
                        ["fr", "Autre"],
                    ])
                }, {
                    key: '5', role: 'option',
                    content: new Map([
                        ["en", "I don't know"],
                        ["nl", "Nee, ik heb geen idee"],
                        ["fr", "Je ne sais pas"],
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
                    ["fr", "Pourquoi demandons-nous cela?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "To help find out if our assessment of your illness based on your symptoms matches what you believe to be the cause. You might have a better idea of what is causing your illness than our computer algorithms."],
                    ["nl", "Om uit te zoeken of je eigen idee wat de oorzaak kan zijn past bij je eigen klachten, en klachten van anderen. Ook heb je waarschijnlijk een beter idee wat het zou kunnen zijn dan computer algoritmes."],
                    ["fr", "Pour nous aider ?? trouver si notre ??valuation de votre maladie en fonction de vos sympt??mes correspond ?? ce que vous croyez en ??tre la cause. Vous pourriez avoir une meilleure id??e de ce qui est la cause de votre maladie que nos algorithmes informatiques ."],
                ]),
                style: [{ key: 'variant', value: 'p' }],
            },
            {
                content: new Map([
                    ["en", "How should I answer it?"],
                    ["nl", "Hoe zal ik deze vraag beantwoorden?"],
                    ["fr", "Comment devez-vous r??pondre?"],
                ]),
                style: [{ key: 'variant', value: 'h5' }],
            },
            {
                content: new Map([
                    ["en", "If you are reasonably sure about what is causing your symptoms, please tick the appropriate box. Otherwise, please tick ???I don???t know???."],
                    ["nl", "Ben je vrij zeker van de oorzaak van je klachten geef deze oorzaak dan aan."],
                    ["fr", "Si vous ??tes raisonnablement s??r de ce qui est la cause de vos sympt??mes, s'il vous pla??t cochez la case appropri??e. Sinon, cochez la case ??Je ne sais pas??."],
                ]),
                // style: [{ key: 'variant', value: 'p' }],
            },
        ]
    }
}

