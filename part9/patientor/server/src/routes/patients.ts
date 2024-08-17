import express from 'express';

import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.get('/:id', (req, res) => {
  const patient = patientService.get(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  }

  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const patient = patientService.add(toNewPatient(req.body));
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.get(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  }

  res.send(patient);
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.get(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  }

  try {
    const updatedPatient = patientService.addEntry(
      patient.id,
      toNewEntry(req.body),
    );
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
