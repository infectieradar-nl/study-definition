import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { Expression } from 'survey-engine/data_types';
import { surveyKeys } from '../constants';
import { ParticipantFlags } from '../participantFlags';


class SwabNotSelected_Def extends SurveyDefinition {
  Explanation: ExplanationText;
  RecommendTest: RecommendTest;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.SwabNotSelected,
      name: new Map([
        ['nl', 'Niet geselecteerd voor een neus- en keelmonster']
      ]),
      description: new Map([
        ['nl', 'Dit is een bericht die je ontvangt als je deze week niet bent geselecteerd voor het insturen van een neus- en keelmonster.']
      ]),
      durationText: new Map([
        ['nl', 'Lees het bericht.']
      ]),
    });


    // const required = isRequired !== undefined ? isRequired : false;

    const hasRecentSymptoms = SurveyEngine.participantFlags.hasKeyAndValue(
      ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.key, ParticipantFlags.selfSwabbingHasRecentSymptomsInLastWeekly.values.true
    );

    const hasNoRecentTest = SurveyEngine.participantFlags.hasKeyAndValue(
      ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.key, ParticipantFlags.selfSwabbingHasNoTestInLastWeekly.values.true
    );

    const hasSymptomsButNoRecentTest = SurveyEngine.logic.and(
      hasRecentSymptoms,
      hasNoRecentTest
    )

    this.Explanation = new ExplanationText(
      this.key,
      SurveyEngine.logic.not(hasSymptomsButNoRecentTest)
    );
    this.RecommendTest = new RecommendTest(this.key,
      hasSymptomsButNoRecentTest
    );
  }

  buildSurvey() {
    this.addItem(this.Explanation.get());
    this.addItem(this.RecommendTest.get());
  }
}


class ExplanationText extends Item {
  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Info');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
## Je bent niet geselecteerd, je hoeft niets te doen.

Dank je wel voor je melding.
Deze week ben je **NIET** geselecteerd voor het insturen van een neus- of keelmonster.
Je hoeft verder niets te doen.

Nogmaals dank voor het melden.
`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}

class RecommendTest extends Item {
  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'RecommendTest');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
## Doe alsjeblieft een coronazelftest.

Deze week ben je **NIET** geselecteerd voor het insturen van een neus- of keelmonster, maar we vragen je wel om een coronazelftest te doen.
Dit omdat je klachten hebt die duiden op een luchtweginfectie.
De uitslag van deze zelftest kan je eenvoudig doorgeven door nogmaals de link in je (wekelijkse) e-mail te klikken.
Heb je geen zelftesten meer: bestel dan nieuwe via [GLEAN](https://rivmportal.glean.nl/user/auth).

Nogmaals dank voor het melden.
`
            ],
          ]),
          className: '',
        })
      ]
    })
  }
}



export const SwabNotSelected = new SwabNotSelected_Def(true);
