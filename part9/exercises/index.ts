import express from 'express';
import { calculateBmi, calculateExercises, convertArgs } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = !isNaN(Number(req.query.height))
    ? Number(req.query.height)
    : NaN;
  const weight: number = !isNaN(Number(req.query.weight))
    ? Number(req.query.weight)
    : NaN;
  if (!weight || !height) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const [_, description] = calculateBmi(height, weight);
  res.send({ height, weight, description });
});

app.post('/exercises', (req, res) => {
  if (!('target' in req.body && 'daily_exercises' in req.body)) {
    res.status(400).send({ error: 'parameters missing' });
  }

  try {
    const [target, ...hours] = convertArgs(
      6, // require minimum 5 days of exercise hours + target hours per day
      [req.body.target, ...req.body.daily_exercises] as string[],
      false,
    );
    res.send(calculateExercises(hours, target));
  } catch (error: unknown) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
