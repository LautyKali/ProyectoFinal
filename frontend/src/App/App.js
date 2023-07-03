import './App.css';
import axios, {isCancel, AxiosError} from 'axios';
import { useState } from 'react';
import Home from './Home/Home';
import Login from './Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register';
import React, { Component }  from 'react';
import Lugar from './Lugar/Lugar';
import Canchas from './Canchas/Canchas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Lugar" element={<Lugar/>} />
        <Route path="/Canchas" element={<Canchas/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;




