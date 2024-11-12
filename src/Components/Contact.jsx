// src/components/Contact.js
import React from 'react';
import { Box, Typography, Grid, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
        color: '#1976d2',
        boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.05)', // Subtle shadow for depth
      }}
    >
      {/* Contact Section Title */}
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
          <TextField
            fullWidth
            label="Name"
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
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(135deg, #42a5f5, #1976d2)', // Hover effect
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;
