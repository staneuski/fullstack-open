import { convertArgs, calculateBmi } from './utils';

try {
  const [height, weight]: number[] = convertArgs(2, process.argv.slice(2));
  console.log(calculateBmi(height, weight)[1]);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
