// client/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.tsx';

// Find the root element in your HTML (ensure this element exists in your public/index.html)
const container = document.getElementById('root') as HTMLElement;

// Create a root.
const root = ReactDOM.createRoot(container);

// Render your app.
root.render(
  <React.StrictMode>
    <App   />
  </React.StrictMode>
);
