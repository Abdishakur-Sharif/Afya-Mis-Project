import React, { useState, useEffect } from "react";
import {
  Container, Typography, Paper, TextField, Button,
  Card, CardContent, Grid, Snackbar, Alert, MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "https://afya-mis-backend-6.onrender.com";

const DiagnosisPage = () => {
  const { id } = useParams(); // Patient ID
  const [state, setState] = useState({
    patient: null,
    doctors: [],
    loading: true,
    labData: null,
    consultationId: null, // Store consultation ID here
    diagnosis: {
      notes: [],
      currentNote: '',
      description: '',
      doctorId: '' // Selected doctor ID
    },
    feedback: {
      success: "",
      error: "",
    },
    isSubmitting: false,
  });

  // Fetch patient and lab data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, labResponse, doctorsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/patients/${id}`),
          axios.get(`${BASE_URL}/test_reports/${id}`),
          axios.get(`${BASE_URL}/doctors`) // Fetch the list of doctors
        ]);

        setState(prev => ({
          ...prev,
          patient: patientResponse.data,
          labData: labResponse.data,
          doctors: doctorsResponse.data, // Set doctors data
          loading: false,
          consultationId: patientResponse.data.consultation_id
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          feedback: { error: "Data fetch failed" },
        }));
      }
    };

    fetchData();
  }, [id]);

  // Add a new diagnosis note to the list
  const addNote = () => {
    const { diagnosis } = state;
    const newNote = diagnosis.currentNote.trim();

    if (newNote) {
      setState({
        ...state,
        diagnosis: {
          ...diagnosis,
          notes: [...diagnosis.notes, newNote],
          currentNote: "",
        },
      });
    } else {
      setState({
        ...state,
        feedback: { error: "Note cannot be empty" },
      });
    }
  };

  // Handle form submission for diagnosis
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patient, consultationId, diagnosis } = state;

    if (state.isSubmitting) return;

    setState({ ...state, isSubmitting: true });

    // Validation
    if (!diagnosis.doctorId) {
      setState({
        ...state,
        feedback: { error: 'Please select a doctor' },
        isSubmitting: false
      });
      return;
    }

    const diagnosisPayload = {
      notes: diagnosis.notes,
      patient_id: patient.id,
      consultation_id: consultationId,
      description: diagnosis.description,
      doctor_id: diagnosis.doctorId, // Include the selected doctor's ID
      created_at: new Date().toISOString(),
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
          error: error.response?.data?.message || 'An unexpected error occurred'
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
            {state.patient
              ? `${state.patient.name} - New Diagnosis`
              : "Loading..."}
          </Typography>
        </CardContent>
      </Card>

      {/* Display Lab Results here */}
      {state.labData && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Lab Results:</Typography>
          <Typography>{state.labData.result || 'No results'}</Typography>
        </Paper>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={state.diagnosis.description}
              onChange={(e) => setState({
                ...state,
                diagnosis: { ...state.diagnosis, description: e.target.value }
              })}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Select Doctor"
              fullWidth
              value={state.diagnosis.doctorId}
              onChange={(e) => setState({
                ...state,
                diagnosis: { ...state.diagnosis, doctorId: e.target.value }
              })}
            >
              {state.doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={9}>
              <TextField
                label="Diagnosis Note"
                fullWidth
                value={state.diagnosis.currentNote}
                onChange={(e) => setState({
                  ...state,
                  diagnosis: { ...state.diagnosis, currentNote: e.target.value }
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
        onClose={() =>
          setState({ ...state, feedback: { success: "", error: "" } })
        }
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
