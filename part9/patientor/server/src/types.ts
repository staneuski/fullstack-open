type OmitUnion<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

//: Diagnosis {{{
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type NewEntry = OmitUnion<Entry, 'id'>;
//: }}}

//: Patient {{{
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
//: }}}
