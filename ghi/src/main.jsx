// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Nav from './navbars/Mainnavbar.jsx'
import Profile from './Profile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Nav />
        <Profile />
       
    </React.StrictMode>
)
