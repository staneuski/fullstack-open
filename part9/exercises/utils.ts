/**
 * Convert string arguments to numbers and check if the number of arguments is
 * correct
 *
 * @param argv expected number of arguments
 * @param args actual arguments (excluding the first two elements of
 * process.argv array)
 * @param strict whether the number of arguments should be strictly equal to
 * argv or should be greater than or equal to argv (default: true)
 */
export const convertArgs = (
  argv: number,
  args: string[],
  strict: boolean = true,
): number[] => {
  if ((strict && args.length !== argv) || (!strict && args.length < argv)) {
    throw new Error(`expected ${argv} arguments, got ${args.length}`);
  }

  const nums = args.map((arg, i) => {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error(`argv[${i}] = ${arg} is not a number`);
    }
    return num;
  });
  return nums;
};

/**
 * @param height height [cm]
 * @param weight weight [kg]
 * @returns BMI value and BMI category
 */
export const calculateBmi = (
  height: number,
  weight: number,
): [number, string] => {
  const bmi = weight / Math.pow(1e-2 * height, 2);
  if (bmi < 18.5) {
    return [bmi, 'Underweight'];
  } else if (bmi < 25) {
    return [bmi, 'Normal (healthy weight)'];
  } else if (bmi < 30) {
    return [bmi, 'Overweight'];
  } else if (bmi < 35) {
    return [bmi, 'Obese Class I (Moderately obese)'];
  } else if (bmi < 40) {
    return [bmi, 'Obese Class II (Severely obese)'];
  } else {
    return [bmi, 'Obese Class III (Very severely obese)'];
  }
};

type ExercisesRes = {
  periodLength: number; // [d]
  trainingDays: number; // [d]
  success: boolean;
  rating: number; //TODO: type Rating = 1 | 2 | 3;
  ratingDescription: string;
  target: number; // [h]
  average: number; // [h]
};

/**
 * @param hours daily [h] exercise hours
 * @param target target [h]
 */
export const calculateExercises = (
  hours: number[],
  target: number,
): ExercisesRes => {
  const stats = {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: false,
    rating: 1,
    ratingDescription: 'keep improving',
    target,
    average: hours.reduce((a, b) => a + b, 0) / hours.length,
  };

  stats.success = stats.average >= target;
  if (stats.success) {
    stats.rating = 3;
    stats.ratingDescription = 'very good';
  } else if (stats.average >= 0.25 * target) {
    stats.rating = 2;
    stats.ratingDescription = 'not too bad but could be better';
  }
  return stats;
};
