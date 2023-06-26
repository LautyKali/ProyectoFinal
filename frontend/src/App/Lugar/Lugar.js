import { React, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import "./Lugar.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useFetcher, useNavigate } from 'react-router-dom';


/*function Lugar() {
    const [lugares, setLugares] = useState([]);
    const Navigate = useNavigate('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log("LMAO");
        axios.get("http://localhost:5001/lugar")
            .then(res => {
                console.log("AXIOSRES", res)
                setLugares(
                    res.data
                );
                setIsLoading(false);
            })
    }, [lugares])

    const navigateToCanchas = () => {
        Navigate('/canchas');
    }

    console.log("AAAAAAAAAA", lugares);

    if(lugares.length === 0) return (<div></div>);

    return (
 
            <div>
                {
                    lugares.map((element) =>
                    (<Card>
                        <Card.Header>{element.foto}</Card.Header>
                        <Card.Body>
                            <Card.Title>{element.nombre}</Card.Title>
                            <Card.Text>
                                {element.zona}
                                {element.ubicacion}
                            </Card.Text>
                            <Button onClick={navigateToCanchas} variant="primary"></Button>
                        </Card.Body>
                    </Card>)
                    )
                }
            </div>


    );
}*/

function Lugar() {
    return (
        <div> PEPE </div>
    )
}
export default Lugar;