import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State for form submission feedback
  const [submitStatus, setSubmitStatus] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(''); // Reset status message

    // Placeholder for actual submission logic
    console.log("Form data submitted:", formData);

    // Example submission feedback
    setSubmitStatus('Thank you! Your message has been submitted.');
    
    // Optionally clear the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Box
      id="contact"
      sx={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
        color: '#1976d2',
        boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '50px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#1976d2',
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {/* Left Column - Contact Information */}
        <Grid item xs={12} md={5}>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
              <ListItemIcon>
                <LocationOnIcon sx={{ color: '#1976d2', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText
                primary="Kimathi Street, Nairobi City, 45678"
                primaryTypographyProps={{
                  variant: 'body1',
                  color: '#333',
                  fontWeight: 'medium',
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
              <ListItemIcon>
                <PhoneIcon sx={{ color: '#1976d2', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText
                primary="+0200768578"
                primaryTypographyProps={{
                  variant: 'body1',
                  color: '#333',
                  fontWeight: 'medium',
                }}
              />
            </ListItem>
            <ListItem sx={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
              <ListItemIcon>
                <EmailIcon sx={{ color: '#1976d2', fontSize: '2rem' }} />
              </ListItemIcon>
              <ListItemText
                primary="contact@hospital.com"
                primaryTypographyProps={{
                  variant: 'body1',
                  color: '#333',
                  fontWeight: 'medium',
                }}
              />
            </ListItem>
          </List>
        </Grid>

        {/* Right Column - Contact Form */}
        <Grid item xs={12} md={5}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 3,
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: '1.4rem',
            }}
          >
            Send Us A Message
          </Typography>

          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{
                marginBottom: 3,
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                '& .MuiInputLabel-root': { fontSize: '1.1rem' },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{
                marginBottom: 3,
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                '& .MuiInputLabel-root': { fontSize: '1.1rem' },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              sx={{
                marginBottom: 3,
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                '& .MuiInputLabel-root': { fontSize: '1.1rem' },
              }}
            />
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                },
              }}
            >
              Submit
            </Button>

            {/* Submission Feedback */}
            {submitStatus && (
              <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
                {submitStatus}
              </Typography>
            )}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;
