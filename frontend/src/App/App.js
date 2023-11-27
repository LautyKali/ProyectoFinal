import './App.css';
import axios, { isCancel, AxiosError } from 'axios';
import { useState, useEffect, useContext } from "react";
import Home from './Home/Home';
import Login from './Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register/Register';
import React, { Component } from 'react';
import Lugar from './Lugar/Lugar';
import Canchas from './Canchas/Canchas'
import FormDueño from './FormDueño/FormDueño'
import CrearCancha from './CrearCancha/CrearCancha'
import usuarioContext from '../Context/context';
import horarioContext from '../Context/hcontext';
import NotFound from './NotFound/NotFound';


const App = () => {

  const [usuario, setUsuarioContext] = useState({});
  const [horario, setHorarioContext] = useState({});
  let varTemp;

  useEffect(() => {
    localStorage.getItem("usuario") !== null ? setUsuarioContext(JSON.parse(localStorage.getItem("usuario"))) : varTemp =0
  }, [])

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(usuario))
  }, [usuario])

  return (
    <usuarioContext.Provider value={{ usuario, setUsuarioContext }}>
      <horarioContext.Provider value={{ horario, setHorarioContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Register" element={<Register  />} />
            <Route path="/Login" element={<Login  />} />
            <Route path="/FormDueño" element={<FormDueño usuario = {usuario} />} /> 
            <Route path="/CrearCancha" element={<CrearCancha usuario = {usuario} />} />
            <Route path="/Lugar" element={<Lugar usuario = {usuario} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Canchas/:id" element={<Canchas usuario = {usuario} />} />
            <Route path="/verReservas/:id" element={<verReservas usuario = {usuario} />} />
          </Routes>
        </BrowserRouter>
      </horarioContext.Provider>
    </usuarioContext.Provider>
  );
}

export default App;




