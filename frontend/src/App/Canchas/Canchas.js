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



function Canchas() {
    const [cancha, setCancha] = useState("");
     
    const {state} = useLocation();
    const {id} = state;
    console.log("WOAAAAAAA", id);

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

  

    
    if(cancha.length === 0) return (<div></div>);
    document.body.classList = ["Canchas"];
    return (
        <Container>
        <Row>
                {
                    cancha.map((element) =>
                    (
                    
                        <Col sm={4}>
                    <Card>
                        <Card.Header><img className="card-img-top" src={element.Foto} alt="Card image cap"></img></Card.Header>
                        <Card.Body>
                            <Card.Title><h1>{element.Nombre}</h1></Card.Title>
                            <Card.Text>
                                {element.Deporte}<br/>
                                 {element.EnReparacion}<br/>
                                 {element.CantPersonas}<br/><br/>
                                 {element.TipoPiso}<br/><br/>
                                 {element.Precio}
                                
                            </Card.Text>
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

export default Canchas;