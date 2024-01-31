// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import Nav from './navbars/Mainnavbar.jsx'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import UpdateUser from './updateUser';


// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
console.log('API_HOST: ', import.meta.env.VITE_API_HOST)
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}
const Home = () => (
  <div>
    <h1>Welcome to the Home Page!</h1>
  </div>
);

function App() {
  const baseUrl = API_HOST;
  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl}>
      <Nav />
      <div className="my-5 container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Update" element={<UpdateUser />} />
        </Routes>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
