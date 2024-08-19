import { useState, SyntheticEvent } from "react";
import { Button, Grid, TextField } from "@mui/material";

import { Diagnosis, NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

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
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
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
          id="standard-number"
          label="Health Rating"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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
