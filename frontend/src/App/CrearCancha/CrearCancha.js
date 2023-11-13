import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';


function CrearCancha() {
  const Navigate = useNavigate('');
  const [deporte, setDeporte] = useState("");
  const [enReparacion, setEnReparacion] = useState();
  const [nombre, setNombre] = useState("");
  const [foto, setfoto] = useState("");
  const [cantPersonas, setCantPersonas] = useState("");
  const [fkLugar, setFkLugar] = useState(0);
  const [precio, setPrecio] = useState({ estado: "", another: "another" });;
  const [pisoSeleccionado, setPisoSeleccionado] = useState('');
  const [formValido, setFormValido] = useState(false);

  const {state} = useLocation();

  //let item;
  //let i;
  //const { opcion } = item;
  //const { estado } = i

  useEffect(() => {
    console.log("KAKAKA", state);
    setFkLugar(state[0].Id);
  }, []);

  useEffect(() => {
    console.log(fkLugar);
  }, [fkLugar])

  const handlePisoSelect = (Piso) => {
    setPisoSeleccionado(Piso);
  }

  /*const handleChange = e => {
    e.persist();
    console.log(e.target.value);
    setTipoPiso(prevState => ({
      ...prevState,
      opcion: e.target.value
    }));
  };*/

  const handleChangeToF = e => {
    e.persist();
    console.log(e.target.value);
    setEnReparacion(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let cancha = {
      Nombre: nombre,
      Foto: foto,
      Deporte: deporte,
      EnReparacion: enReparacion,
      CantPersonas: cantPersonas,
      TipoPiso: pisoSeleccionado,
      Precio: precio,
      fkLugar: fkLugar,
    }

    console.log("Crear cancha", cancha);

    axios.post('http://localhost:5001/cancha/post', cancha)
      .then(res => {
        setFkLugar(res.data.fkLugar)
        console.log(res.data)
        axios.get("http://localhost:5001/canchaId/"+ res.data.fkLugar)
        Navigate('/Lugar' )
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
  };
  useEffect(() => {
    setFormValido(nombre.length > 0 && foto.length > 0 && deporte.length > 0 && enReparacion && cantPersonas.length > 0 && pisoSeleccionado.length > 0 && precio > 0);
  }, [nombre, foto, deporte, enReparacion, cantPersonas, pisoSeleccionado, precio]);

  document.body.classList = ["CrearCancha"];
  return (
    <div
      className='Register'>
      <div className="d-grid gap-2 ">
        <h1 className="tituloReg">Crea una cancha para "nombre del lugar" {enReparacion}</h1>
      </div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              autoFocus
              type="text"
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
              value={true}
              aria-label="radio 1"
              label="Si"
              name="disponible"
              onChange={handleChangeToF}
            />
            <Form.Check
              inline
              type="radio"
              aria-label="radio 1"
              value={false}
              label="No"
              name="disponible"
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

          <Button size="lg" type="submit" className='botonGen' disabled={!formValido}>
            Crear cancha
          </Button>

        </Form>
      </Container>
    </div>
  );
}

export default CrearCancha;