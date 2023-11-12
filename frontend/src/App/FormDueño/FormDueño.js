import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from 'react';
import usuarioContext from '../../Context/context';
import { useContext } from 'react';

function formDueño() {

  const Navigate = useNavigate('');
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState("");
  const [zona, setZona] = useState("");
  const [nombre,setNombre] = useState("");
  const [fotos,setFotos] = useState("");
  const [idDueño,setFkDueño] = useState();
  const context = useContext(usuarioContext);
  const handleSubmit = (event) => {
    console.log(context.usuario)
    setFkDueño(context.usuario.Id)
    event.preventDefault();
    let lugar = {
      nombre : nombre,
      ubicacion: ubicacion,
      zona: zona,
      fotos: fotos,
      fkDueño : context.usuario.Id
  }
    console.log(lugar)
    axios.post('http://localhost:5001/lugar/post', lugar)
      .then(res => {
        axios.put(`http://localhost:5001/usuarioUpdateRol/${context.usuario.Id}`, context.usuario)
        .then(res => {
          Navigate('/')
        })
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
  };

  function validateForm() {
    return nombre.length > 0 && ubicacion.length > 0 && zona.length > 0 && fotos.length > 0 ;
  }

  document.body.classList = ["FormDueño"];
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
        <Form.Group size="lg" controlId="ubicacion">
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="zona">
          <Form.Label>Zona</Form.Label>
          <Form.Control
            type="text"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="fotos">
          <Form.Label>Fotos</Form.Label>
          <Form.Control
            type="file"
            value={fotos}
            onChange={(e) => setFotos(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" type="submit" className='botonGen' disabled={!validateForm()}>
          Enviar Formulario ⚽
        </Button>
        
      </Form>
    </div>
  );
}

export default formDueño;