import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import CardDetails from './components/CardDetails';
import MyCards from './components/MyCards';

function App() {
  return <Routes>
    <Route path="/" element={<Navigate to="/main" replace />} />
    <Route path="/main" element={< Homepage/>} />
    <Route path="/card/:cardId" element={<CardDetails />} />
    <Route path="/mycards" element={<MyCards />} />
    <Route path="*" element={<Navigate to="/main" replace />} />
  </Routes>
}

export default App;
