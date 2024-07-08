import express from 'express';
import { calculateBmi } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = !isNaN(Number(req.query.height))
    ? Number(req.query.height)
    : 0;
  const weight: number = !isNaN(Number(req.query.weight))
    ? Number(req.query.weight)
    : 0;
  if (!weight || !height) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const [_, description] = calculateBmi(height, weight);
  res.send({ height, weight, description });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
