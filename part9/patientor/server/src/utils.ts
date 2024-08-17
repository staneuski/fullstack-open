import {
  Diagnosis,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from './types';

//: Primitives {{{
//: Number
const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

//: String
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect text: ' + text);
  }
  return text;
};
//: }}}

//: Date {{{
const isDate = (date: unknown): boolean => {
  return isString(date) && Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};
//: }}}

//: Patient {{{
//: Gender
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

//: Patient
export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const patient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return patient;
  }

  throw new Error('Incorrect data: a field missing');
};

//: DiagnosisCodes
const isDiagnosisCodes = (
  object: unknown,
): object is Array<Diagnosis['code']> => {
  return Array.isArray(object) && object.every((item) => isString(item));
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!isDiagnosisCodes(object)) {
    throw new Error(`Invalid DiagnosisCodes: ${object}`);
  }
  return object;
};

//: Entry
const isNewEntry = (object: unknown): object is NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  return 'description' in object && 'date' in object && 'specialist' in object;
};

//: HospitalEntry
const isDischarge = (
  object: unknown,
): object is { date: Date; criteria: string } => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  return 'date' in object && 'criteria' in object;
};
const isHospitalEntry = (object: unknown): object is HospitalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  return (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    object.type === 'Hospital' &&
    'discharge' in object &&
    isDischarge(object.discharge)
  );
};

//: OccupationalHealthcareEntry
const isSickLeave = (
  object: unknown,
): object is { startDate: Date; endDate: Date } => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  return 'startDate' in object && 'endDate' in object;
};
const isOccupationalHealthcareEntry = (
  object: unknown,
): object is OccupationalHealthcareEntry => {
  return (
    isNewEntry(object) &&
    'type' in object &&
    object.type === 'OccupationalHealthcare' &&
    'employerName' in object &&
    (!('sickLeave' in object) ||
      ('sickLeave' in object && isSickLeave(object.sickLeave)))
  );
};

//: HealthCheckEntry
const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return isNumber(rating) && Object.values(HealthCheckRating).includes(rating);
};
// Function to parse and validate the input as HealthCheckRating
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Invalid HealthCheckRating: ${rating}`);
  }
  return rating;
};
const isHealthCheckEntry = (object: unknown): object is HealthCheckEntry => {
  return (
    isNewEntry(object) &&
    'type' in object &&
    object.type === 'HealthCheck' &&
    'healthCheckRating' in object
  );
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!isNewEntry(object)) {
    throw new Error('not valid NewEntry object');
  }

  const entry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
  } as NewEntry;
  if ('diagnosisCodes' in object && object.diagnosisCodes) {
    entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  if (isHospitalEntry(object)) {
    return {
      ...entry,
      type: object.type,
      discharge: {
        date: object.discharge.date,
        criteria: object.discharge.criteria,
      },
    };
  } else if (isOccupationalHealthcareEntry(object)) {
    const occupationalHealthcareEntry: NewEntry = {
      ...entry,
      type: object.type,
      employerName: parseString(object.employerName),
    };
    return object.sickLeave
      ? {
          ...occupationalHealthcareEntry,
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
        }
      : occupationalHealthcareEntry;
  } else if (isHealthCheckEntry(object)) {
    return {
      ...entry,
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  }

  throw new Error('not valid NewEntry object');
};
//: }}}
