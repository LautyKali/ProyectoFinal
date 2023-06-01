import  express from "express";
import { Usuario, Cancha, Lugar } from "./Services.js";
import config from './dbconfig.js';
import sql from 'mssql';
const app = express();
const port = 5000;
app.use(express.json())

//funca
app.post('/registro',async(req,res) =>{
    try{
        console.log(req.body)
        await Usuario.Register(req.body)
        res.status(201).json({message: 'Usuario registrado'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo el registro'})
    }

    const usuario = await Usuario.Register()
    res.status(200).send(usuario)
})

//no funca
app.get('/login',async(req,res) =>{
    const ususario = await Usuario.Login(req.params.nombre, req.params.email, req.params.contrasenna)
    res.status(200).json(ususario)
})

//funca
app.put('/usuario/cambiarcontrasenna/:id',async(req,res) => {
    let ususario = await Usuario.CambiarContrasenna(req.body);
    res.status(201).json({message: 'Contraseña cambiada'})
    res.status(202).send(ususario);
})
//funca
app.put('/usuario/cambiarusuario',async(req,res) => {
    let ususario = await Usuario.CambiarUsuario(req.body);
    res.status(201).json({message: 'Usuario cambiado'})
    res.status(202).send(ususario);
})

//funca
app.get('/cancha', async(req,res) => {
    const cancha = await Cancha.getAll();
    console.log(cancha);
    res.status(200).json(cancha);
})

//funca
app.get('/usuario', async(req,res)=>{
    const usuario = await Usuario.getUsuario();
    console.log(usuario)
    res.status(200).json(usuario)
})

app.use(express.json())

//funca
app.post('/cancha/post', async(req,res) =>{
    try{
        await Cancha.insert(req.body)
        res.status(201).json({message: 'Cancha creada'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo la creacion'})
    }
})

//funca
app.put('/cancha/put',async(req,res) => {
    let cancha = await Cancha.update(req.body);
    res.status(201).json({message: 'Cancha actualizada'})
    res.status(202).send(cancha);
})


//funca
app.delete('/cancha/delete/:id', async(req,res) => {
    const cancha = await Cancha.deleteById(req.params.id)
    res.status(202).send(cancha)
})
app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})

