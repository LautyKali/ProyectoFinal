import './App.css';
import axios, {isCancel, AxiosError} from 'axios';
import { useState } from 'react';
import Login from './Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register';
import React, { Component }  from 'react';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




