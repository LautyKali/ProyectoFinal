import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from 'react';

function formDueño() {

  const Navigate = useNavigate('');
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState("");
  const [zona, setZona] = useState("");
  const [nombre,setNombre] = useState("");
  const [fotos,setFotos] = useState("");
  const [fkDueño,setFkDueño] = useState(3);
    const navigateToLogin = () => { 
        navigate('/Home');
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    let lugar = {
      nombre : nombre,
      ubicacion: ubicacion,
      zona: mail,
      fotos: fotos,
      fkDueño : fkDueño
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
    <div 
    className='Register'>
      <div className="d-grid gap-2 ">
          <h1 class= "tituloReg">Unete a nuestro software de canchas!</h1>
        </div>
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
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control
            type="password"
            value={ubicacion}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Zona</Form.Label>
          <Form.Control
            type="email"
            value={zona}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="telefono">
          <Form.Label>Fotos</Form.Label>
          <Form.Control
            type="file"
            value={fotos}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" type="submit" className='botonGen' disabled={!validateForm()}>
          Enviar Formulario ⚽
        </Button>
        <Button onClick={navigateToLogin} className="block">Volver</Button>
        
      </Form>
    </div>
  );
}

export default formDueño;