import config from './dbconfig.js';
import sql from 'mssql';

export class Usuario{
static insert = async (Usuario) => {
    console.log("Estoy en: register :o");
    const { Nombre, Telefono, Mail, Contraseña, Foto, fkRol,}= Usuario
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
}



