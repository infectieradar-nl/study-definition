import { SurveyDefinition } from "../../../case-editor/types/surveyDefinition";

class IntakeDef extends SurveyDefinition {


    constructor() {
        super({
            surveyKey: 'intake',
            name: new Map([
                ["en", "About You"],
                ["nl", "Achtergrond informatie"],
            ]),
            description: new Map([
                ["en", "The intake survey focues on some background and demographic information."],
                ["nl", "Klik op dit aanmeldingsformulier om je achtergrondinformatie in te vullen."],
            ]),
            durationText: new Map([
                ["en", "This will take 5 minutes."],
                ["nl", "Invullen duurt 5 minuten."],
            ])
        });


    }

    buildSurvey() {

    }
}

export const Intake = new IntakeDef();