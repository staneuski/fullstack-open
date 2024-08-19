import { useState } from "react";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { NewEntry } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

const entryOptions: Array<{
  type: string;
  label: string;
}> = [
  { type: "Hospital", label: "Hospital" },
  { type: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { type: "HealthCheck", label: "Health Check" },
];

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddPatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  const [entryOption, setEntryOption] = useState(entryOptions[0].type);

  const onEntryOptionChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value as string;
      const entryOption = entryOptions.find((e) => e.type === value);
      if (entryOption) {
        setEntryOption(entryOption.type);
      }
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />

      <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
      <Select
        label="Type"
        fullWidth
        value={entryOption}
        onChange={onEntryOptionChange}
      >
        {entryOptions.map((option) => (
          <MenuItem key={option.type} value={option.type}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {entryOption === "HealthCheck" && (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {entryOption === "Hospital" && (
          <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {entryOption === "OccupationalHealthcare" && (
          <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientEntryModal;
