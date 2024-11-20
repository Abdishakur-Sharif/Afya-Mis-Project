import React from 'react';
import { Box, Typography, Grid, CardMedia, CardContent } from '@mui/material';

function About() {
  return (
    <Box
      id="about"
      sx={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f5f5, #e3f2fd)', // Softer gradient background
        color: '#1976d2',
        boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.05)', // Subtle inset shadow for depth
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '40px',
          fontWeight: 'bold',
          color: '#1976d2',
          textTransform: 'uppercase', // Make the heading more formal
          letterSpacing: '1px',
        }}
      >
        About Us
      </Typography>

      <Grid container spacing={6} justifyContent="center" alignItems="center">
        {/* Left Column (Image) */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image="https://media.istockphoto.com/id/1903423742/photo/medical-team-meeting.jpg?s=1024x1024&w=is&k=20&c=pim6BAAmdZ5wqPGJ9Rj847ce1dcaSZOcdkUlN8xjM9Y="
            alt="Medical Team"
            sx={{
              borderRadius: 3,
              boxShadow: 5,
              transition: 'transform 0.4s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)', // Smooth scaling effect on hover
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', // Add a deeper shadow on hover
              },
            }}
          />
        </Grid>

        {/* Right Column (Text Content) */}
        <Grid item xs={12} md={6}>
          <CardContent
            sx={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: 3,
              boxShadow: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                marginBottom: 3,
                fontSize: '1.8rem', // Larger subheading for emphasis
              }}
            >
              Your Health, Our Priority
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: '#333',
                fontSize: '1rem',
                fontFamily: '"Roboto", sans-serif',
              }}
            >
              Our hospital is committed to providing top-notch medical services and compassionate care. We have
              state-of-the-art facilities and a dedicated team ready to assist you with your health needs. Our mission
              is to make healthcare accessible, affordable, and patient-focused.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
