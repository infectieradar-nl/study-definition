import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine } from "case-editor-tools/surveys";
import { Q1aNL, Q1b1NL, Q1b2NL, Q1b3NL, Q1cNL, Q1d1NL, Q1d3NL, Q1dNL, Q1eNL, Q1fNL, Q1gNL, Q1hNL, Q1iNL, Q1jNL, Q1kNL, Q2title, Q3title, Q4title } from "../questionPools/coronaTest";
import { Q2NL, Q2aNL, Q2bNL, Q2cNL } from "../questionPools/coronaVaccine";
import { FinalText, HasSymptomsGroup, SymptomsGroup } from "../questionPools/weeklyQuestions";
import { Q12NL, Q12aNL, Q12bNL, Q12cNL, Q12dNL } from "../questionPools/quarantine";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

class WeeklyDef extends SurveyDefinition {

    // vaccination:
    Q2NL: Q2NL;
    Q2aNL: Q2aNL;
    Q2bNL: Q2bNL;
    Q2cNL: Q2cNL;

    // TEST:
    Q1aNL: Q1aNL;
    // self-test
    Q2title: Q2title;
    Q1kNL: Q1kNL;
    Q1b3NL: Q1b3NL;
    Q1d3NL: Q1d3NL;
    Q1jNL: Q1jNL;
    // nose/throat swab
    Q3title: Q3title;
    Q1d1NL: Q1d1NL;
    Q1cNL: Q1cNL;
    Q1eNL: Q1eNL;
    Q1fNL: Q1fNL;
    Q1gNL: Q1gNL;
    Q1hNL: Q1hNL;
    Q1b1NL: Q1b1NL;
    Q1iNL: Q1iNL;
    // blood test
    Q4title: Q4title;
    Q1dNL: Q1dNL;
    Q1b2NL: Q1b2NL;
    // symptoms:
    Q1: SymptomsGroup;
    HS: HasSymptomsGroup;
    // Quarantine:
    Q12NL: Q12NL;
    Q12aNL: Q12aNL;
    Q12bNL: Q12bNL;
    Q12cNL: Q12cNL;
    Q12dNL: Q12dNL;
    FinalText: FinalText;



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
        const conditionForPCR = SurveyEngine.multipleChoice.any(
            this.Q1aNL.key, this.Q1aNL.optionKeys.pcr
        );
        const conditionForBloodTest = SurveyEngine.multipleChoice.any(
            this.Q1aNL.key, this.Q1aNL.optionKeys.blood
        );
        this.Q2title = new Q2title(this.key, conditionForSelfTest);
        this.Q1kNL = new Q1kNL(this.key, conditionForSelfTest, true);
        this.Q1b3NL = new Q1b3NL(this.key, conditionForSelfTest, true);
        const conditionForPositiveSelfTest = SurveyEngine.singleChoice.any(
            this.Q1b3NL.key, this.Q1b3NL.optionKeys.positive
        );
        this.Q1d3NL = new Q1d3NL(this.key, conditionForPositiveSelfTest, true);
        this.Q1jNL = new Q1jNL(this.key, conditionForSelfTest, true);
        this.Q3title = new Q3title(this.key, conditionForPCR);
        this.Q1d1NL = new Q1d1NL(this.key, conditionForPCR, true);
        this.Q1cNL = new Q1cNL(this.key, conditionForPCR, true);
        this.Q1eNL = new Q1eNL(this.key, conditionForPCR, true);
        this.Q1fNL = new Q1fNL(this.key, conditionForPCR, true);
        this.Q1gNL = new Q1gNL(this.key, conditionForPCR, true);
        this.Q1hNL = new Q1hNL(this.key, conditionForPCR, true);
        this.Q1b1NL = new Q1b1NL(this.key, conditionForPCR, true);
        this.Q1iNL = new Q1iNL(this.key, conditionForPCR, true);
        this.Q4title = new Q4title(this.key, conditionForBloodTest);
        this.Q1dNL = new Q1dNL(this.key, conditionForBloodTest, true);
        this.Q1b2NL = new Q1b2NL(this.key, conditionForBloodTest, true);

        this.Q1 = new SymptomsGroup(this.key);

        const hasAnySymptoms = SurveyEngine.multipleChoice.none(this.Q1.QSymptoms.key, this.Q1.QSymptoms.optionKeys.no);
        const hasFeverCondition = SurveyEngine.multipleChoice.any(this.Q1.QSymptoms.key, this.Q1.QSymptoms.optionKeys.fever);
        this.HS = new HasSymptomsGroup(this.key, hasAnySymptoms, hasFeverCondition);

        this.Q12NL = new Q12NL(this.key, true);
        const conditionForQuarantine = SurveyEngine.singleChoice.any(this.Q12NL.key, '1');
        const conditionForNotQuarantine = SurveyEngine.singleChoice.any(this.Q12NL.key, '0',);

        this.Q12aNL = new Q12aNL(this.key, conditionForQuarantine, true);
        const conditionForQuarantineToday = SurveyEngine.singleChoice.any(this.Q12aNL.key, '1');

        this.Q12bNL = new Q12bNL(this.key, conditionForQuarantineToday, true);
        const conditionForQuarantineWork = SurveyEngine.singleChoice.any(this.Q12bNL.key, '1');

        this.Q12cNL = new Q12cNL(this.key, conditionForNotQuarantine, true);
        const conditionForQuarantineOther = SurveyEngine.singleChoice.any(this.Q12cNL.key, '1');
        const conditionForQ12dNL = SurveyEngine.logic.or(conditionForQuarantineWork, conditionForQuarantineOther);

        this.Q12dNL = new Q12dNL(this.key, conditionForQ12dNL, true);

        this.FinalText = new FinalText(this.key);
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

        this.addItem(this.Q3title.get());
        this.addItem(this.Q1d1NL.get());
        this.addItem(this.Q1cNL.get());
        this.addItem(this.Q1eNL.get());
        this.addItem(this.Q1fNL.get());
        this.addItem(this.Q1gNL.get());
        this.addItem(this.Q1hNL.get());
        this.addItem(this.Q1b1NL.get());
        this.addItem(this.Q1iNL.get());

        this.addItem(this.Q4title.get());
        this.addItem(this.Q1dNL.get());
        this.addItem(this.Q1b2NL.get());

        this.addItem(this.Q1.get());
        this.addItem(this.HS.get());

        this.addItem(this.Q12NL.get());
        this.addItem(this.Q12aNL.get());
        this.addItem(this.Q12bNL.get());
        this.addItem(this.Q12cNL.get());
        this.addItem(this.Q12dNL.get());

        this.addItem(this.FinalText.get());
    }
}

export const Weekly = new WeeklyDef();