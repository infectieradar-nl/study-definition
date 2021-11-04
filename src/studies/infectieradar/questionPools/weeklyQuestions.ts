import { Expression } from "survey-engine/lib/data_types";
import { Group } from "../../../case-editor/types/group";
import { Item } from "../../../case-editor/types/item";
import { SurveyItemGenerators } from "../../../case-editor/utils/question-type-generator";



export class HasSymptomsGroup extends Group {
    /*
    Q1: QuestionAboutMedicalHistory;
    Q3: LymeGroup;
    */
    Q4: Q4;

    constructor(parentKey: string, groupCondition: Expression) {
        super(parentKey, 'G3');

        this.groupEditor.setCondition(groupCondition);

        const isRequired = true;

        /*this.Q1 = new QuestionAboutMedicalHistory(this.key, false, q1Condition);
        this.Q3 = new LymeGroup(this.key);*/
        this.Q4 = new Q4(this.key, isRequired);
    }

    buildGroup() {
        this.addItem(this.Q4.get());
        //this.addPageBreak();
        //this.addItem(this.Q3.get());
    }
}

export class SymptomsQuestion extends Item {
    noSymptomsKey = '0';

    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q1');
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


class Q4 extends Item {
    constructor(parentKey: string, isRequired: boolean) {
        super(parentKey, 'Q4');

        this.isRequired = isRequired;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
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