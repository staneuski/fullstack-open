import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { Patient, Gender } from "../../types";

import { assertNever } from "../../utils/helpers";
import patientService from "../../services/patients";

import PatientEntries from "./PatientEntries";

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
    </Box>
  );
};

export default PatientPage;
