import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { surveyKeys } from "../contants";

class SwabSampleDef extends SurveyDefinition {
    constructor() {
        super({
            surveyKey: surveyKeys.swabSample,
            name: new Map([
                ["en", "Weakly questionnaire"],
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
    }

    buildSurvey(): void {

    }
}

export const SwabSample = new SwabSampleDef();