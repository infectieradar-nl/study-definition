import { SurveyEngine } from "../../../case-editor/expression-utils/surveyEngineExpressions";
import { SurveyDefinition } from "../../../case-editor/types/surveyDefinition";
import { Q2NL, Q2aNL, Q2bNL, Q2cNL } from "../questionPools/coronaVaccine";
import { HasSymptomsGroup, SymptomsQuestion } from "../questionPools/weeklyQuestions";

class WeeklyDef extends SurveyDefinition {
    // vaccination:
    Q2NL: Q2NL;
    Q2aNL: Q2aNL;
    Q2bNL: Q2bNL;
    Q2cNL: Q2cNL;

    // test:

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
        const conditionForQ2aNL = SurveyEngine.singleChoice.any(this.Q2NL.key, '3', '4', '5');
        this.Q2aNL = new Q2aNL(this.key, conditionForQ2aNL, true);
        this.Q2bNL = new Q2bNL(this.key, true);
        this.Q2cNL = new Q2cNL(this.key, true);

        this.Q1 = new SymptomsQuestion(this.key, true);

        const hasSymptoms = SurveyEngine.multipleChoice.none(this.Q1.key, this.Q1.noSymptomsKey);
        this.HS = new HasSymptomsGroup(this.key, hasSymptoms);
    }

    buildSurvey() {
        // Define order of the questions here:
        this.addItem(this.Q2NL.get());
        this.addItem(this.Q2aNL.get());
        this.addItem(this.Q1.get());
        this.addItem(this.HS.get());
    }
}

export const Weekly = new WeeklyDef();