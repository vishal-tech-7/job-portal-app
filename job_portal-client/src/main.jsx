import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router'; // Your routing setup
import AuthProvider from './contexts/AuthProvider'; // Import AuthProvider

// Create the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
