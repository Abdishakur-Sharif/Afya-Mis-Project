import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/authcontext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** You can customize your theme here */
            colorScheme: 'light', // or 'dark'
          }}
        >
          <App />
        </MantineProvider>
      </Router>
    </AuthProvider>
  </StrictMode>
);
