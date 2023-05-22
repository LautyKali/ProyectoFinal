import config from './dbconfig.js';
import sql from 'mssql';


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
        const { Nombre, Telefono, Mail, Contraseña, Foto, fkRol, } = Usuario
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('Nombre', sql.NVarChar(200), Nombre)
            .input('Telefono', sql.NChar(200), Telefono)
            .input('Mail', sql.NChar(200), Mail)
            .input('Contraseña', sql.NChar(200), Contraseña)
            .input('Foto', sql.NChar(200), Foto)
            .input('FkRol', sql.NChar(200), fkRol)
            .query('INSERT INTO Usuario (Nombre, Telefono, Mail, Contraseña, Foto, FkRol) VALUES (@Nombre, @Telefono, @Mail, @Contraseña, @Foto, @FkRol)')
    }

    static CambiarContraseña = async(Usuario) =>{
        console.log("Estoy en cambiar contraseña")
        let returnEntity = null;
        const { Id, Nombre, Telefono, Mail, Contraseña, Foto, fkRol, } = Usuario
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
            input('pId', sql.Int(), Id)
            .input('Nombre', sql.NVarChar(200), Nombre)
            .input('Telefono', sql.NChar(200), Telefono)
            .input('Mail', sql.NChar(200), Mail)
            .input('Contraseña', sql.NChar(200), Contraseña)
            .input('Foto', sql.NChar(200), Foto)
            .input('FkRol', sql.NChar(200), fkRol)
            .query('UPDATE Usuario SET Contraseña = @Contraseña WHERE Usuario.Id = @pId')
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
            return returnEntity;
        }

    static CambiarUsuario = async(Usuario) =>{
        console.log("Estoy en cambiar contraseña")
        const { Id, Nombre, Telefono, Mail, Contraseña, Foto, fkRol, } = Usuario
        try{
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('pId', sql.Int(), Id)
            .input('Nombre', sql.NVarChar(200), Nombre)
            .input('Telefono', sql.NChar(200), Telefono)
            .input('Mail', sql.NChar(200), Mail)
            .input('Contraseña', sql.NChar(200), Contraseña)
            .input('Foto', sql.NChar(200), Foto)
            .input('FkRol', sql.NChar(200), fkRol)
            .query('UPDATE Usuario SET Nombre = @Nombre WHERE Usuario.Id = @pId') 
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
            return returnEntity;
        }
    }
    export class Cancha {

        static getAll = async (Id) => {
            let returnEntity = null;
            console.log("Estoy en: GetAll");
            try {
                let pool = await sql.connect(config)
                let result = await pool.request()
                    .input("pId", sql.Int, Id)
                    .query("SELECT Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio FROM Cancha WHERE fkLugar = @pId");
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error);
            }
            return returnEntity
        }
    
    
    
        static insert = async (cancha) => {
            console.log("Estoy en: crear cancha");
            const { Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar } = cancha
            let pool = await sql.connect(config)
    
            let result = await pool.request()
                .input('Nombre', sql.NVarChar(200), Nombre)
                .input('Foto', sql.NChar(200), Foto)
                .input('Deporte', sql.NChar(200), Deporte)
                .input('EnReparacion', sql.Bit, EnReparacion)
                .input('CantPersonas', sql.Int, CantPersonas)
                .input('TipoPiso', sql.NChar(200), TipoPiso)
                .input('Precio', sql.Float, Precio)
                .query('INSERT INTO Cancha (Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkDueño) VALUES (@Nombre, @Foto, @Deporte, @EnReparacion, @CantPersonas, @TipoPiso, @Precio, @fkDueño)')
        }
    
        static update = async (cancha) => {
            const { Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar } = cancha
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
                    .input('CantPersonas', sql.Int, CantPersonas)
                    .input('TipoPiso', sql.NChar(200), TipoPiso)
                    .input('Precio', sql.Float, Precio)
                    .query('UPDATE Cancha SET Nombre = @Nombre, Foto = @Foto, Deporte = @Deporte, EnReparacion = @EnReparacion, CantPersonas = @CantPersonas, TipoPiso = @TipoPiso, Precio = @Precio  WHERE Cancha.Id = @pId')
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
                .input('Nombre', sql.NVarChar(200), Nombre)
                .input('Ubicacion', sql.NChar(200), Ubicacion)
                .input('Zona', sql.NChar(200), Zona)
                .input('Foto', sql.NChar(200), Foto)
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

    



