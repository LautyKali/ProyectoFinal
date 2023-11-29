import { useState, useEffect, useContext } from "react";
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Canchas.css";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import usuarioContext from "../../Context/context";
import horarioContext from "../../Context/hcontext";
import LogoCancheros from '../../Logo.png'
import { Link , Outlet} from 'react-router-dom';

function Canchas() {
  const context = useContext(usuarioContext);
  const hcontext = useContext(horarioContext);
  const [cancha, setCancha] = useState("");
  const { id } = useParams();
  const [pisoSeleccionado, setPisoSeleccionado] = useState("");
  const [TipoTarjeta, setTipoTarjeta] = useState("");
  const [datos, setDatos] = useState([]);
  const [canchaIdEditar, setCanchaIdEditar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate("");
  const [horariosNoDisponibles, setHorariosNoDisponibles] = useState([])

  useEffect(() => {
    console.log("LMAO", id);
    console.log("contextUsuario",context.usuario)
    axios.get("http://localhost:5001/cancha/" + id).then((res) => {
      console.log("AXIOSRES asdasd", res);
      setCancha(res.data);

    });
  }, [showModal]);

  const onChangeF = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };


  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  
  }
  const randomNumber = generateRandomNumber(1, 1000000);

  const deleteCancha =(e)=>{
    e.preventDefault()
    axios.delete(`http://localhost:5001/cancha/delete/${id}`)
    .then(response => {
      console.log(`Cancha borrada con ID ${canchaIdEditar}`);
      Navigate("/Lugar")
    })
    .catch(error => {
      console.error(error);
    });
  }





  const onChangeFecha =(e) =>{
    setDatos({ ...datos, [e.target.name]: e.target.value });
    console.log("target value:", e.target.value)
    axios.post("http://localhost:5001/cancha/disponibilidad/" + canchaIdEditar, {fecha: e.target.value})
    .then((res) => {
     setHorariosNoDisponibles(res.data)
     console.log("No disponibles:", res.data)
     console.log("hcontext.horario", hcontext.horario);
     console.log("horariosNoDisponibles", horariosNoDisponibles);
    }
  )}
  const handleModalOpen = (e) => {
    console.log("MODALOPEN", e);
    console.log("data id", e.Id);
    setCanchaIdEditar(e.Id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const handlePisoSelect = (Piso) => {
    setPisoSeleccionado(Piso);
    setDatos({ ...datos, ["TipoPiso"]: Piso });
  };
  const handleTipoTarjetaSelect = (TipoTarjeta) => {
    setTipoTarjeta(TipoTarjeta);
    setDatos({ ...datos, ["TipoTarjeta"]: TipoTarjeta });
  };


  async function submitEdit(e) {
    e.preventDefault();
    const response = await axios
      .put(`http://localhost:5001/cancha/put/${canchaIdEditar}`, datos)
      .then((response) => {
        setDatos(datos);
      })
      .catch((error) => {
        console.log("error", e);
      });
    handleModalClose();
  }

  const handleChangeToF = (e) => {
    e.persist();
    onChangeF(e);
  };

  const navigateToHome = () => {
    Navigate("/");
  };

  async function submitEditReserva(e) {
    const canchaReservar = cancha.find((e) => e.Id === canchaIdEditar)
    if(typeof e === "undefined")return
    console.log("e",e)
    e.preventDefault();
    let newDatos = {
      NumeroReserva: randomNumber,
      PrecioSeña:canchaReservar.Precio/2 ,
      Fecha: datos.Fecha,
      NumeroTarjeta: datos.NumeroTarjeta,
      TipoTarjeta: datos.TipoTarjeta,
      fkUsuario: context.usuario.Id,
      fkCancha: canchaIdEditar,
      fkHorario: parseInt(datos.Hora) 
    }
    console.log("datosNuevos",newDatos)
    const response = await axios
      .post(`http://localhost:5001/cancha/reservar/${canchaIdEditar}`, newDatos)
      .then((response) => {
        setDatos(newDatos);
        axios.post("http://localhost:5001/cancha/disponibilidad/" + canchaIdEditar, {fecha: datos.Fecha})
    .then((res) => {
     setHorariosNoDisponibles(res.data)
    })
      })
      .catch((error) => {
        console.log("error", e);
      });
    handleModalClose();
  }

  const deleteCancha =(e)=>{
    e.preventDefault()
    axios.delete(`http://localhost:5001/cancha/delete/${canchaIdEditar}`)
    .then(response => {
      console.log(`Cancha borrada con ID ${canchaIdEditar}`);
      Navigate("/Lugar")
    })
    .catch(error => {
      console.error(error);
    });
  }




  if (cancha.length === 0) return <div></div>;

  document.body.classList = ["Canchas"];

  return context.usuario.fkRol === 2 ? (
    <div className="Fondo">
       <Row style={{width:'auto'}}>
            <Navbar className='navBar' style={{paddingLeft:'2%',paddingRight:'2%'}}>
                <Navbar.Brand><Link to='/'>
                    <img src={LogoCancheros} width="auto" height="80vh" className="align-top"></img>
                    </Link></Navbar.Brand>
                <Nav>
                    <Nav.Link onClick={() => Navigate(-1 )}>Volver a lugar</Nav.Link> 
                </Nav>
                <Nav className="me-auto">
                <Navbar.Brand className="logOut" onClick={()=>navigateToHome()}>Salir</Navbar.Brand>
                </Nav>
            </Navbar>
            <Outlet/>
        </Row>

      <Container>
        <Row>
          {cancha.map((element) => (
            <Col sm={4}>
              <Card>
                <Card.Header>
                  <img
                    className="card-img-top"
                    src={element.Foto}
                    alt="Card image cap"
                  ></img>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h1>{element.Nombre} </h1>
                    <br />
                  </Card.Title>
                  <Card.Text>
                    <div>
                      Deporte: {element.Deporte}
                      <br />
                    </div>
                    <div>Cantidad de personas: {element.CantPersonas}</div>
                    <br />
                    <br />
                    <div>Tipo de cancha : {element.TipoPiso} </div>
                    <br />
                    <br />
                    <div>Precio: {element.Precio}</div>
                    <div>
                      Disponibilidad:{" "}
                      {element.EnReparacion ? "No dispobible" : "Disponible"}
                    </div>
                  </Card.Text>
                </Card.Body>
                <Button
                  onClick={() => handleModalOpen(element)}
                  className="block"
                >
                  Editar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Editar informacion </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ESTAMOS EDITANDO LA CANCHA
          <Form onSubmit={(e)=>submitEdit(e)}>
            <Form.Group size="lg" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                autoFocus
                name="Nombre"
                value={datos.Nombre}
                type="text"
                onChange={(e) => onChangeF(e)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="deporte">
              <Form.Label>Deporte</Form.Label>
              <Form.Control
                type="text"
                name="Deporte"
                value={datos.Deporte}
                onChange={(e) => onChangeF(e)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="enReparacion">
              <Form.Label>Disponibilidad</Form.Label>
              <Form.Check
                inline
                type="radio"
                value={true}
                aria-label="radio 1"
                label="Si"
                name="EnReparacion"
                onChange={(e) => handleChangeToF(e)}
              />
              <Form.Check
                inline
                type="radio"
                aria-label="radio 1"
                value={false}
                name="EnReparacion"
                label="No"
                onChange={(e) => handleChangeToF(e)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="foto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                name="Foto"
                value={datos.Foto}
                onChange={(e) => onChangeF(e)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="cantPersonas">
              <Form.Label>Cantidad de personas</Form.Label>
              <Form.Control
                type="number"
                name="CantPersonas"
                value={datos.CantPersonas}
                onChange={(e) => onChangeF(e)}
              />
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                  Tipo de Piso: {pisoSeleccionado}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handlePisoSelect("Cemento")}>
                    Cemento
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePisoSelect("Cintetico")}>
                    Cintetico
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePisoSelect("Pasto")}>
                    Pasto
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handlePisoSelect("Caucho")}>
                    Caucho
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group size="lg" controlId="precio">
              <Form.Label>Precio por turno</Form.Label>
              <Form.Control
                type="number"
                name="Precio"
                value={datos.Precio}
                onChange={(e) => onChangeF(e)}
              />
            </Form.Group>
            <Button
              onClick={()=>submitEdit()}
              size="lg"
              type="submit"
              className="botonGen"
            >
              Guardar
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  ) : (
    <div className="Fondo">
      <Row style={{width:'auto'}}>
            <Navbar className='navBar' style={{paddingLeft:'2%',paddingRight:'2%'}}>
                <Navbar.Brand><Link to='/'>
                    <img src={LogoCancheros} width="auto" height="80vh" className="align-top"></img>
                    </Link></Navbar.Brand>
                <Nav>
                     <Nav.Link onClick={() => Navigate("/FormDueño")}>Ser Canchero</Nav.Link> 
                </Nav>
                <Nav className="me-auto">
                <Navbar.Brand className="logOut" onClick={()=>navigateToHome()}>Salir</Navbar.Brand>
                </Nav>
            </Navbar>
            <Outlet/>
        </Row>
    

      <Container>
        <Row >
          {cancha.map((element) => (
            <Col sm={4} style={{marginTop:"2%"}}>
              <Card className="cardCancha">
                <Card.Header>
                  <img
                    className="card-img-top"
                    src={element.Foto}
                    alt="Card image cap"
                  ></img>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <h1>{element.Nombre} </h1>
                    <br />
                  </Card.Title>
                  <Card.Text>
                    <div>
                      Deporte: {element.Deporte}
                      <br />
                    </div>
                    <div>Cantidad de personas: {element.CantPersonas}</div>
                    <br />
                    <br />
                    <div>Tipo de cancha : {element.TipoPiso} </div>
                    <br />
                    <br />
                    <div>Precio: {element.Precio}</div>
                    <div>
                      Disponibilidad:{" "}
                      {element.EnReparacion ? "No dispobible" : "Disponible"}
                    </div>
                  </Card.Text>
                </Card.Body>
                <Button onClick={() => handleModalOpen(element)} className="block">
                  Reservar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Reservar cancha </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ESTAMOS RESERVANDO LA CANCHA
          <Form onSubmit={(e)=>submitEditReserva(e)}>
            {console.log("mail context",context.usuario.Mail)}
            <Form.Group size="lg" controlId="mailReserva">
              <Form.Label>Mail</Form.Label>
              <Form.Control
                autoFocus
                name="mailReserva"
                value={context.usuario.Mail}
                type="text"
                placeholder={context.usuario.Mail}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="NumeroTarjeta">
              <Form.Label>Numero de Tarjeta</Form.Label>
              <Form.Control
                type="number"
                name="NumeroTarjeta"
                value={datos.NumeroTarjeta}
                onChange={(e) => onChangeF(e)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="TipoTarjeta">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                  Tipo de tarjeta: {TipoTarjeta}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleTipoTarjetaSelect("Credito")}
                  >
                    Credito
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleTipoTarjetaSelect("Debito")}
                  >
                    Debito
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group size="lg" controlId="Fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="Fecha"
                value={datos.fecha}
                onChange={(e) => onChangeFecha(e)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="Hora">
              <Form.Label>Horario</Form.Label>
              <Form.Select
                type="time"
                name="Hora" 
                value={datos.hora}
                onChange={(e) => onChangeF(e)}
              >
                {hcontext.horario.map(horario=>
                 horariosNoDisponibles.some(element=> element.fkHorario === horario.Id) ? (
                    <option className="noDisponibles"
                  disabled 
                  value={horario.Id}
                  >
                  {horario.Hora}
                  </option>
                  ): (
                    <option 
                    disabled
                    value={horario.Id}
                    >
                    {horario.Hora}
                    </option>
                ))}
                </Form.Select>
            </Form.Group>
            <Button
              onClick={()=>submitEditReserva()}
              size="lg"
              type="submit"
              className="botonGen"
            >
              Reservar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Canchas;
