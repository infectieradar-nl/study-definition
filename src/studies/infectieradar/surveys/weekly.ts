import { SurveyEngine } from "../../../case-editor/expression-utils/surveyEngineExpressions";
import { SurveyDefinition } from "../../../case-editor/types/surveyDefinition";
import { Q1aNL, Q1b3NL, Q1d3NL, Q1jNL, Q1kNL, Q2title } from "../questionPools/coronaTest";
import { Q2NL, Q2aNL, Q2bNL, Q2cNL } from "../questionPools/coronaVaccine";
import { HasSymptomsGroup, SymptomsQuestion } from "../questionPools/weeklyQuestions";

class WeeklyDef extends SurveyDefinition {
    // vaccination:
    Q2NL: Q2NL;
    Q2aNL: Q2aNL;
    Q2bNL: Q2bNL;
    Q2cNL: Q2cNL;

    // test:
    Q1aNL: Q1aNL;
    Q2title: Q2title;
    Q1kNL: Q1kNL;
    Q1b3NL: Q1b3NL;
    Q1d3NL: Q1d3NL;
    Q1jNL: Q1jNL;

    // symptoms:
    Q1: SymptomsQuestion;
    HS: HasSymptomsGroup;

    constructor() {
        super({
            surveyKey: 'weekly',
            name: new Map([
                ["en", "How do you feel today?"],
                ["nl", "Wekelijkse vragenlijst"],
            ]),
            description: new Map([
                ["en", "Survey about your health status in the last week."],
                ["nl", "Klik hier voor je vragenlijst over je klachten in de afgelopen week. Meld alsjeblieft ook als je geen klachten had."],
            ]),
            durationText: new Map([
                ["en", "15 seconds to 3 minutes, depending on your symptoms."],
                ["nl", "Invullen duurt 15 seconden tot 3 minuten, afhankelijk van je klachten."],
            ])
        });

        // Initialize/Configure questions here:
        this.Q2NL = new Q2NL(this.key, true);
        const conditionForVaccindated = SurveyEngine.singleChoice.any(this.Q2NL.key, '3', '4', '5');
        const conditionForNotVaccindated = SurveyEngine.singleChoice.any(this.Q2NL.key, '2',);
        this.Q2aNL = new Q2aNL(this.key, conditionForVaccindated, true);
        this.Q2bNL = new Q2bNL(this.key, conditionForVaccindated, true);
        this.Q2cNL = new Q2cNL(this.key, conditionForNotVaccindated, true);

        this.Q1aNL = new Q1aNL(this.key, true);
        const conditionForSelfTest = SurveyEngine.multipleChoice.any(
            this.Q1aNL.key, this.Q1aNL.optionKeys.selfTest
        );
        this.Q2title = new Q2title(this.key, conditionForSelfTest);
        this.Q1kNL = new Q1kNL(this.key, conditionForSelfTest, true);
        this.Q1b3NL = new Q1b3NL(this.key, conditionForSelfTest, true);
        const conditionForPositiveSelfTest = SurveyEngine.singleChoice.any(
            this.Q1b3NL.key, this.Q1b3NL.optionKeys.positive
        );
        this.Q1d3NL = new Q1d3NL(this.key, conditionForPositiveSelfTest, true);
        this.Q1jNL = new Q1jNL(this.key, conditionForSelfTest, true);

        this.Q1 = new SymptomsQuestion(this.key, true);

        const hasSymptoms = SurveyEngine.multipleChoice.none(this.Q1.key, this.Q1.noSymptomsKey);
        this.HS = new HasSymptomsGroup(this.key, hasSymptoms);
    }

    buildSurvey() {
        // Define order of the questions here:
        this.addItem(this.Q2NL.get());
        this.addItem(this.Q2aNL.get());
        this.addItem(this.Q2bNL.get());
        this.addItem(this.Q2cNL.get());

        this.addItem(this.Q1aNL.get());
        this.addItem(this.Q2title.get());
        this.addItem(this.Q1kNL.get());
        this.addItem(this.Q1b3NL.get());
        this.addItem(this.Q1d3NL.get());
        this.addItem(this.Q1jNL.get());

        this.addItem(this.Q1.get());
        this.addItem(this.HS.get());
    }
}

export const Weekly = new WeeklyDef();