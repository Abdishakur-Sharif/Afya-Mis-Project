import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, TextField, Button, Box,
  Card, CardContent, Grid, Snackbar, Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555';

const DiagnosisPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    patient: null,
    loading: true,
    labData: null,
    diagnosis: {
      date: '',
      notes: [],
      currentNote: '',
      description: ''
    },
    feedback: {
      success: '',
      error: ''
    },
    isSubmitting: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, labResponse] = await Promise.all([
          axios.get(`${BASE_URL}/patients/${id}`),
          axios.get(`${BASE_URL}/test_reports/${id}`)
        ]);

        // Log patient data to verify appointment_id is included
        console.log('Patient Data:', patientResponse.data);

        setState(prev => ({
          ...prev, 
          patient: patientResponse.data,
          labData: labResponse.data,
          loading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev, 
          loading: false,
          feedback: { error: 'Data fetch failed' }
        }));
      }
    };

    fetchData();
  }, [id]);

  const addNote = () => {
    const { diagnosis } = state;
    const newNote = diagnosis.currentNote.trim();

    if (newNote) {
      setState({
        ...state,
        diagnosis: {
          ...diagnosis,
          notes: [...diagnosis.notes, newNote],
          currentNote: ''
        }
      });
    } else {
      setState({
        ...state,
        feedback: { error: 'Note cannot be empty' }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patient, diagnosis } = state;

    if (state.isSubmitting) return;

    setState({ ...state, isSubmitting: true });

    // Detailed validation
    if (!patient?.id) {
      setState({
        ...state, 
        feedback: { error: 'Patient ID is missing' }, 
        isSubmitting: false 
      });
      return;
    }

    if (!diagnosis.date) {
      setState({ 
        ...state, 
        feedback: { error: 'Diagnosis date is required' }, 
        isSubmitting: false 
      });
      return;
    }

    if (diagnosis.notes.length === 0) {
      setState({ 
        ...state, 
        feedback: { error: 'At least one diagnosis note is required' }, 
        isSubmitting: false 
      });
      return;
    }

    if (!diagnosis.description) {  // Validate that description is not empty
      setState({
        ...state,
        feedback: { error: 'Description is required' },
        isSubmitting: false
      });
      return;
    }

    const diagnosisPayload = {
      patient_id: patient.id,
      doctor_id: patient.doctor_id || null,
      description: diagnosis.description,
      created_at: new Date().toISOString(),
      // appointment_id: patient.appointment_id || null // Ensure this is included
    };

    try {
      await axios.post(`${BASE_URL}/diagnoses`, diagnosisPayload);

      setState({ 
        ...state, 
        feedback: { success: 'Diagnosis created successfully!' },
        isSubmitting: false 
      });
    } catch (error) {
      setState({ 
        ...state, 
        feedback: { 
          error: error.response?.data?.message || 
                 error.response?.data?.error || 
                 'An unexpected error occurred' 
        },
        isSubmitting: false 
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">
            {state.patient ? `${state.patient.name} - New Diagnosis` : 'Loading...'}
          </Typography>
        </CardContent>
      </Card>

      {state.labData && (
        <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Lab Results:</Typography> <Typography>{state.labData.result || 'No results'}
           </Typography>
        </Paper>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Diagnosis Date"a
              type="date"
              fullWidth
              value={state.diagnosis.date}
              onChange={(e) => setState({ 
                ...state, 
                diagnosis: { 
                  ...state.diagnosis, 
                  date: e.target.value 
                } 
              })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={state.diagnosis.description}
              onChange={(e) => setState({ 
                ...state, 
                diagnosis: { 
                  ...state.diagnosis, 
                  description: e.target.value 
                } 
              })}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={9}>
              <TextField
                label="Diagnosis Note"
                fullWidth
                value={state.diagnosis.currentNote}
                onChange={(e) => setState({ 
                  ...state, 
                  diagnosis: { 
                    ...state.diagnosis, 
                    currentNote: e.target.value 
                  } 
                })}
              />
            </Grid>
            <Grid item xs={3}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={addNote}
              >
                Add Note
              </Button>
            </Grid>
          </Grid>

          {state.diagnosis.notes.map((note, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                value={note}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={state.isSubmitting}
            >
              Save Diagnosis
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar 
        open={Boolean(state.feedback.success || state.feedback.error)}
        autoHideDuration={state.feedback.success ? 6000 : 4000}
        onClose={() => setState({ ...state, feedback: { success: '', error: '' } })}
      >
        <Alert 
          severity={state.feedback.success ? 'success' : 'error'}
          onClose={() => setState({ ...state, feedback: { success: '', error: '' } })}
        >
          {state.feedback.success || state.feedback.error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DiagnosisPage;