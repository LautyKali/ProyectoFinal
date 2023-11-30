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

function Lugar() {
    const context = useContext(usuarioContext)
    const hcontext = useContext(horarioContext)
    const [lugares, setLugares] = useState([]);
    const [zonasFiltradas, setZonasFiltradas] = useState([])
    const [zonaSeleccionada, setZonaSeleccionada] = useState('');
    const Navigate = useNavigate('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
        const handleDropdownToggle = () => {
          setDropdownOpen(!isDropdownOpen);
        };
      
        const handleLogout = () => {
          context.setUsuarioContext('')
          console.log('Usuario deslogueado');
          Navigate('/')
        };


    useEffect(()=>{
        console.log("horarioContext",hcontext)
    },[hcontext.horario])

   


    useEffect(() => {
        console.log("LMAO");
        console.log("ROL:", context.usuario.fkRol)
        console.log("ID:", context.usuario.Id)
        if (context.usuario.fkRol === 2) {
            axios.get("http://localhost:5001/lugar/" + context.usuario.Id)
                .then(res => {
                    console.log("AXIOSRES", res)
                    setLugares(res.data);
                   
                });
        } else if (context.usuario.fkRol === 3) {
            axios.get("http://localhost:5001/lugar")
                .then(res => {
                    console.log("AXIOSRES", res)
                    setLugares(res.data.lugar);
                    hcontext.setHorarioContext([...res.data.horario])
                }); 
              
        }
    }, [context.usuario.fkRol]); 

    useEffect(()=>{
        console.log("lugares", lugares)
        if (lugares.length === 0) {
            return
        }else{
        const x = lugares.map(lugar=>lugar.Zona)
       setZonasFiltradas([...new Set(x)])}
    },[lugares])

    const navigateToCanchas = (IdL) => {
        console.log("lugarID", IdL)
        Navigate('/Canchas/' + IdL);
    }
    function navigateToReservas()  {
        Navigate('/verReservas');
    }

    const navigateToHome = () => {
        Navigate('/');
    }

    const handleZonaSelect = (Zona) => {
        setZonaSeleccionada(Zona);
    }

    if (lugares.length === 0) return (<div></div>);
    document.body.classList = ["Lugar"];
    return context.usuario.fkRol !== 2 ? (
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

                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                        Filtrar por Zona: {zonaSeleccionada || 'Todas'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu> 
                        <Dropdown.Item onClick={() => handleZonaSelect('')}>Todas</Dropdown.Item>
                        {zonasFiltradas.map((element)=>(
                        <Dropdown.Item onClick={() => handleZonaSelect(`${element}`)}>{element}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Row>
                    {lugares.map((element) => (
                        <Col sm={6}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <img className="card-img-top" src={element.Foto} alt="Card image cap" />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <h1>{element.Nombre}</h1>
                                    </Card.Title>
                                    <Card.Text>
                                        {element.Ubicacion}
                                        <br /><br />
                                        Zona: {element.Zona}
                                    </Card.Text>
                                    <Button className = "verMas" onClick={() => navigateToCanchas(element.Id)} variant="primary">Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    ) :
        (
            <div className="Fondo">
                <Row style={{width:'auto'}}>
            <Navbar className='navBar' style={{paddingLeft:'2%',paddingRight:'2%'}}>
                <Navbar.Brand><Link to='/'>
                    <img src={LogoCancheros} width="auto" height="80vh" className="align-top"></img>
                    </Link></Navbar.Brand>  
                <Nav>
                    <Nav.Link onClick={() => Navigate("/CrearCancha", { state: lugares })}>CrearCancha</Nav.Link> 
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => navigateToReservas()}>Ver Reservas</Nav.Link> 
                </Nav>
                <Nav className="me-auto">
                <Navbar.Brand className="logOut" onClick={()=>navigateToHome()}>Salir</Navbar.Brand>
                </Nav>
            </Navbar>
            <Outlet/>
        </Row>

                <Container>

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-ubicacion">
                            Filtrar por Zona: {zonaSeleccionada || 'Todas'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleZonaSelect('')}>Todas</Dropdown.Item>
                            {zonasFiltradas.map((element)=>(
                        <Dropdown.Item onClick={() => handleZonaSelect(`${element}`)}>{element}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Row>
                        {lugares.map((element) => (
                            <Col sm={6}>
                                <Card className="custom-card">
                                    <Card.Header>
                                        <img className="card-img-top" src={element.Foto} alt="Card image cap" />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <h1>{element.Nombre}</h1>
                                        </Card.Title>
                                        <Card.Text>
                                            {element.Ubicacion}
                                            <br /><br />
                                            Zona: {element.Zona}
                                        </Card.Text>
                                        <Button className = "verMas" onClick={() => navigateToCanchas(element.Id)} variant="primary">Ver más</Button>
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
