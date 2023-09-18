import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';


function CrearCancha() {

  const Navigate = useNavigate('');
  const navigate = useNavigate();
  const [deporte, setDeporte] = useState("");
  const [enReparacion, setEnReparacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [foto, setfoto] = useState("");
  const [cantPersonas, setCantPersonas] = useState("");
  const [fkLugar, setFkLugar] = useState(2);
  const [tipoPiso, setTipoPiso] = useState({ opcion: "", another: "another" });
  const [precio, setPrecio] = useState({ estado: "", another: "another" });
  const [opcion, setOpcion] = useState('');
  const [estado, setEstado] = useState(true);
  const [pisoSeleccionado, setPisoSeleccionado] = useState('');

  //let item;
  //let i;
  //const { opcion } = item;
  //const { estado } = i

  const handlePisoSelect = (Piso) => {
    setPisoSeleccionado(Piso);
  }

  const handleChange = e => {
    e.persist();
    console.log(e.target.value);
    setTipoPiso(prevState => ({
      ...prevState,
      opcion: e.target.value
    }));
  };

  const handleChangeToF = e => {
    e.persist();
    console.log(e.target.value);
    setEnReparacion(prevState => ({
      ...prevState,
      estado: e.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let cancha = {
      nombre: nombre,
      foto: foto,
      deporte: deporte,
      enReparacion: enReparacion,
      cantPersonas: cantPersonas,
      tipoPiso: tipoPiso,
      precio: precio,
      fkLugar: fkLugar,

    }
    axios.post('http://localhost:5001/cancha/post', cancha)
      .then(res => {
        Navigate('/cancha')
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
  };

  function validateForm() {
    return nombre.length > 0 && foto.length > 0 && deporte.length > 0 && enReparacion.length > 0 && cantPersonas.length > 0 && tipoPiso.length > 0 && precio >0;
  }

  document.body.classList = ["CrearCancha"];
  return (
    <div
      className='Register'>
      <div className="d-grid gap-2 ">
        <h1 class="tituloReg">Crea una cancha para "nombre del lugar"</h1>
      </div>
      <Container>
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
          <Form.Group size="lg" controlId="deporte">
            <Form.Label>deporte</Form.Label>
            <Form.Control
              type="text"
              value={deporte}
              onChange={(e) => setDeporte(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="enReparacion">
            <Form.Label>Disponible?</Form.Label>
            <Form.Check
              inline
              type="radio"
              aria-label="radio 1"
              label="Si"
              name="disponible"
              onChange={ handleChangeToF}
            />
            <Form.Check
              inline
              type="radio"
              aria-label="radio 1"
              name="disponible"
              label="No"
              onChange={handleChangeToF}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="foto">
            <Form.Label>foto</Form.Label>
            <Form.Control
              type="file"
              value={foto}
              onChange={(e) => setfoto(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="cantPersonas">
            <Form.Label>cantidad de personas</Form.Label>
            <Form.Control
              type="number"
              value={cantPersonas}
              onChange={(e) => setCantPersonas(e.target.value)}
            />
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                Tipo de Piso: {pisoSeleccionado}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handlePisoSelect('Cemento')}>Cemento</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePisoSelect('Cintetico')}>Cintetico</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePisoSelect('Pasto')}>Pasto</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePisoSelect('Caucho')}>Caucho</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Form.Group>
          <Form.Group size="lg" controlId="precio">
            <Form.Label>Precio por turno</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>
          <Button size="lg" type="submit" className='botonGen' disabled={!validateForm()}>
            Crear cancha
          </Button>

        </Form>
      </Container>
    </div>
  );
}

export default CrearCancha;