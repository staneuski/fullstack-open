import { Diagnose } from '../types';
import diagnoses from '../../resources/diagnoses';

const getAll = (): Diagnose[] => {
  return diagnoses;
};

export default { getAll };
