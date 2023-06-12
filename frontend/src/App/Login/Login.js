import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

 function Login() {
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate('');

    function validateForm() {
        return mail.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        let usuario = {
           mail : mail,
           contrasenna : password
        }
        axios.post('http://localhost:5001/login', usuario)
        .then(res =>{
            Navigate('/home')
        }).catch(e => {
            console.log(e.response.status, e.data, usuario)
        })
    }
    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}> 
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={mail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button color="blue" block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                <Link onClick={()=>Navigate(-1)}>Registrarse</Link>
            </Form>
        </div> 
    );
}
export default Login;