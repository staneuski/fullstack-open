import { useState, SyntheticEvent } from "react";
import dayjs from "dayjs";
import { Button, Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const HospitalForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (date && dischargeDate) {
      const entry: NewEntry = {
        description,
        specialist,
        date,
        type: "Hospital",
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };

      onSubmit(
        diagnosisCodes
          ? {
              ...entry,
              diagnosisCodes: diagnosisCodes.split(/\s*,\s*/),
            }
          : entry
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker
          label="Date"
          value={dayjs(date)}
          onChange={(newDate) => setDate(newDate?.format("YYYY-MM-DD") || null)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <DatePicker
          label="Discharge Date"
          value={dayjs(dischargeDate)}
          onChange={(newDate) =>
            setDischargeDate(newDate?.format("YYYY-MM-DD") || null)
          }
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default HospitalForm;
