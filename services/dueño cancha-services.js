import config from './dbconfig.js';
import sql from 'mssql';

export class Cancha{
    static insert = async (cancha) => {
        console.log("Estoy en: crear cancha");
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
            .query('INSERT INTO Cancha (Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkDueño) VALUES (@Nombre, @Foto, @Deporte, @EnReparacion, @CantPersonas, @TipoPiso, @Precio, @fkDueño)')
    }

    static deleteById = async (Id) => {
        let returnEntity = null;
        console.log("Estoy en: Borrar cancha");
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

    export class Lugar{
        static insert = async (Lugar) => {
            console.log("Estoy en: crear cancha");
            const { Nombre, Ubicacion, Zona, Foto, fkDueño} = lugar
            let pool = await sql.connect(config)
    
            let result = await pool.request()
                .input('Nombre', sql.NVarChar(200), Nombre)
                .input('Ubicacion', sql.NChar(200), Ubicacion)
                .input('Zona', sql.NChar(200), Zona)
                .input('Foto', sql.NChar(200), Foto)
                .input('fkDueño', sql.Int,fkDueño)
                .query('INSERT INTO Lugar (Nombre, Ubicacion, Zona, Foto, fkDueño) VALUES (@Nombre, @Ubicacion, @Zona, @Foto, @fkDueño)')
        }
    
        static deleteById = async (Id) => {
            let returnEntity = null;
            console.log("Estoy en: Borrar lugar");
            try {
                let pool = await sql.connect(config)
                let result = await pool.request()
                    .input("pId", sql.Int, Id)
                    .query("Delete FROM Lugar WHERE Id = @pId");
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error);
            }
            return returnEntity;
        }
    

    }