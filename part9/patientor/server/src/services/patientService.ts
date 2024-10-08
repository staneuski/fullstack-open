import { v1 as uuid } from 'uuid';

import {
  Patient,
  NewPatient,
  NonSensitivePatient,
  NewEntry,
  Entry,
} from '../types';
import patients from '../../resources/patients';

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const get = (id: string): Patient => {
  const patient: Patient | undefined = patients.find((d) => d.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      ssn: patient.ssn,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
    };
  }

  throw new Error(`patient with id ${id} not found`);
};

const add = (entry: NewPatient): Patient => {
  const patient = { id: uuid(), ...entry };
  patients.push(patient);
  return patient;
};

const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    const entryObj: Entry = {
      ...entry,
      id: (uuid as () => string)(),
    };
    patient.entries.push(entryObj);
    return patient;
  }

  throw new Error(`patient with id ${id} not found`);
};

export default { getAll, get, add, addEntry };
