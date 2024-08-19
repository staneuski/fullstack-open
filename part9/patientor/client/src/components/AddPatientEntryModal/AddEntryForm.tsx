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

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (date) {
      const entry: NewEntry = {
        description,
        specialist,
        date,
        type: "HealthCheck",
        healthCheckRating,
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
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(target.value)
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={dayjs(date)}
            onChange={(newDate) =>
              setDate(newDate?.format("YYYY-MM-DD") || null)
            }
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setSpecialist(target.value)
          }
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setDiagnosisCodes(target.value)
          }
        />
        <TextField
          id="standard-number"
          label="Health Rating"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setHealthCheckRating(Number(target.value))
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
    </div>
  );
};

export default AddEntryForm;
