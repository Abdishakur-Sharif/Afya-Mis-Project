import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Typography, Menu, MenuItem, Button, Container
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:5555';

function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/patients`);
        setPatientsData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  // const handlePatientClick = (patient) => {
  //   navigate(`/patient/${patient.id}`);
  // };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/patients/${id}`);
      setPatientsData((prevData) => prevData.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleMenuClick = (event, patient) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleRedirectToConsultations = () => {
    navigate(`/patient/${selectedPatient.id}/consultations`);
    handleCloseMenu();
  };

  const handleRedirectToDiagnosis = () => {
    navigate(`/patient/${selectedPatient.id}/diagnosis`);
    handleCloseMenu();
  };

  const handleRedirectToReports = () => {
    navigate(`/patient/${selectedPatient.id}/reports`);
    handleCloseMenu();
  };

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 2 }}>
      {/* Top Toolbar */}
      <AppBar position="static" sx={{ mb: 2, borderRadius: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Patient Management
          </Typography>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <IconButton sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search patients..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Paper>
        </Toolbar>
      </AppBar>

      {/* Patient Table */}
      <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.id}
                hover
                // onClick={() => handlePatientClick(patient)}
                sx={{ cursor: ' pointer' }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar>{patient.name[0]}</Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{patient.gender || 'N/A'}</TableCell>
                <TableCell>{(patient.date_of_birth)}</TableCell>
                <TableCell>{patient.phone_number || 'N/A'}</TableCell>
                <TableCell>{patient.email || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, patient);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Menu for Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleRedirectToConsultations}>Consultation</MenuItem>
        <MenuItem onClick={handleRedirectToDiagnosis}>Diagnosis</MenuItem>
        <MenuItem onClick={handleRedirectToReports}>Report</MenuItem>
        <MenuItem onClick={() => handleDeletePatient(selectedPatient.id)}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default PatientsPage;