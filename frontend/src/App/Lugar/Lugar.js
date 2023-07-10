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
import Container from 'react-bootstrap/Container'

function Lugar() {
    const [lugares, setLugares] = useState([]);
    const Navigate = useNavigate('');
    useEffect(() => {
        console.log("LMAO");
        axios.get("http://localhost:5001/lugar")
            .then(res => {
                console.log("AXIOSRES", res)
                setLugares(
                    res.data
                );
            })
    }, [])

    const navigateToCanchas = (Id) => {
        Navigate('/Canchas/', {state: {id: Id}});
    }

    
    if(lugares.length === 0) return (<div></div>);
    document.body.classList = ["Lugar"];
    return (
 
        <Container>
        <Row>             
                {
                    lugares.map((element) =>
                    (
                    <Col sm={6}>
                    <Card >
                        <Card.Header><img className="card-img-top" src={element.Foto} alt="Card image cap"></img></Card.Header>
                        <Card.Body>
                            <Card.Title><h1>{element.Nombre}</h1></Card.Title>
                            <Card.Text>
                                {element.Ubicacion}<br/><br/>
                                Zona: {element.Zona}
                                
                            </Card.Text>
                            <Button onClick={() => navigateToCanchas(element.Id)} variant="primary">Ver más</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    )
                    )
                }
                </Row> 
                </Container>

    );
}

export default Lugar;