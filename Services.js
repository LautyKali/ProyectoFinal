import config from './dbconfig.js';
import sql from 'mssql';

export class ClienteService {
    static getAll = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAll");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio FROM Cancha");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
    static getById = async (Id) => {
        let returnEntity = null;
        console.log("Estoy en: GetById");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query("SELECT Nombre, Ubicacion, Zona, Foto FROM Lugar WHERE Id = @pId");
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
}

export class DueñoService {

    static getAll = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAll");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio FROM Cancha");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
    static getById = async (Id) => {
        let returnEntity = null;
        console.log("Estoy en: GetById");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query("SELECT Nombre, Ubicacion, Zona, Foto FROM Lugar WHERE Id = @pId");
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    static insert = async (cancha) => {
        console.log("Estoy en: insert");
        const { Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkDueño } = cancha
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('Nombre', sql.NVarChar(200), Nombre)
            .input('Foto', sql.NChar(200), Foto)
            .input('Deporte', sql.NChar(200), Deporte)
            .input('EnReparacion', sql.Bit, EnReparacion)
            .input('CantPersonas', sql.Int,CantPersonas)
            .input('TipoPiso', sql.NChar(200), TipoPiso)
            .input('Precio', sql.Float,Precio)
            .input('fkDueño', sql.Int, fkDueño)
            .query('INSERT INTO Pizzas (Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkDueño) VALUES (@Nombre, @Foto, @Deporte, @EnReparacion, @CantPersonas, @TipoPiso, @Precio, @fkDueño)')
    }

    static update = async (cancha) => {
        const { Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkDueño } = cancha
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .input('Nombre', sql.NVarChar(200), Nombre)
                .input('Foto', sql.NChar(200), Foto)
                .input('Deporte', sql.NChar(200), Deporte)
                .input('EnReparacion', sql.Bit, EnReparacion)
                .input('CantPersonas', sql.Int,CantPersonas)
                .input('TipoPiso', sql.NChar(200), TipoPiso)
                .input('Precio', sql.Float,Precio)
                .query('UPDATE Cancha SET Nombre = @Nombre, Foto = @Foto, Deporte = @Deporte, EnReparacion = @EnReparacion, CantPersonas = @CantPersonas, TipoPiso = @TipoPiso, Precio = @Precio  WHERE Cancha.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


    static deleteById = async (Id) => {
        let returnEntity = null;
        console.log("Estoy en: delete");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, Id)
                .query("Delete FROM Cancha WHERE Id = @pId");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }



}



