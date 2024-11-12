// src/Footer.jsx
import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: blue[500],
        color: 'white',
        textAlign: 'center',
        py: 4,
        mt: 'auto', 
      }}
    >
      {/* Footer Main Content */}
      <Grid container spacing={4} justifyContent="center">
        {/* Left Column: Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="#about" sx={{ color: 'white', display: 'block', mb: 1, textDecoration: 'none' }}>
              About Us
            </Link>
            <Link href="#services" sx={{ color: 'white', display: 'block', mb: 1, textDecoration: 'none' }}>
              Our Services
            </Link>
            <Link href="#contact" sx={{ color: 'white', display: 'block', mb: 1, textDecoration: 'none' }}>
              Contact Us
            </Link>
            <Link href="#privacy" sx={{ color: 'white', display: 'block', mb: 1, textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="#terms" sx={{ color: 'white', display: 'block', mb: 1, textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </Box>
        </Grid>

        {/* Right Column: Social Media Icons */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              sx={{
                color: 'white',
                '&:hover': { color: blue[200] },
                mx: 1,
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.twitter.com"
              target="_blank"
              sx={{
                color: 'white',
                '&:hover': { color: blue[200] },
                mx: 1,
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              sx={{
                color: 'white',
                '&:hover': { color: blue[200] },
                mx: 1,
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com"
              target="_blank"
              sx={{
                color: 'white',
                '&:hover': { color: blue[200] },
                mx: 1,
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom: Copyright */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Hospital Management System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
