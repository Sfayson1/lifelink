// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Handle undefined environment variables properly
const publicUrl = import.meta.env.VITE_PUBLIC_URL || '';
const domain = /https:\/\/[^/]+/;
const basename = publicUrl ? publicUrl.replace(domain, '') : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
