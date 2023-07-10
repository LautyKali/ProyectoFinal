import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

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
            Navigate('/Lugar')
            console.log(res)
        }).catch(e => {
            alert("Mail o contraseña incorrectos")
            console.log(e.response.status, e.data, usuario)
        })
    }
    document.body.classList = ["login"];
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
                <Form.Group size="lg">
                <Link to="olvideContra" style={{fontSize: "80%"}}  >¿Olvidaste tu contraseña?</Link>
                </Form.Group>
                <Button onClick={()=>Navigate(-1)}>Registrarse
                </Button>
                
                <Button color="blue" block size="lg" type="submit" disabled={!validateForm()}>
                    Login </Button>
            </Form>
        </div> 
    );
}
export default Login;