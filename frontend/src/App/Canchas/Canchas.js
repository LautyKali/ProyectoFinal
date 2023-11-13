import { useState, useEffect, useContext } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import "./Canchas.css";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { useFetcher, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Modal } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import usuarioContext from "../../Context/context";


function Canchas() {
    const context = useContext(usuarioContext)
    const [cancha, setCancha] = useState("");
    const { id } = useParams();
    const [pisoSeleccionado, setPisoSeleccionado] = useState('');
    const [datos, setDatos] = useState([])
    const [canchaIdEditar, setCanchaIdEditar] = useState("");
    const [showModal, setShowModal] = useState(false);
    const Navigate = useNavigate('');
    useEffect(() => {
        console.log("LMAO", id);
        axios.get("http://localhost:5001/cancha/" + id)
            .then(res => {
                console.log("AXIOSRES asdasd", res)
                setCancha(res.data);
            })
    }, [showModal])

    const onChangeF = (e) => {
        setDatos({...datos,[e.target.name]:e.target.value})
    }
    const handleModalOpen = (e) => {
        console.log("MODALOPEN", e);
        console.log("data id",e.Id)
        setCanchaIdEditar(e.Id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    
  const handlePisoSelect = (Piso) => {
    setPisoSeleccionado(Piso);
    setDatos({...datos,["TipoPiso"]:Piso})
  }

    async function submitEdit(e) {
        e.preventDefault();
       const response =  await axios.put(`http://localhost:5001/cancha/put/${canchaIdEditar}`, datos)
        .then(response => {
            setDatos(datos)
        })
        .catch(error => {
            console.log("error",e);
        });
        handleModalClose()
        };
    


    const handleChangeToF = e => {
    e.persist();
    onChangeF(e);
  };

  const navigateToHome = () => { 
    Navigate('/');
}

async function submitEditReserva(e) {
    e.preventDefault();
    };

    if (cancha.length === 0) return (<div></div>);
    
    console.log("PEPE", datos);

    document.body.classList = ["Canchas"];

    return context.usuario.fkRol !== 3 ? (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Nombre de tu App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link > Inicio </Nav.Link>
                    <Nav.Link href="#link">Otra página</Nav.Link>
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse>
            </Navbar>

            <Container>
                <Row>
                    {
                        cancha.map((element) =>
                        (

                            <Col sm={4}>
                                <Card>
                                    <Card.Header><img className="card-img-top" src={element.Foto} alt="Card image cap"></img></Card.Header>
                                    <Card.Body>
                                        <Card.Title><h1>{element.Nombre} </h1><br /></Card.Title>
                                        <Card.Text>
                                            <div>Deporte: {element.Deporte}<br /></div>
                                            <div>Cantidad de personas: {element.CantPersonas}</div><br /><br />
                                            <div>Tipo de cancha : {element.TipoPiso} </div><br /><br />
                                            <div>Precio: {element.Precio}</div>
                                            <div>Disponibilidad: {element.EnReparacion ? "No dispobible" : "Disponible"}</div>

                                        </Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => handleModalOpen(element)} className="block">Editar</Button>
                                </Card>
                            </Col>
                        )
                        )
                    }
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalText">Editar informacion </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ESTAMOS EDITANDO LA CANCHA {canchaIdEditar}
                    <Form onSubmit={submitEdit}>
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
                            <Form.Label>Disponible?</Form.Label>
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
                            <Form.Label>cantidad de personas</Form.Label>
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
                                name="Precio"
                                value={datos.Precio}
                                onChange={(e) => onChangeF(e)}
                            />
                        </Form.Group>
                        <Button onClick={submitEdit} size="lg" type="submit" className='botonGen'>
            Guardar
          </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    ):
    (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Nombre de tu App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link > Inicio </Nav.Link>
                    <Nav.Link href="#link">Otra página</Nav.Link>
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse>
            </Navbar>

            <Container>
                <Row>
                    {
                        cancha.map((element) =>
                        (

                            <Col sm={4}>
                                <Card>
                                    <Card.Header><img className="card-img-top" src={element.Foto} alt="Card image cap"></img></Card.Header>
                                    <Card.Body>
                                        <Card.Title><h1>{element.Nombre} </h1><br /></Card.Title>
                                        <Card.Text>
                                            <div>Deporte: {element.Deporte}<br /></div>
                                            <div>Cantidad de personas: {element.CantPersonas}</div><br /><br />
                                            <div>Tipo de cancha : {element.TipoPiso} </div><br /><br />
                                            <div>Precio: {element.Precio}</div>
                                            <div>Disponibilidad: {element.EnReparacion ? "No dispobible" : "Disponible"}</div>

                                        </Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => submitEditReserva} className="block">Reservar</Button>
                                </Card>
                            </Col>
                        )
                        )
                    }
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalText">Reservar cancha </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ESTAMOS RESERVANDO LA CANCHA {canchaIdEditar}
                    <Form onSubmit={submitEditReserva}>
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
                            <Form.Label>Disponible?</Form.Label>
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
                            <Form.Label>cantidad de personas</Form.Label>
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
                                name="Precio"
                                value={datos.Precio}
                                onChange={(e) => onChangeF(e)}
                            />
                        </Form.Group>
                        <Button onClick={submitEditReserva} size="lg" type="submit" className='botonGen'>
            Guardar
          </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}





export default Canchas;