import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import React, { Component }  from 'react';

function Registrarse() {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const Navigate = useNavigate('/login');
  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(values)
    console.log(event.target)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    axios.post('http://localhost:5001/registro', values)
      .then(res => {
        Navigate('/login') 
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
    setValidated(true);
  };

  return (
    <div className='container'>
      <Form onSubmit={(e) => handleSubmit(e)} noValidate validated={validated} className='form'>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            defaultValue=""
            name="Nombre"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>telefono</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Telefono"
            defaultValue=""
            name="Telefono"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contrasenna"
            defaultValue=""
            name="Contrasenna"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="telefono"
            defaultValue=""
            name="telefono"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Mail</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Mail"
            defaultValue=""
            name="Mail"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group /*as={Col} md="4"*/ controlId="validationCustom02">
          <Form.Label>Foto</Form.Label>
          <Form.Control
            type="file"
            defaultValue=""
            name="Foto"
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Button type="submit" className='form'>Registrarse</Button>
        <Link to="login" className="btn btn-light form">Iniciar Sesion</Link>
      </Form>
    </div>
  );
}

export default Registrarse;