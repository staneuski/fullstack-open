import { Diagnosis } from '../types';
import diagnoses from '../../resources/diagnoses';

const getAll = (): Diagnosis[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

export default { getAll };
