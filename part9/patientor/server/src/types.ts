//: Diagnose {{{
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
//: }}}

//: Patient {{{
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
//: }}}
