import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
} from '@mui/material';
import {
  IconStethoscope,
  IconFileText,
  IconLogout,
  IconHospitalCircle
} from '@tabler/icons-react';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

// Sample data for test requests
const testRequests = [
  {
    patientName: 'Flores, Juanita',
    dob: '1989-12-03',
    doctor: 'Dr M. Wagner',
    testType: 'Complete Blood Count',
    priority: 'Routine',
    ciDate: '2023-09-14, 08:30 AM',
    status: 'Completed',
    dueDate: '2023-09-15, 02:00 PM',
  },
  {
    patientName: 'Cooper, Kristin',
    dob: '1991-03-21',
    doctor: 'Dr R. Greensmit',
    testType: 'Lipid Profile',
    priority: 'Urgent',
    ciDate: '2023-09-14, 10:15 AM',
    status: 'In-Progress',
    dueDate: '2023-09-15, 01:00 PM',
  },
];

function TestRequestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    dob: '',
    doctor: '',
    testType: '',
    priority: 'Routine',
    ciDate: '',
    status: 'Pending',
    dueDate: '',
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleAddRequest = () => {
    testRequests.push(newRequest);
    setNewRequest({
      patientName: '',
      dob: '',
      doctor: '',
      testType: '',
      priority: 'Routine',
      ciDate: '',
      status: 'Pending',
      dueDate: '',
    });
    setOpenDialog(false);
  };

  const filteredRequests = testRequests.filter((request) =>
    request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-row'>
      <Paper shadow="sm" className="md:w-1/4 w-full h-auto md:h-[500px] p-4">
        <h2 className="text-4xl ml-5 my-5 font-bold text-blue-500 mb-5 md:mr-10">Afya</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/lab-dashboard"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
            >
              <IconHospitalCircle size={20} className="mr-3" />
              Lab Requests
            </a>
          </li>
          <li>
            <a
              href="/doctors"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
            >
              <IconStethoscope size={20} className="mr-3" />
              Doctors
            </a>
          </li>
          <li>
            <a
              href="/labreportform"
              className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
            >
              <IconFileText size={20} className="mr-3" />
              Lab Reports
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="flex items-center p-2 text-gray-700 hover:bg-red-500 hover:text-white transition-colors rounded-md"
            >
              <IconLogout size={20} className="mr-3" />
              Logout
            </a>
          </li>
        </ul>
      </Paper>
    <div className="min-h-screen bg-gray-100 p-4">
      
      {/* AppBar with Search Box and Add Button */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', borderBottom: '1px solid #ddd' }}>
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" sx={{ color: '#ffffff' }}>Test Requests</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              padding: '0 10px',
              width: '300px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              placeholder="Search by name, doctor, test..."
              sx={{ marginLeft: '8px', flex: 1 }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>

          {/* Add Button - Floating Action Button with Plus Icon */}
          <Fab
            color="primary"
            size="small"
            onClick={handleDialogOpen}
            sx={{ marginLeft: '20px' }}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>

      {/* Dialog for Adding New Request */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Test Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Patient Name"
            fullWidth
            name="patientName"
            value={newRequest.patientName}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          />
          {/* Simple Date Picker for Date of Birth */}
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            name="dob"
            value={newRequest.dob}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Doctor"
            fullWidth
            name="doctor"
            value={newRequest.doctor}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Test Type"
            fullWidth
            name="testType"
            value={newRequest.testType}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="CI Date"
            fullWidth
            name="ciDate"
            value={newRequest.ciDate}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Due Date"
            fullWidth
            name="dueDate"
            value={newRequest.dueDate}
            onChange={handleInputChange}
            sx={{ marginBottom: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddRequest} color="primary">Add Request</Button>
        </DialogActions>
      </Dialog>

      {/* Table with Filtered Requests */}
      <TableContainer component={Paper} sx={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }} className="shadow-lg">
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell className="font-bold text-blue-800">Patient Name</TableCell>
              <TableCell className="font-bold text-blue-800">Date of Birth</TableCell>
              <TableCell className="font-bold text-blue-800">Doctor</TableCell>
              <TableCell className="font-bold text-blue-800">Test Type</TableCell>
              <TableCell className="font-bold text-blue-800">Priority</TableCell>
              <TableCell className="font-bold text-blue-800">CI Date</TableCell>
              <TableCell className="font-bold text-blue-800">Status</TableCell>
              <TableCell className="font-bold text-blue-800">Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={index} hover className="transition-all">
                <TableCell>{request.patientName}</TableCell>
                <TableCell>{request.dob}</TableCell>
                <TableCell>{request.doctor}</TableCell>
                <TableCell>{request.testType}</TableCell>
                <TableCell>
                  <Badge
                    badgeContent={request.priority}
                    color={request.priority === 'Urgent' ? 'error' : 'default'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>{request.ciDate}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        request.status === 'Completed'
                          ? '#2e7d32'
                          : request.status === 'In-Progress'
                          ? '#ffb300'
                          : '#d32f2f',
                    }}
                  >
                    {request.status}
                  </Typography>
                </TableCell>
                <TableCell>{request.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
}

export default TestRequestsPage;
