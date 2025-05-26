export const ParticipantFlags = {
  hasOnGoingSymptoms: {
    key: 'prev',
    values: {
      no: '0',
      yes: '1'
    }
  },
  covidVaccine21: {
    key: '21-vacc',
    values: {
      full: 'full',
      never: 'never'
    }
  },
  lastReplyToVaccination: {
    key: 'lastReplyToVaccination',
  },
  lastWeeklySubmission: {
    key: 'lastWeeklySubmission',
  },
  selfSwabbing: {
    key: 'selfSwabbing',
    values: {
      invitedWithoutCode: 'invitedWithoutCode',
      notInvited: 'notInvited',
      invited: 'invited',
      interestedLater: 'interestedLater',
      active: 'active',
      quitted: 'quitted',
    }
  },
  selfSwabbingSampledTime: {
    key: 'selfSwabbingSampledTime',
  },
  selfSwabbingHasNoTestInLastWeekly: {
    key: 'selfSwabbingHasNoTestInLastWeekly',
    values: {
      true: 'true',
      false: 'false',
    }
  },
  selfSwabbingHasRecentSymptomsInLastWeekly: {
    key: 'selfSwabbingHasRecentSymptomsInLastWeekly',
    values: {
      true: 'true',
      false: 'false',
    }
  },
  selfSwabbingContactData: {
    key: 'contactDataForSelfSwabbing',
    values: {
      active: 'active',
      manualDeleted: 'manual-deleted',
      autoDeleted: 'auto-deleted'
    },
  },
  seasonalFluVaccine: {
    key: 'seasonalFluVaccine',
    values: {
      yes: 'yes',
      no: 'no',
    }
  },
  seasonalCovidVaccine: {
    key: 'seasonalCovidVaccine',
    values: {
      yes: 'yes',
      no: 'no',
    }
  },
  gender: {
    key: 'gender',
    values: {
      female: 'female',
      male: 'male',
      other: 'other',
    },
  },
  intervalGroup: {
    key: 'intervalGroup',
    // value is a random number
  },
  intervalHidePregnancyQ: {
    key: 'intervalHidePregnancyQ',
    values: {
      true: 'true',
      false: 'false',
    }
  },
  intervalHideVaccinationQ: {
    key: 'intervalHideVaccinationQ',
    values: {
      true: 'true',
      false: 'false',
    }
  }
}

