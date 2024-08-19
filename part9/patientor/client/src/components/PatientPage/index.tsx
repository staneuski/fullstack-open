import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { Patient, Gender, NewEntry } from "../../types";

import { assertNever } from "../../utils/helpers";
import patientService from "../../services/patients";

import PatientEntries from "./PatientEntries";
import AddPatientEntryModal from "../AddPatientEntryModal";
import axios from "axios";

const GenderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Other:
      return <QuestionMarkIcon />;
    default:
      assertNever(gender);
      break;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (typeof id === "string") {
        try {
          const patient = await patientService.get(id);
          setPatient(patient);
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    if (!id) {
      const message = "Patient ID missing";
      console.error(message);
      setError(message);
      return;
    }

    try {
      const patient = await patientService.createEntry(id, values);
      setPatient(patient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4">
        {patient.name}
        {GenderIcon(patient.gender)}
      </Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      {patient.dateOfBirth && (
        <Typography variant="body1">
          Birth date: {patient.dateOfBirth}
        </Typography>
      )}
      <PatientEntries entries={patient.entries} />
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </Box>
  );
};

export default PatientPage;
