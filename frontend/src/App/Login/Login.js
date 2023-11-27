import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios';
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import LogoCancheros from '../../Logo.png'
import usuarioContext from "../../Context/context";

function Login() {
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate('');
    const navigate = useNavigate();
    const context = useContext(usuarioContext);
    const navigateToRegister = () => {
        navigate('/Register');
    }

    const navigateTo404 = () => {
        navigate('/NotFound');
    }

    function validateForm() {
        return mail.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        let usuario = {
            mail: mail,
            contrasenna: password
        }
        axios.post('http://localhost:5001/login', usuario)
            .then(res => {
                console.log("DATA",res)
                context.setUsuarioContext(res.data.usuario[0])
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
            <img className="logoCancheros" src={LogoCancheros}></img>
            <h1>CANCHEROS</h1>
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
                <Button onClick={()=>navigateTo404()} className="botonContra">¿Olvidaste tu contraseña?</Button>
                </Form.Group>
                <Button color="blue" block size="lg" type="submit" className="botonGen" disabled={!validateForm()}>
                    Iniciar sesion </Button>
            </Form>
            <Button onClick={navigateToRegister} className="blockLog">Crear cuenta
            </Button>
        </div>
    );
}
export default Login;