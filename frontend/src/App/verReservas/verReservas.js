import { useState, useEffect, useContext } from "react";
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
import LogoCancheros from '../../Logo.png'
import usuarioContext from "../../Context/context";
import horarioContext from "../../Context/hcontext";
import { Link,Outlet} from 'react-router-dom';


function verReservas(params) {
    const context = useContext(usuarioContext);
    const hcontext = useContext(horarioContext);
    const [reservas, setReservas] = useState("");
    useEffect(() => {
        console.log("contextUsuario",context.usuario)
        axios.get("http://localhost:5001/reservas/" + context.usuario.id).then((res) => {
          console.log("AXIOSRES asdasd", res);
          setReservas(res.data);
        });
      },);
}


return (
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
          {reservas.map((element) => (
            <Col sm={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h1>{element.NumeroReserva} </h1>
                    <br />
                  </Card.Title>
                  <Card.Text>
                    <div>
                      Seña pagada: {element.PrecioSeña}
                      <br />
                    </div>
                    <div>Fecha: {element.Fecha}</div>
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
                <Button
                  style={{backgroundColor: "red"}}
                  onClick={() => deleteCancha(element.Id)}
                  className="block"
                >
                  Eliminar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
)