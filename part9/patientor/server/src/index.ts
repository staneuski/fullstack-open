import cors from 'cors';
import express from 'express';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(cors()); // eslint-disable-line @typescript-eslint/no-unsafe-call

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
