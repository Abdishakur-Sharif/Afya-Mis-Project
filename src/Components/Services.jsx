import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import EmergencyIcon from '@mui/icons-material/MedicalServices';
import CareIcon from '@mui/icons-material/HealthAndSafety';
import CheckupIcon from '@mui/icons-material/MonitorHeart';
import SurgeryIcon from '@mui/icons-material/LocalHospital';

function Services() {
  const services = [
    { title: '24/7 Emergency', description: 'Always available to attend to your medical emergencies.', icon: <EmergencyIcon sx={{ fontSize: 50, color: '#1976d2' }} /> },
    { title: 'Specialized Care', description: 'Experienced specialists available for your health needs.', icon: <CareIcon sx={{ fontSize: 50, color: '#1976d2' }} /> },
    { title: 'General Checkup', description: 'Routine health checkups to monitor your well-being.', icon: <CheckupIcon sx={{ fontSize: 50, color: '#1976d2' }} /> },
    { title: 'Surgery', description: 'Advanced surgical facilities with skilled surgeons.', icon: <SurgeryIcon sx={{ fontSize: 50, color: '#1976d2' }} /> },
  ];

  return (
    <Box sx={{ position: 'relative', padding: '60px 0', overflow: 'hidden' }}>
      {/* Background Image from External URL */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg)',  // External image URL
          backgroundSize: 'cover',                    
          backgroundPosition: 'center',               
          zIndex: -1,                                 
          filter: 'blur(6px)',                         
        }}
      />

      {/* Overlay for contrast */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent overlay
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '30px',
          color: 'white',
          zIndex: 1,
          position: 'relative',
          fontWeight: 'bold',
          fontSize: '2.5rem',  // Increase font size for emphasis
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Text shadow for contrast
        }}
      >
        Our Services
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                padding: 3,
                transition: 'transform 0.3s, box-shadow 0.3s', // Smooth scaling & shadow transition
                '&:hover': {
                  transform: 'scale(1.05)', // Subtle zoom-in effect on hover
                  boxShadow: 6, // Increase box shadow on hover for emphasis
                },
                zIndex: 1,
                position: 'relative',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight white background for cards
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  {service.icon} {/* Display the icon */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#1976d2',
                    marginBottom: 1,
                    fontSize: '1.2rem',
                    textTransform: 'uppercase', // Make titles more prominent with uppercase
                    letterSpacing: '1px',
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#555',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Services;
