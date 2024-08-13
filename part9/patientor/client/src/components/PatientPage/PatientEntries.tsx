import { useEffect, useState } from "react";

import diagnosisService from "../../services/diagnoses";
import { Entry, Diagnosis } from "../../types";

import { Box, Typography } from "@mui/material";

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async (codes: string[]) => {
      if (codes.length !== 0) {
        try {
          const diagnoses = await diagnosisService.getAll();
          setDiagnoses(diagnoses.filter((d) => codes.includes(d.code)));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchDiagnoses(entries.flatMap((e) => e.diagnosisCodes || []));
  }, [entries]);

  return (
    <Box>
      {entries.length ? <Typography variant="h5">Entries</Typography> : null}
      {entries.map((e) => (
        <Box key={e.id}>
          <Typography variant="h6">{e.date}</Typography>
          <Typography variant="body1">{e.description}</Typography>
          <ul>
            {diagnoses.map((d) => (
              <li key={d.code}>
                <b>{d.code}</b>: {d.name}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};
export default PatientEntries;
