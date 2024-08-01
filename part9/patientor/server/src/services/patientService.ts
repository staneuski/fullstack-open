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

const add = (entry: NewPatient): Patient => {
  const patient = { id: uuid(), ...entry };
  patients.push(patient);
  return patient;
};

export default { getAll, add };
