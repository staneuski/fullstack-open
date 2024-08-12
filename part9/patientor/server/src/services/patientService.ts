import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, NonSensitivePatient } from '../types';
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

const get = (id: string): NonSensitivePatient => {
  const patient: Patient | undefined = patients.find((d) => d.id === id);
  if (patient) {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };
  }

  throw new Error(`patient with id ${id} not found`);
};

const add = (entry: NewPatient): Patient => {
  const patient = { id: uuid(), ...entry };
  patients.push(patient);
  return patient;
};

export default { getAll, get, add };
