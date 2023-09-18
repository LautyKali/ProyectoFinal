import { useState, useEffect } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import "./Canchas.css";
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useFetcher, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Modal } from "react-bootstrap";



function Canchas() {
    const [cancha, setCancha] = useState("");
    const { state } = useLocation();
    const { id } = state;
    const [datos,setDatos] = useState([])
    console.log("WOAAAAAAA", id);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        console.log("LMAO");
        axios.get("http://localhost:5001/cancha/" + id)
            .then(res => {
                console.log("AXIOSRES", res)
                setCancha(
                    res.data
                );
            })
    }, [])

    const handleModalOpen = (e) => {
        setDatos(e)
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const submitEdit = ()=>{

        axios.put("http//localhost:5001/cancha/",cancha)

    }

    if (cancha.length === 0) return (<div></div>);
    document.body.classList = ["Canchas"];
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Nombre de tu App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Inicio </Nav.Link>
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
                                            <p>Deporte: {element.Deporte}<br /></p>
                                            {element.EnReparacion}<br />
                                            <p>Cantidad de personas: {element.CantPersonas}</p><br /><br />
                                            <p>Tipo de cancha : {element.TipoPiso} </p><br /><br />
                                            <p>Precio: {element.Precio}</p>
                                    
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

                    <p className="modalText">{datos.Deporte}</p>
                    <p className="modalText">{datos.CantPersonas}</p>
                    <p className="modalText">{datos.TipoPiso}</p>
                    <p className="modalText">{datos.Precio}</p> 

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>


    );
}

export default Canchas;