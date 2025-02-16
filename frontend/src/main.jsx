import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import HomePage from './pages/homePage';
//import LoginPage from './pages/loginPage';
//import RegisterPage from './pages/registerPage';

createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
)
