import Button from "react-bootstrap/Button";
import "./Home.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React, { Component }  from 'react';
import LogoCancheros from '../../Logo.png'
function comenzar() {
    const navigate = useNavigate();
    const navigateToLogin = () => { 
        navigate('/Login');
    }

    document.body.classList = ["home"];

    return (
        <div className="d-grid gap-2 ">
          <img className="logoCancherosHome" src={LogoCancheros}></img>
          <h1 class= "tituloHome">CANCHEROS</h1>
          <h5>Tu cancha en segundos.</h5>
          <Button  onClick={navigateToLogin} type = "button" className="botonHome"  variant="primary" size="lg">
            Comenzar⮕
          </Button>
        </div>
    )
  }

export default comenzar;