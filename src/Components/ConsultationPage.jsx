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
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5555';

// Appointment Selection Modal Component
const AppointmentModal = ({ open, onClose, appointments, onSelect }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Select an Appointment</DialogTitle>
    <DialogContent>
      <List>
        {appointments.map((appointment) => (
          <ListItem
            button
            key={appointment.id}
            onClick={() => onSelect(appointment)}
          >
            <ListItemText
              primary={`Appointment ID: ${appointment.id}`}
              secondary={`Date: ${appointment.appointment_date}`}
            />
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

const ConsultationPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [consultationDate, setConsultationDate] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setAlertMessage('Failed to load patient data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/appointments`, {
          params: { patient_id: id },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchPatientData();
    fetchDoctors();
    fetchAppointments();
  }, [id]);

  const handleInputChange = (e) => setCurrentNote(e.target.value);

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setNotes((prevNotes) => [...prevNotes, currentNote]);
      setCurrentNote('');
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!consultationDate) formErrors.consultationDate = 'Consultation date is required.';
    if (!selectedDoctorId) formErrors.selectedDoctor = 'Doctor selection is required.';
    if (!selectedAppointment) formErrors.selectedAppointment = 'Appointment selection is required.';
    if (notes.length === 0) formErrors.notes = 'At least one note is required.';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const consultationResponse = await axios.post(`${BASE_URL}/consultations`, {
        patient_id: parseInt(id, 10),
        doctor_id: selectedDoctorId,
        consultation_date: consultationDate,
      });

      const consultationId = consultationResponse.data.id;
      const notePromises = notes.map((note) =>
        axios.post(`${BASE_URL}/consultation_notes`, {
          notes: note,
          patient_id: parseInt(id, 10),
          consultation_id: consultationId,
          created_at: new Date().toISOString(),
          // appointment_id: selectedAppointment.id,
        })
      );
      await Promise.all(notePromises);

      setAlertMessage('Consultation saved successfully!');
      setConsultationDate('');
      setNotes([]);
      setSelectedDoctorId('');
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error saving consultation:', error);
      setAlertMessage('Error saving consultation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(false);
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
      <Typography variant="h4" align="center" gutterBottom>
        New Consultation
      </Typography>
      {alertMessage && <Alert severity="info">{alertMessage}</Alert>}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2">Patient Details:</Typography>
        <Typography>Name: {patient?.name}</Typography>
        <Typography>Date of Birth: {patient?.date_of_birth}</Typography>
        <Typography>Gender: {patient?.gender}</Typography>
      </Paper>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.selectedDoctor}>
          <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
          <Select
            labelId="doctor-select-label"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.selectedDoctor}</FormHelperText>
        </FormControl>
        <Button onClick={() => setModalOpen(true)} sx={{ mb: 3 }}>
          Select Appointment
        </Button>
        <FormHelperText error>{errors.selectedAppointment}</FormHelperText>
        <TextField
          label="Consultation Date"
          type="datetime-local"
          value={consultationDate}
          onChange={(e) => setConsultationDate(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.consultationDate}
          helperText={errors.consultationDate}
        />
        <TextField
          label="Add Notes"
          value={currentNote}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 3 }}
        />
        <Button onClick={handleAddNote} variant="contained" sx={{ mb: 3 }}>
          Add Note
        </Button>
        <ul>
          {notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Save Consultation'}
        </Button>
      </form>
      <AppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        appointments={appointments}
        onSelect={handleSelectAppointment}
      />
    </Container>
  );
};

export default ConsultationPage;
