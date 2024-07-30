import { Diagnose } from '../types';
import diagnoses from '../../resources/diagnoses';

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default { getEntries };
