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
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccessTime, Assignment, Science } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "https://afya-mis-backend-6.onrender.com"; // Update if the base URL differs

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

const ReportPage = () => {
  const { patientId } = useParams(); // Extract patientId from URL
  const [consultations, setConsultations] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data for consultations, diagnoses, and lab reports specific to the patient
  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state before new fetch
    try {
      const [consultationsResponse, diagnosesResponse, labResultsResponse] = await Promise.all([
        axios.get(`${BASE_URL}/consultations`, { params: { patient_id: patientId } }), // Fetch consultations for the patient
        axios.get(`${BASE_URL}/diagnoses`, { params: { patient_id: patientId } }), // Fetch diagnoses for the patient
        axios.get(`${BASE_URL}/test_reports`, { params: { patient_id: patientId } }), // Fetch lab results for the patient
      ]);
      setConsultations(consultationsResponse.data);
      setDiagnoses(diagnosesResponse.data);
      setLabResults(labResultsResponse.data);
    } catch (err) {
      setError('Error fetching patient report data. Please verify the API endpoints.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when patientId changes
  useEffect(() => {
    fetchData();
  }, [patientId]);

  if (loading) {
    return (
      <Container sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={fetchData}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Container sx={{ py: 8 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            Patient Report
          </Typography>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
            {/* Consultations */}
            <Section title="Consultation Notes" icon={<AccessTime />}>
              {consultations.length > 0 ? (
                consultations.map((note, index) => (
                  <Card key={index} sx={{ mb: 2, backgroundColor: 'green.50' }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: 'green.800' }}>
                        <strong>{note.consultation_date}:</strong> {note.notes}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  No consultation notes available.
                </Typography>
              )}
            </Section>

            <Divider sx={{ my: 6 }} />

            {/* Diagnoses */}
            <Section title="Diagnosis Notes" icon={<Assignment />}>
              {diagnoses.length > 0 ? (
                diagnoses.map((note, index) => (
                  <Card key={index} sx={{ mb: 2, backgroundColor: 'yellow.50' }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: 'yellow.800' }}>
                        <strong>{note.created_at}:</strong> {note.diagnosis_description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  No diagnosis notes available.
                </Typography>
              )}
            </Section>

            <Divider sx={{ my: 6 }} />

            {/* Lab Results */}
            <Section title="Lab Results" icon={<Science />}>
              {labResults.length > 0 ? (
                <Grid container spacing={2}>
                  {labResults.map((result, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ backgroundColor: 'purple.50' }}>
                        <CardContent>
                          <Typography variant="body2" sx={{ color: 'purple.800', mb: 1 }}>
                            <strong>Test:</strong> {result.test_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'purple.800', mb: 1 }}>
                            <strong>Status:</strong>{' '}
                            <Chip label={result.status} color="primary" size="small" />
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'purple.800', mb: 1 }}>
                            <strong>Results:</strong> {result.test_results}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'purple.800' }}>
                            <strong>Date:</strong> {result.created_at}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" sx={{ color: 'gray.600' }}>
                  No lab results available.
                </Typography>
              )}
            </Section>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

// Section component for rendering each section
const Section = ({ title, icon, children }) => (
  <Box sx={{ mb: 6 }}>
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon && React.cloneElement(icon, { sx: { mr: 1 } })} {title}
    </Typography>
    {children}
  </Box>
);

export default ReportPage;
