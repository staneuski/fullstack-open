import { convertArgs, calculateExercises } from './utils';

try {
  const args: number[] = convertArgs(
    6, // require minimum 5 days of exercise hours + target hours per day
    process.argv.slice(2),
    false,
  );
  console.log(args.slice(0, -1), args[args.length - 1]);
  console.log(calculateExercises(args.slice(0, -1), args[args.length - 1]));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
