import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const Hero = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: 8,
        pb: 6,
        backgroundColor: blue[500], // Keep the background color (no image)
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Optional overlay to darken or give more contrast to the background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Optional overlay (light black) for better text visibility
          zIndex: -1, // Ensures overlay is behind the text
        }}
      />

      <Container>
        {/* Main Heading: Animated with scale-up and fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }} // Start smaller and below
          animate={{ opacity: 1, scale: 1, y: 0 }} // End at normal size and position
          transition={{
            duration: 1.2,              // Duration for the animation
            ease: [0.68, -0.55, 0.27, 1.55],  // Ease for a smooth, elastic-like feel
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontFamily: "'Roboto', sans-serif", // Modern font-family
              color: 'white',  // Ensure text is white on blue background
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)', // Text shadow for contrast
            }}
          >
            Afya is a modern solution for comprenhensive hospital management
          </Typography>
        </motion.div>

        {/* Subheading: Animated with a slight delay and fade-in effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,        // Duration for the animation
            delay: 0.5,           // Delay to create a staggered effect
            ease: [0.68, -0.55, 0.27, 1.55], // Ease for a smooth transition
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: 'white',  // White text color to maintain visibility
              fontFamily: "'Roboto', sans-serif", // Consistent font
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)', // Slight shadow for text visibility
            }}
          >
            Manage appointments, patient records, and healthcare services efficiently.
          </Typography>
        </motion.div>

        {/* Button: Fade-in with scale effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,              // Delay to make it appear after the subheading
            ease: [0.68, -0.55, 0.27, 1.55], // Smooth and elastic easing
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #4caf50)', // Gradient button for visual appeal
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #388e3c)', // Slightly darker on hover
              },
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              borderRadius: 3,
              textTransform: 'none',
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
