import config from './dbconfig.js';
import sql from 'mssql';

// let pool = await sql.connect(config)


export class Usuario {

    static Login = async (nombre, mail, contrasenna) => {
        console.log("Estoy en log-in");
        let returnEntity = null;
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pNombre", sql.NVarChar(4000), nombre)
                .input("pMail", sql.NVarChar(4000), mail)
                .input("pContrasenna", sql.NVarChar(4000), contrasenna)
                .query("SELECT * FROM Usuario WHERE (Nombre = @pNombre AND Contrasenna = @pContrasenna) OR (Mail = @pMail AND Contrasenna = @pContrasenna)");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static Register = async (Usuario) => {
        console.log("Estoy en: register :o");
        const { Nombre, Telefono, Mail, Contrasenna, Foto, fkRol, } = Usuario
        let pool = await sql.connect(config)
        console.log("FKROL :" , fkRol)
        console.log("Nombre:,", Nombre)
        let result = await pool.request()
            .input('Nombre', sql.NVarChar(4000), Nombre)
            .input('Telefono', sql.NVarChar(4000), Telefono)
            .input('Mail', sql.NVarChar(4000), Mail)
            .input('Contrasenna', sql.NVarChar(4000), Contrasenna)
            .input('Foto', sql.NVarChar(4000), Foto)
            .input('fkRol', sql.Int, fkRol)
            .query('INSERT INTO Usuario (Nombre, Telefono, Mail, Contrasenna, Foto, fkRol) VALUES (@Nombre, @Telefono, @Mail, @Contrasenna, @Foto, @fkRol)')
    }

    static CambiarContrasenna = async (Usuario) => {
        console.log("Estoy en cambiar Contrasenna")
        let returnEntity = null;
        const { Id, Nombre, Telefono, Mail, Contrasenna, Foto, fkRol, } = Usuario
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int(), Id)
                .input('Nombre', sql.NVarChar(4000), Nombre)
                .input('Telefono', sql.NVarChar(4000), Telefono)
                .input('Mail', sql.NVarChar(4000), Mail)
                .input('Contrasenna', sql.NVarChar(4000), Contrasenna)
                .input('Foto', sql.NVarChar(4000), Foto)
                .input('fkRol', sql.Int, fkRol)
                .query('UPDATE Usuario SET Contrasenna = @Contrasenna WHERE Usuario.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static CambiarUsuario = async (Usuario) => {
        console.log("Estoy en cambiar Contrasenna")
        const { Id, Nombre, Telefono, Mail, Contrasenna, Foto, fkRol, } = Usuario
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int(), Id)
                .input('Nombre', sql.NVarChar(4000), Nombre)
                .input('Telefono', sql.NChar(4000), Telefono)
                .input('Mail', sql.NChar(4000), Mail)
                .input('Contrasenna', sql.NChar(4000), Contrasenna)
                .input('Foto', sql.NChar(4000), Foto)
                .input('fkRol', sql.Int, fkRol)
                .query('UPDATE Usuario SET Nombre = @Nombre WHERE Usuario.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getUsuario = async () => {
        let returnEntity = null;
        console.log("Estoy en: getUsuario");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM Usuario");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
}
export class Cancha {

    static getAll = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAll");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM Cancha");
            // console.log(result.recordset);
            returnEntity = result.recordset;
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }




    static insert = async (cancha) => {
        console.log("Estoy en: crear cancha");
        const { Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar } = cancha
        let pool = await sql.connect(config)
        console.log("Nombre:,", Nombre)
        let result = await pool.request()
            .input('Nombre', sql.NVarChar(4000), Nombre)
            .input('Foto', sql.NVarChar(4000), Foto)
            .input('Deporte', sql.NVarChar(4000), Deporte)
            .input('EnReparacion', sql.Bit, EnReparacion)
            .input('CantPersonas', sql.Int, CantPersonas)
            .input('TipoPiso', sql.NVarChar(4000), TipoPiso)
            .input('Precio', sql.Float, Precio)
            .input('fkLugar',sql.Int, fkLugar)
            .query('INSERT INTO Cancha (Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar) VALUES (@Nombre, @Foto, @Deporte, @EnReparacion, @CantPersonas, @TipoPiso, @Precio, @fkLugar)')
    }

    static update = async (cancha) => {
        const { Id, Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar } = cancha
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .input('Nombre', sql.NVarChar(4000), Nombre)
                .input('Foto', sql.NVarChar(4000), Foto)
                .input('Deporte', sql.NVarChar(4000), Deporte)
                .input('EnReparacion', sql.Bit, EnReparacion)
                .input('CantPersonas', sql.Int, CantPersonas)
                .input('TipoPiso', sql.NVarChar(4000), TipoPiso)
                .input('Precio', sql.Float, Precio)
                .input('fkLugar', sql.Int, fkLugar)
                .query('UPDATE Cancha SET Nombre = @Nombre, Foto = @Foto, Deporte = @Deporte, EnReparacion = @EnReparacion, CantPersonas = @CantPersonas, TipoPiso = @TipoPiso, Precio = @Precio, fkLugar = @fkLugar  WHERE Cancha.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
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

export class Lugar {

    static getAll = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAll");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Nombre, Ubicacion,Zona,Foto FROM Lugar");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    static insert = async () => {
        console.log("Estoy en: crear lugar");
        const { Nombre, Ubicacion, Zona, Foto, fkDueño } = lugar
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('Nombre', sql.NVarChar(4000), Nombre)
            .input('Ubicacion', sql.NChar(4000), Ubicacion)
            .input('Zona', sql.NChar(4000), Zona)
            .input('Foto', sql.NChar(4000), Foto)
            .input('fkDueño', sql.Int, fkDueño)
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





