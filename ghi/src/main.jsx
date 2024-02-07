// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import  Root  from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const domain = /https:\/\/[^/]+/;
const basename = PUBLIC_URL.replace(domain, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
