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
  selfSwabbing: {
    key: 'selfSwabbing',
    values: {
      notInvited: 'notInvited',
      invited: 'invited',
      active: 'active',
      quitted: 'quitted',
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
}

