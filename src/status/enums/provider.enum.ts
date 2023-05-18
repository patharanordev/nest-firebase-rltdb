export enum ProviderStatus {
  Available = 'Available',
  Reserved = 'Reserved',
  Consulting = 'Consulting',
  ConsultationFinished = 'ConsultationFinished',
  Offline = 'Offline',
}

export enum ProviderType {
  Doctor = 'Doctor',
  Pharmacist = 'Pharmacist',
  AlliedHealth = 'AlliedHealth',
}

export enum ProviderKeyPrefix {
  Toggle = 'providerAvailability',
  Consult = 'providerConsultation',
}

export enum LogKeyPrefix {
  Toggle = 'log:toggle',
}

export enum ProviderArea {
  toggle = 'TOGGLE',
  consulting = 'CONSULT',
}

export enum ConsultationStatus {
  Reserved = 'Reserved',
  ConsultationFinished = 'ConsultationFinished',
  Consulting = 'Consulting',
}
