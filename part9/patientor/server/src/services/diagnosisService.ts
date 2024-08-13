import { Diagnosis } from '../types';
import diagnoses from '../../resources/diagnoses';

const getAll = (): Diagnosis[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

const get = (code: string): Diagnosis => {
  const diagnosis: Diagnosis | undefined = diagnoses.find(
    (d) => d.code === code,
  );
  if (diagnosis) {
    return {
      code: diagnosis.code,
      name: diagnosis.name,
      latin: diagnosis?.latin,
    };
  }

  throw new Error(`diagnosis with code ${code} not found`);
};

export default { getAll, get };
