import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from 'react';

function Registrarse() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre,setNombre] = useState("");
  const [telefono,setTelefono] = useState("");
  const Navigate = useNavigate('');
  const navigate = useNavigate();
    const navigateToLogin = () => { 
        navigate('/Login');
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    let usuario = {
      nombre : nombre,
      contrasenna: password,
      mail : mail,
      telefono : telefono,

  }
    axios.post('http://localhost:5001/registro', usuario)
      .then(res => {
        Navigate('/login')
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
  };
  function validateForm() {
    return mail.length > 0 && password.length > 0;
  }

  document.body.classList = ["register"];


  return (
    <div className='Register'>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            type="email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="telefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Registrarse
        </Button>
        <Button onClick={navigateToLogin} className="btn btn-light form">Ingresar</Button>
      </Form>
    </div>
  );
}

export default Registrarse;