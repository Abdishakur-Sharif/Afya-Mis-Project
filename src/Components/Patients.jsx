import React, { useEffect, useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Typography, Menu, MenuItem, Button, Container,
  Chip, Stack, Tooltip, CircularProgress
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:5555';
const POLLING_INTERVAL = 30000; // Poll every 30 seconds

function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const navigate = useNavigate();

  // Function to fetch patients data without appointments
  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/patients`);
      setPatientsData(response.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Set up polling
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchPatients();
    }, POLLING_INTERVAL);

    return () => clearInterval(pollInterval);
  }, [fetchPatients]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleManualRefresh = () => {
    fetchPatients();
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/patients/${id}`);
      setPatientsData((prevData) => prevData.filter((patient) => patient.id !== id));
      handleCloseMenu();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleMenuClick = (event, patient) => {
    event.stopPropagation();
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

  const formatLastUpdate = (date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 2 }}>
      <AppBar position="static" sx={{ mb: 2, borderRadius: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Patient Management
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
            <Typography variant="body2" color="inherit">
              Last updated: {formatLastUpdate(lastUpdate)}
            </Typography>
            <Tooltip title="Refresh data">
              <IconButton 
                color="inherit" 
                onClick={handleManualRefresh}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <RefreshIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
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
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar>{patient.name[0]}</Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{patient.gender || 'N/A'}</TableCell>
                <TableCell>{patient.date_of_birth}</TableCell>
                <TableCell>{patient.phone_number || 'N/A'}</TableCell>
                <TableCell>{patient.email || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, patient)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleRedirectToConsultations}>Consultation</MenuItem>
        <MenuItem onClick={handleRedirectToDiagnosis}>Diagnosis</MenuItem>
        <MenuItem onClick={handleRedirectToReports}>Report</MenuItem>
        <MenuItem onClick={() => handleDeletePatient(selectedPatient?.id)}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default PatientsPage;
