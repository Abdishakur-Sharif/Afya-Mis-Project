import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
  Divider,
  Card,
  CardContent,
  Grid,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555';

const DiagnosisPage = () => {
  const { id } = useParams(); // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [diagnosisDate, setDiagnosisDate] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch patient data when component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/patients/${id}`);
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const handleNoteEdit = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const handleDiagnosisDateChange = (e) => {
    setDiagnosisDate(e.target.value);
    if (errors.diagnosisDate) {
      setErrors({ ...errors, diagnosisDate: undefined });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!diagnosisDate) {
      formErrors.diagnosisDate = 'Diagnosis Date is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Here you would typically send the diagnosis data to your backend
      const diagnosisData = {
        patientId: id,
        date: diagnosisDate,
        notes: notes,
      };
      
      // Example API call (adjust according to your API)
      // await axios.post(`${BASE_URL}/diagnosis`, diagnosisData);
      
      console.log("Diagnosis Saved for patient:", id);
      console.log("Diagnosis Data:", diagnosisData);
      setErrors({});
    } catch (error) {
      console.error('Error saving diagnosis:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }} color="primary" align="center">
        New Diagnosis
      </Typography>

      {/* Patient Information Card */}
      <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Selected Patient
          </Typography>
          <Typography variant="h6" component="div">
            {patient?.name}
          </Typography>
          
          <Typography color="textSecondary">
            Date of Birth: {patient?.date_of_birth}
          </Typography>
          <Typography color="textSecondary">
            Gender: {patient?.gender || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Diagnosis Date Input */}
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(errors.diagnosisDate)}>
                <TextField
                  label="Diagnosis Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  required
                  value={diagnosisDate}
                  onChange={handleDiagnosisDateChange}
                />
                {errors.diagnosisDate && (
                  <FormHelperText>{errors.diagnosisDate}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Diagnosis Note Input Field with Add Button */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Diagnosis Notes
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Enter Diagnosis Note"
                  variant="outlined"
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleAddNote}
                  sx={{ minWidth: '120px' }}
                >
                  Add Note
                </Button>
              </Box>
            </Grid>

            {/* Display Added Notes */}
            {notes.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                  Added Diagnosis Notes:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {notes.map((note, index) => (
                    <TextField
                      key={index}
                      label={`Diagnosis Note ${index + 1}`}
                      variant="outlined"
                      value={note}
                      onChange={(e) => handleNoteEdit(index, e.target.value)}
                      fullWidth
                    />
                  ))}
                </Box>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Save Diagnosis
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default DiagnosisPage;