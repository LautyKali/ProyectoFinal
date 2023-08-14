import { useState, useEffect } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import "./Lugar.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useFetcher, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import NavLink from "react-bootstrap/esm/NavLink";
import LogoCancheros from '../../Logo.png'

function Lugar() {
    const [lugares, setLugares] = useState([]);
    const [zonaSeleccionada, setZonaSeleccionada] = useState('');
    const Navigate = useNavigate('');

    useEffect(() => {
        console.log("LMAO");
        axios.get("http://localhost:5001/lugar")
            .then(res => {
                console.log("AXIOSRES", res)
                setLugares(res.data);
            });
    }, []);

    const navigateToCanchas = (Id) => {
        Navigate('/Canchas/', { state: { id: Id } });
    }
    const navigateToHome = () => { 
        Navigate('/');
    }

    const handleZonaSelect = (Zona) => {
        setZonaSeleccionada(Zona);
    }


    const lugaresFiltrados = lugares.filter((lugar) =>
        zonaSeleccionada === '' || lugar.Zona === zonaSeleccionada
    );

    if (lugares.length === 0) return (<div></div>);
    document.body.classList = ["Lugar"];

    return (
        <div className="Fondo">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand onClick={navigateToHome}><img className="LogoLugar" src={LogoCancheros}></img></Navbar.Brand>
                <Nav className="mr-auto">
                        <Nav.Link href="/FormDueño">Unirse como dueño </Nav.Link>
                        <Nav.Link href="/CrearCancha">Crear cancha</Nav.Link>
                    </Nav>
                <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse>
            </Navbar>

            <Container>

                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                        Filtrar por Zona: {zonaSeleccionada || 'Todas'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleZonaSelect('')}>Todas</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleZonaSelect('Caballito')}>Caballito</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleZonaSelect('Flores')}>Flores</Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>

                <Row>
                    {lugaresFiltrados.map((element) => (
                        <Col sm={6}>
                            <Card>
                                <Card.Header><img className="card-img-top" src={element.Foto} alt="Card image cap"></img></Card.Header>
                                <Card.Body>
                                    <Card.Title><h1>{element.Nombre}</h1></Card.Title>
                                    <Card.Text>
                                        {element.Ubicacion}<br /><br />
                                        Zona: {element.Zona}
                                    </Card.Text>
                                    <Button onClick={() => navigateToCanchas(element.Id)} variant="primary">Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
export default Lugar;