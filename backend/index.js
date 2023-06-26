import  express from "express";
import { Usuario, Cancha, Lugar } from "./Services.js";
import config from './dbconfig.js';
import sql from 'mssql';
import cors from 'cors';
const app = express();
const port = 5001;
app.use(express.json())
app.use(cors());
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

})

//funca
app.post('/login',async(req,res) =>{
    try{
        console.log(req.body)
        await Usuario.Login(req.body.mail, req.body.contrasenna)
        res.status(200).json({message : 'Usuario encontrado'})  
    }catch(error){
        console.log(error)
        res.status(404).json({error : 'No se encontro el usuario'})
    }

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

//funca
app.get('/lugar', async(req,res) => {
    const lugar = await Lugar.getAll();
    console.log(lugar);
    res.status(200).json(lugar);
})
//funca
app.delete('/lugar/delete/:id', async(req,res) => {
    const lugar = await Lugar.deleteById(req.params.id)
    res.status(202).send(lugar)
})
//funca
app.post('/lugar/post', async(req,res) =>{
    try{
        await Lugar.insert(req.body)
        res.status(201).json({message: 'Lugar creada'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo la creacion'})
    }
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})