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

const OccupationalHealthcareForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (date) {
      const entry: NewEntry = {
        description,
        specialist,
        date,
        type: "OccupationalHealthcare",
        employerName,
      };
      if (startDate && endDate) {
        entry.sickLeave = { startDate, endDate };
      }
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
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <DatePicker
          label="Start Date"
          value={dayjs(startDate)}
          onChange={(newDate) =>
            setStartDate(newDate?.format("YYYY-MM-DD") || null)
          }
        />
        <DatePicker
          label="End Date"
          value={dayjs(startDate)}
          onChange={(newDate) =>
            setEndDate(newDate?.format("YYYY-MM-DD") || null)
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

export default OccupationalHealthcareForm;
