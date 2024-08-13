import { Entry } from "../../types";

import { Box, Typography } from "@mui/material";

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
  if (entries.length === 0) return;

  return (
    <Box>
      <Typography variant="h5">Entries</Typography>
      {entries.map((e) => (
        <Box key={e.id}>
          <Typography variant="h6">{e.date}</Typography>
          <Typography variant="body1">{e.description}</Typography>
          <ul>
            {e.diagnosisCodes?.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};
export default PatientEntries;
