import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Tabs,
  Tab,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf'; // Import jsPDF
import axios from 'axios'; // Import axios for backend request

const initialPatientsData = [
  { id: 1, name: 'Willie Jennie', phone: '(302) 555-0107', email: 'willie.jennings@mail.com', address: '8309 Barby Hill', registered: 'Mar 12, 2021', lastVisit: 'Jun 05, 2021', treatment: 'Tooth Scaling + Bleaching', avatar: '', active: true },
  { id: 2, name: 'Michelle Rivera', phone: '(208) 555-0112', email: 'michelle.rivera@mail.com', address: '534 Victoria Trail', registered: 'Mar 12, 2021', lastVisit: 'May 03, 2021', treatment: 'Tooth Scaling + Veneer', avatar: '', active: false },
];

function PatientPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsData, setPatientsData] = useState(initialPatientsData);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setPrescription('');
    setDiagnosis('');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (id) => {
    setPatientsData((prevData) => prevData.filter((patient) => patient.id !== id));
  };

  // Function to download patient data as PDF
  const handleDownloadPatientData = () => {
    if (!selectedPatient) return;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Patient Details', 10, 10);

    doc.text(`Name: ${selectedPatient.name}`, 10, 20);
    doc.text(`Phone: ${selectedPatient.phone}`, 10, 30);
    doc.text(`Email: ${selectedPatient.email}`, 10, 40);
    doc.text(`Address: ${selectedPatient.address}`, 10, 50);
    doc.text(`Registered: ${selectedPatient.registered}`, 10, 60);
    doc.text(`Last Visit: ${selectedPatient.lastVisit}`, 10, 70);
    doc.text(`Last Treatment: ${selectedPatient.treatment}`, 10, 80);
    doc.text(`Diagnosis: ${diagnosis}`, 10, 90);
    doc.text(`Prescription: ${prescription}`, 10, 100);

    doc.save(`${selectedPatient.name}_details.pdf`);
  };

  // Function to update the patient diagnosis and prescription in the backend
  const handleUpdatePatientData = async () => {
    if (!selectedPatient) return;

    // try {
    //    Replace with your backend endpoint
    //   const response = await axios.post('/api/update-patient-diagnosis', {
    //     id: selectedPatient.id,
    //     diagnosis,
    //     prescription,
    //   });

    //    Handle the response (e.g., success or failure message)
    //   if (response.status === 200) {
    //     alert('Diagnosis updated successfully!');
    //     handleDialogClose();
    //   } else {
    //     alert('Failed to update diagnosis.');
    //   }
    // } catch (error) {
    //   console.error('Error updating patient diagnosis:', error);
    //   alert('An error occurred while updating the diagnosis.');
    // }
  };

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="flex flex-col h-screen w-full overflow-hidden fixed">
      {/* Top Toolbar */}
      <AppBar position="static" color="primary" className="mb-2">
        <Toolbar className="flex justify-between px-2 py-1">
          <Typography variant="h5" className="font-semibold">Patient Management</Typography>
          <Box className="flex items-center bg-white rounded px-1">
            <IconButton><SearchIcon className="text-gray-600" /></IconButton>
            <InputBase
              placeholder="Search patients…"
              className="ml-2 text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Tabs for Active/Inactive Treatments */}
      <Tabs
        value={tabValue}
        onChange={(e, val) => setTabValue(val)}
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="treatment tabs"
        className="mb-2"
      >
        <Tab label="Active Treatment" className="font-semibold" />
        <Tab label="Inactive Treatment" className="font-semibold" />
      </Tabs>

      {/* Patient Table */}
      <TableContainer component={Paper} className="shadow-lg rounded mt-2  flex-grow overflow-auto">
        <Table aria-label="patient table">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-semibold">Patient Name</TableCell>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Address</TableCell>
              <TableCell className="font-semibold">Registered</TableCell>
              <TableCell className="font-semibold">Last Visit</TableCell>
              <TableCell className="font-semibold">Last Treatment</TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} style={{ cursor: 'pointer' }}>
                <TableCell onClick={() => handlePatientClick(patient)}>
                  <Box className="flex items-center">
                    <Avatar className="bg-primary mr-1">{patient.avatar || patient.name[0]}</Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.phone}</TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.email}</TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.address}</TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.registered}</TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.lastVisit}</TableCell>
                <TableCell onClick={() => handlePatientClick(patient)}>{patient.treatment}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeletePatient(patient.id)} sx={{ padding: 1 }}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogContent sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedPatient.name}
            </Typography>
            <Typography  variant="body2" color="teal">
              Phone: {selectedPatient.phone}
            </Typography>
            <Typography variant="body2" color="teal">
              Email: {selectedPatient.email}
            </Typography>
            <Typography variant="body2" color="teal">
              Address: {selectedPatient.address}
            </Typography>
            <Typography variant="body2" color="teal" gutterBottom>
              Last Treatment: {selectedPatient.treatment}
            </Typography>

            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12}>
                <TextField
                  label="Diagnosis"
                  fullWidth
                  multiline
                  rows={3}
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Prescription"
                  fullWidth
                  multiline
                  rows={3}
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ padding: 1 }}>
            <Button onClick={handleDialogClose} color="secondary" sx={{ paddingX: 3 }}>
              Close
            </Button>
            <Button color="primary" variant="contained" onClick={handleDownloadPatientData} sx={{ paddingX: 3 }}>
              Download PDF
            </Button>
            <Button color="secondary" variant="outlined" onClick={handleUpdatePatientData} sx={{ paddingX: 3 }}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default PatientPage;
