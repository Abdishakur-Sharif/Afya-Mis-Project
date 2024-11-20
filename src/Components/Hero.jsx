import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import hospital from '../assets/Images/hospital.mp4';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  // Text content for the heading
  const text = "Afya: Modern Hospital Management";
  const characters = text.split("");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        py: { xs: 12, md: 16 }, // Extra padding to separate from header
        overflow: 'hidden',
        marginBottom: 18, // Space for preventing overlap with the next section
      }}
    >
      
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src={hospital} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark gradient overlay for improved readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)', // Dark overlay for blending
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.8))',
          zIndex: -1,
        }}
      />

      <Container>
        {/* Typing Animation for Main Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: '500',
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: "'Roboto', sans-serif",
            color: '#e3f2fd', // Softer light blue color for contrast
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Enhanced shadow for depth
          }}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: index * 0.1,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </Typography>

        {/* Subheading with adjusted styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '300',
              fontSize: { xs: '0.8rem', md: '1rem' },
              color: '#cfd8dc', // Softer color for subheading
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            Efficiently manage appointments, patient records, and healthcare services in one platform.
          </Typography>
        </motion.div>

        {/* Button with scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
<Button
  variant="contained"
  size="large"
  onClick={() => navigate('/login')}
  sx={{
    background: 'linear-gradient(90deg, #1565c0, #1e88e5)', // Gradient background
    color: 'white',
    px: 5,
    py: 1.5,
    textTransform: 'none',
    fontWeight: '500',
    borderRadius: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Soft shadow for depth
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #1e88e5, #42a5f5)', // Lighter gradient on hover
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)', // Enhanced shadow on hover
      transform: 'scale(1.05)', // Slight scaling on hover for interaction
    },
  }}
>
  Get Started
</Button>

        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
