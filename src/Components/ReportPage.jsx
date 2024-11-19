import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccessTime, Assignment, Science } from '@mui/icons-material';

// Mock data
const mockPatientData = {
  name: "John Doe",
  age: 35,
  gender: "Male",
  phone_number: "+1 (555) 123-4567",
  email: "john.doe@example.com",
  date_of_birth: "1988-05-15",
};

const mockConsultations = [
  { consultation_date: "2023-06-01", details: "Patient reported persistent headaches." },
  { consultation_date: "2023-06-15", details: "Follow-up: Headaches have reduced in frequency." },
];

const mockDiagnoses = [
  { created_at: "2023-06-01", diagnosis_description: "Tension headaches, possibly stress-related." },
  { created_at: "2023-06-15", diagnosis_description: "Improving condition, continue current treatment." },
];

const mockLabResults = [
  { test_name: "Complete Blood Count", status: "Completed", test_results: "Within normal range", created_at: "2023-06-02" },
  { test_name: "Thyroid Function Test", status: "Completed", test_results: "Slightly elevated TSH", created_at: "2023-06-02" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const ReportPage = ({ patientId }) => {
  const [patientData, setPatientData] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPatientData(mockPatientData);
        setConsultations(mockConsultations);
        setDiagnoses(mockDiagnoses);
        setLabResults(mockLabResults);
      } catch (err) {
        setError("Error fetching patient report data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  if (loading) {
    return (
      <Container className="py-8 flex justify-center items-center h-screen">
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Typography variant="h6" color="error" className="text-center">{error}</Typography>
      </Container>
    );
  }

  if (!patientData) {
    return null;
  }

  const { name, gender, phone_number, email, date_of_birth } = patientData;
  const age = new Date().getFullYear() - new Date(date_of_birth).getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <Box className="min-h-screen bg-gray-100">
        <Container className="py-8">
          <Typography variant="h4" className="text-center mb-6 text-primary font-bold">Patient Report</Typography>
          <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-lg">
            <Box className="bg-blue-50 p-4 rounded-lg mb-6">
              <Typography variant="h6" className="mb-4 text-blue-800">Patient Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" className="mb-2"><strong>Name:</strong> {name}</Typography>
                  <Typography variant="body1" className="mb-2"><strong>Age:</strong> {age}</Typography>
                  <Typography variant="body1" className="mb-2"><strong>Gender:</strong> {gender}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" className="mb-2"><strong>Phone:</strong> {phone_number}</Typography>
                  <Typography variant="body1" className="mb-2"><strong>Email:</strong> {email}</Typography>
                  <Typography variant="body1" className="mb-2"><strong>DOB:</strong> {date_of_birth}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider className="my-6" />

            <Box className="mb-6">
              <Typography variant="h6" className="mb-4 text-primary flex items-center">
                <AccessTime className="mr-2" /> Consultation Notes
              </Typography>
              {consultations.length > 0 ? (
                consultations.map((note, index) => (
                  <Card key={index} className="mb-2 bg-green-50">
                    <CardContent>
                      <Typography variant="body2" className="text-green-800">
                        <strong>{note.consultation_date}:</strong> {note.details}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" className="text-gray-600">No consultation notes available.</Typography>
              )}
            </Box>

            <Divider className="my-6" />

            <Box className="mb-6">
              <Typography variant="h6" className="mb-4 text-primary flex items-center">
                <Assignment className="mr-2" /> Diagnosis Notes
              </Typography>
              {diagnoses.length > 0 ? (
                diagnoses.map((note, index) => (
                  <Card key={index} className="mb-2 bg-yellow-50">
                    <CardContent>
                      <Typography variant="body2" className="text-yellow-800">
                        <strong>{note.created_at}:</strong> {note.diagnosis_description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" className="text-gray-600">No diagnosis notes available.</Typography>
              )}
            </Box>

            <Divider className="my-6" />

            <Box>
              <Typography variant="h6" className="mb-4 text-primary flex items-center">
                <Science className="mr-2" /> Lab Results
              </Typography>
              {labResults.length > 0 ? (
                <Grid container spacing={2}>
                  {labResults.map((result, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card className="h-full bg-purple-50">
                        <CardContent>
                          <Typography variant="body2" className="mb-2 text-purple-800"><strong>Test:</strong> {result.test_name}</Typography>
                          <Typography variant="body2" className="mb-2 text-purple-800">
                            <strong>Status:</strong> <Chip label={result.status} color="primary" size="small" />
                          </Typography>
                          <Typography variant="body2" className="mb-2 text-purple-800"><strong>Results:</strong> {result.test_results}</Typography>
                          <Typography variant="body2" className="text-purple-800"><strong>Date:</strong> {result.created_at}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" className="text-gray-600">No lab results available.</Typography>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ReportPage;
