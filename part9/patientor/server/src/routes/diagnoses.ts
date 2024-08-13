import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getAll());
});

router.get('/:id', (req, res) => {
  const diagnoses = diagnosisService.get(req.params.id.toUpperCase());

  if (!diagnoses) {
    res.sendStatus(404);
  } else {
    res.send(diagnoses);
  }
});

export default router;
