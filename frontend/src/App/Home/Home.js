import Button from "react-bootstrap/Button";
import "./Home.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React, { Component }  from 'react';

function comenzar() {
    const navigate = useNavigate();
    const navigateToRegister = () => { 
        navigate('/Register');
    }

    document.body.classList = ["home"];

    return (
        <div className="d-grid gap-2 ">
          <h2>TU CANCHA EN SEGUNDOS</h2>
          <Button onClick={navigateToRegister} variant="primary" size="lg">
            Comenzar⮕
          </Button>
        </div>
    )
  }

export default comenzar;