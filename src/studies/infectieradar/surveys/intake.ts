import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { SurveyEngine } from "case-editor-tools/surveys";
import { Q10, Q10b, Q10c, Q10d, Q11, Q12, Q12b, Q13, Q14, Q15, Q16, Q20NL, Q21NL, Q22NL, Q23NL, Q26NL, Q4b1NL, Q4b2NL, Q4cNL, Q4cNLb, Q4cNLc, Q4d, Q5, Q6, Q6b, Q7b, Q8, Q9, QBirthdate, QGender, QMainActivity, QPostal, qNL_covidvac_lastseason, qNL_covidvac_curseason, qNL_covidvac_date, qNL_covidvac_reason, qNL_covidvac_not_reason, FinalText, SelfSwabInvite } from "../questionPools/intakeQuestions";
import { surveyKeys } from "../contants";

class IntakeDef extends SurveyDefinition {
  QGender: QGender;
  QBirthdate: QBirthdate;
  QPostal: QPostal;
  Q21NL: Q21NL;
  Q22NL: Q22NL;
  QMainActivity: QMainActivity;
  Q4b1NL: Q4b1NL;
  Q4b2NL: Q4b2NL;
  Q4cNL: Q4cNL;
  Q4cNLb: Q4cNLb;
  Q4cNLc: Q4cNLc;
  Q4d: Q4d;
  Q5: Q5;
  Q6: Q6;
  Q6b: Q6b;
  Q7b: Q7b;
  Q20NL: Q20NL;
  Q11: Q11;
  Q12: Q12;
  Q12b: Q12b;
  Q13: Q13;
  Q14: Q14;
  Q15: Q15;
  Q16: Q16;
  Q8: Q8;
  Q9: Q9;
  Q10: Q10;
  Q10b: Q10b;
  Q10c: Q10c;
  Q10d: Q10d;
  Q23NL: Q23NL;
  qNL_covidvac_lastseason: qNL_covidvac_lastseason;
  qNL_covidvac_curseason: qNL_covidvac_curseason;
  qNL_covidvac_date: qNL_covidvac_date;
  qNL_covidvac_reason: qNL_covidvac_reason;
  qNL_covidvac_not_reason:  qNL_covidvac_not_reason;
  Q26NL: Q26NL;
  SelfSwabInvite: SelfSwabInvite;
  FinalText: FinalText;

  constructor() {
    super({
      surveyKey: surveyKeys.intake,
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

    const isRequired = true;

    this.QGender = new QGender(this.key, isRequired);
    this.QBirthdate = new QBirthdate(this.key, isRequired);
    this.QPostal = new QPostal(this.key, isRequired);
    this.Q21NL = new Q21NL(this.key, isRequired);
    this.Q22NL = new Q22NL(this.key, isRequired);
    this.QMainActivity = new QMainActivity(this.key, isRequired);
    this.Q4b1NL = new Q4b1NL(this.key,
      SurveyEngine.singleChoice.any(this.QMainActivity.key, '0', '1', '2', '3', '4', '5', '7', '8'),
      isRequired);
    this.Q4b2NL = new Q4b2NL(this.key,
      SurveyEngine.singleChoice.any(this.Q4b1NL.key, '0'),
      isRequired);
    this.Q4cNL = new Q4cNL(this.key,
      SurveyEngine.singleChoice.any(this.QMainActivity.key, '0', '1', '2'),
      isRequired);
    this.Q4cNLb = new Q4cNLb(this.key, SurveyEngine.singleChoice.any(this.Q4cNL.key, '2'), isRequired);
    this.Q4cNLc = new Q4cNLc(this.key, SurveyEngine.singleChoice.any(this.Q4cNL.key, '0'), isRequired);
    this.Q4d = new Q4d(this.key, isRequired);
    this.Q5 = new Q5(this.key, isRequired);
    this.Q6 = new Q6(this.key, isRequired);
    this.Q6b = new Q6b(this.key, this.Q6.key, isRequired);
    this.Q7b = new Q7b(this.key, isRequired);
    this.Q20NL = new Q20NL(this.key, isRequired);
    const conditionCovid = SurveyEngine.singleChoice.any(this.Q20NL.key, '5', '6');
    this.Q11 = new Q11(this.key, isRequired);
    this.Q12 = new Q12(this.key, SurveyEngine.singleChoice.any(this.QGender.key, '1'), isRequired);
    this.Q12b = new Q12b(this.key, SurveyEngine.singleChoice.any(this.Q12.key, '0'), isRequired);
    this.Q13 = new Q13(this.key, isRequired);
    this.Q14 = new Q14(this.key, isRequired);
    this.Q15 = new Q15(this.key, isRequired);
    this.Q16 = new Q16(this.key, isRequired);
    this.Q8 = new Q8(this.key, isRequired);
    this.Q9 = new Q9(this.key, isRequired);
    this.Q10 = new Q10(this.key, isRequired);
    this.Q10b = new Q10b(this.key, SurveyEngine.singleChoice.any(this.Q10.key, '1'), isRequired);
    this.Q10c = new Q10c(this.key, SurveyEngine.singleChoice.any(this.Q10.key, '0', '1'), isRequired);
    this.Q10d = new Q10d(this.key, SurveyEngine.singleChoice.any(this.Q10.key, '2'), isRequired);
    this.Q23NL = new Q23NL(this.key, isRequired);
    this.qNL_covidvac_lastseason = new qNL_covidvac_lastseason(this.key, isRequired);
    this.qNL_covidvac_curseason = new qNL_covidvac_curseason(this.key, isRequired);
    this.qNL_covidvac_date = new qNL_covidvac_date(this.key, SurveyEngine.singleChoice.any(this.qNL_covidvac_curseason.key, '1'), isRequired);
    this.qNL_covidvac_reason = new qNL_covidvac_reason(this.key, SurveyEngine.singleChoice.any(this.qNL_covidvac_curseason.key, '0', '1'), isRequired);
    this.qNL_covidvac_not_reason = new qNL_covidvac_not_reason(this.key, SurveyEngine.singleChoice.any(this.qNL_covidvac_curseason.key, '2'), isRequired);
    this.Q26NL = new Q26NL(this.key, isRequired);
    this.SelfSwabInvite = new SelfSwabInvite(this.key, true);
    this.FinalText = new FinalText(this.key);
  }

  buildSurvey() {
    this.addItem(this.SelfSwabInvite.get());
    this.addItem(this.QGender.get());
    this.addItem(this.QBirthdate.get());
    this.addItem(this.QPostal.get());
    this.addItem(this.Q21NL.get());
    this.addItem(this.Q22NL.get());
    this.addItem(this.QMainActivity.get());
    this.addItem(this.Q4b1NL.get());
    this.addItem(this.Q4b2NL.get());
    this.addItem(this.Q4cNL.get());
    this.addItem(this.Q4cNLb.get());
    this.addItem(this.Q4cNLc.get());
    this.addItem(this.Q4d.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q6b.get());
    this.addItem(this.Q7b.get());
    this.addItem(this.Q20NL.get());
    this.addItem(this.Q11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q12b.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());
    this.addItem(this.Q10.get());
    this.addItem(this.Q10b.get());
    this.addItem(this.Q10c.get());
    this.addItem(this.Q10d.get());
    this.addItem(this.Q23NL.get());
    this.addItem(this.qNL_covidvac_lastseason.get())
    this.addItem(this.qNL_covidvac_curseason.get())
    this.addItem(this.qNL_covidvac_date.get())
    this.addItem(this.qNL_covidvac_reason.get())
    this.addItem(this.qNL_covidvac_not_reason.get())
    this.addItem(this.Q26NL.get());
    this.addItem(this.FinalText.get());
  }
}

export const Intake = new IntakeDef();
