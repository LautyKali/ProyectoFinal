import  express from "express";
import { Usuario, Cancha, Lugar } from "./Services.js";
import config from './dbconfig.js';
import sql from 'mssql';
const app = express();
const port = 5000;
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

app.get('/login',async(req,res) =>{
    const ususario = await Usuario.Login(req.params.nombre, req.params.email, req.params.contrasenna)
    res.status(200).json(ususario)
})

app.put('/usuario/cambiarcontraseña',async(req,res) => {
    let ususario = await Usuario.CambiarContraseña(req.body);
    res.status(202).send(ususario);
})
app.put('/usuario/cambiarusuario',async(req,res) => {
    let ususario = await Usuario.CambiarUsuario(req.body);
    res.status(202).send(ususario);
})


app.delete('/pizza/delete/:id', async(req,res) => {
    const pizza = await PizzaServices.deleteById(req.params.id)
    res.status(202).send(pizza)
})

app.use(express.json())
app.post('/pizza/post', async(req,res) =>{
    try{
        console.log(req.body)
        await PizzaServices.insert(req.body)
        res.status(201).json({message: 'Pizza creada'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo la cracion'})
    }
})

app.put('/pizza/put',async(req,res) => {
    let pizza = await PizzaServices.update(req.body);
    res.status(202).send(pizza);
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})

