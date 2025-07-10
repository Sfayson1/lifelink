// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// For Render deployment, use root path
const basename = '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
