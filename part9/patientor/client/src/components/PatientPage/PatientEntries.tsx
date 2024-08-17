import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import HeartIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";

import { Entry, Diagnosis, HealthCheckRating } from "../../types";

import { assertNever } from "../../utils/helpers";
import diagnosisService from "../../services/diagnoses";

const EntryIcon = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <LocalHospitalIcon />;
    case "OccupationalHealthcare":
      return (
        <>
          <WorkIcon /> {entry.employerName}
        </>
      );
    case "HealthCheck":
      return <MedicalServicesIcon />;
    default:
      assertNever(entry);
      break;
  }
};

const HealthRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <HeartIcon color="success" />;
    case HealthCheckRating.LowRisk:
      return <HeartIcon color="info" />;
    case HealthCheckRating.HighRisk:
      return <HeartIcon color="warning" />;
    case HealthCheckRating.CriticalRisk:
      return <HeartIcon color="error" />;
    default:
      assertNever(rating);
      break;
  }
};

const PatientEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Typography variant="body1">
          {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
      );
    case "OccupationalHealthcare":
      return;
    case "HealthCheck":
      return HealthRating(entry.healthCheckRating);
    default:
      assertNever(entry);
      break;
  }
};

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
        <Box
          key={e.id}
          sx={{ border: "2px solid grey", borderRadius: 1, marginBottom: 2 }}
        >
          <Typography variant="h6">
            <b>{e.date}</b> <EntryIcon entry={e} />
          </Typography>
          <Typography variant="body1">{e.description}</Typography>
          <ul>
            {diagnoses.map((d) => (
              <li key={d.code}>
                <b>{d.code}</b>: {d.name}
              </li>
            ))}
          </ul>
          <PatientEntry entry={e} />
          <Typography variant="body2">diagnose by {e.specialist}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientEntries;
