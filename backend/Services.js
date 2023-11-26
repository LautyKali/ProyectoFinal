import config from "./dbconfig.js";
import sql from "mssql";

// let pool = await sql.connect(config)

export class Usuario {
  static Login = async (mail, contrasenna) => {
    console.log("Estoy en log-in", mail, contrasenna);
    let returnEntity = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pMail", sql.NVarChar(4000), mail)
        .input("pContrasenna", sql.NVarChar(4000), contrasenna)
        .query(
          "SELECT * FROM Usuario WHERE Mail = @pMail AND Contrasenna = @pContrasenna"
        );
      returnEntity = result.recordsets[0];
      console.log(returnEntity);
    } catch (error) {
      console.log(error, "");
    }
    return returnEntity;
  };

  static Register = async (Usuario) => {
    const { nombre, telefono, mail, contrasenna, foto, fkRol } = Usuario;
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Nombre", sql.NVarChar(4000), nombre)
      .input("Telefono", sql.NVarChar(4000), telefono)
      .input("Mail", sql.NVarChar(4000), mail)
      .input("Contrasenna", sql.NVarChar(4000), contrasenna)
      .input("Foto", sql.NVarChar(4000), foto)
      .input("fkRol", sql.Int, fkRol)
      .query(
        "INSERT INTO Usuario (Nombre, Telefono, Mail, Contrasenna, Foto, fkRol) VALUES (@Nombre, @Telefono, @Mail, @Contrasenna, @Foto, @fkRol)"
      );
  };

  static CambiarContrasenna = async (Usuario) => {
    console.log("Estoy en cambiar Contrasenna");
    let returnEntity = null;
    const { Id, Nombre, Telefono, Mail, Contrasenna, Foto, fkRol } = Usuario;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .input("Nombre", sql.NVarChar(4000), Nombre)
        .input("Telefono", sql.NVarChar(4000), Telefono)
        .input("Mail", sql.NVarChar(4000), Mail)
        .input("Contrasenna", sql.NVarChar(4000), Contrasenna)
        .input("Foto", sql.NVarChar(4000), Foto)
        .input("fkRol", sql.Int, fkRol)
        .query(
          "UPDATE Usuario SET Contrasenna = @Contrasenna WHERE Usuario.Id = @pId"
        );
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static CambiarUsuario = async (Usuario) => {
    console.log("Estoy en cambiar Contrasenna");
    const { Id, Nombre, Telefono, Mail, Contrasenna, Foto, fkRol } = Usuario;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .input("Nombre", sql.NVarChar(4000), Nombre)
        .input("Telefono", sql.NVarChar(4000), Telefono)
        .input("Mail", sql.NVarChar(4000), Mail)
        .input("Contrasenna", sql.NVarChar(4000), Contrasenna)
        .input("Foto", sql.NVarChar(4000), Foto)
        .input("fkRol", sql.Int, fkRol)
        .query("UPDATE Usuario SET Nombre = @Nombre WHERE Usuario.Id = @pId");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static getUsuario = async () => {
    let returnEntity = null;
    console.log("Estoy en: getUsuario");
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query("SELECT * FROM Usuario");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
  static getUsuarioById = async (id) => {
    let returnEntity = null;
    console.log("Estoy en: getUsuario");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .query("SELECT * FROM Usuario WHERE Usuario.Id = @pId ");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
  static updateRol = async (usuario,id) => {
    let returnEntity = null;
    const { Nombre, Telefono, Mail, Contrasenna, Foto, fkRol } = usuario;
    try {
        let pool = await sql.connect(config);
        let result = await pool
          .request()
          .input("pId", sql.Int(), id)
          .input("Nombre", sql.NVarChar(4000), Nombre)
          .input("Telefono", sql.NVarChar(4000), Telefono)
          .input("Mail", sql.NVarChar(4000), Mail)
          .input("Contrasenna", sql.NVarChar(4000), Contrasenna)
          .input("Foto", sql.NVarChar(4000), Foto)
          .input("fkRol", sql.Int, 2)
          .query("UPDATE Usuario SET fkRol = @fkRol WHERE Usuario.Id = @pId");
        returnEntity = result.recordsets[0];
      } catch (error) {
        console.log(error);
      }
      return returnEntity;
  };
}

export class Cancha {
  static getAllById = async (Id) => {
    let returnEntity = null;
    console.log("Estoy en: GetAllById");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .query(
          "SELECT C.Id, C.Nombre, C.Foto, C.Deporte, C.EnReparacion, C.CantPersonas, C.TipoPiso, C.Precio, C.fkLugar FROM Cancha C INNER JOIN Lugar L on C.fkLugar = L.Id WHERE L.Id= @pId"
        );
      // console.log(result.recordset);
      returnEntity = result.recordset;
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };


  static getCanchaById = async (Id) => {
    let returnEntity = null;
    console.log("Estoy en: GetCanchasById");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .query(
          "SELECT C.Id, C.Nombre, C.Foto, C.Deporte, C.EnReparacion, C.CantPersonas, C.TipoPiso, C.Precio FROM Cancha C  WHERE C.Id = @pId"
        );
      // console.log(result.recordset);
      returnEntity = result.recordset;
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static insert = async (cancha) => {
    console.log("Estoy en: crear cancha");
    const {
      Nombre,
      Foto,
      Deporte,
      EnReparacion,
      CantPersonas,
      TipoPiso,
      Precio,
      fkLugar,
    } = cancha;
    let pool = await sql.connect(config);
    console.log("Nombre:,", Nombre);
    let result = await pool
      .request()
      .input("Nombre", sql.NVarChar(4000), Nombre)
      .input("Foto", sql.NVarChar(4000), Foto)
      .input("Deporte", sql.NVarChar(4000), Deporte)
      .input("EnReparacion", sql.Bit, EnReparacion)
      .input("CantPersonas", sql.Int, CantPersonas)
      .input("TipoPiso", sql.NVarChar(4000), TipoPiso)
      .input("Precio", sql.Float, Precio)
      .input("fkLugar", sql.Int, fkLugar)
      .query(
        "INSERT INTO Cancha (Nombre, Foto, Deporte, EnReparacion, CantPersonas, TipoPiso, Precio, fkLugar) VALUES (@Nombre, @Foto, @Deporte, @EnReparacion, @CantPersonas, @TipoPiso, @Precio, @fkLugar)"
      );
  };

  static update = async (id, cancha) => {
    const {
      Nombre,
      Foto,
      Deporte,
      EnReparacion,
      CantPersonas,
      TipoPiso,
      Precio,
    } = cancha;
    let returnEntity = null;
    console.log("Estoy en: update", cancha);
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, id)
        .input("Nombre", sql.NVarChar(4000), Nombre)
        .input("Foto", sql.NVarChar(4000), Foto)
        .input("Deporte", sql.NVarChar(4000), Deporte)
        .input("EnReparacion", sql.Bit, EnReparacion)
        .input("CantPersonas", sql.Int, CantPersonas)
        .input("TipoPiso", sql.NVarChar(4000), TipoPiso)
        .input("Precio", sql.Float, Precio)
        .query(
          "UPDATE Cancha SET Nombre = @Nombre, Foto = @Foto, Deporte = @Deporte, EnReparacion = @EnReparacion, CantPersonas = @CantPersonas, TipoPiso = @TipoPiso, Precio = @Precio  WHERE Cancha.Id = @pId"
        );
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static deleteById = async (Id) => {
    let returnEntity = null;
    console.log("Estoy en: Borrar cancha");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, Id)
        .query("Delete FROM Cancha WHERE Id = @pId");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static reservar = async(Id,reserva) => {
    let returnEntity = null;
    console.log("Estoy en reservar cancha");
    try{
      let pool = await sql.connect(config);
      let result = await pool
      .request()
    }
    catch(error){
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
      let pool = await sql.connect(config);
      let result = await pool.request().query("SELECT * FROM Lugar");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static insert = async (lugar) => {
    console.log("Estoy en: crear lugar", lugar);
    const { nombre, ubicacion, zona, fotos, fkDueño } = lugar;
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Nombre", sql.NVarChar(4000), nombre)
      .input("Ubicacion", sql.NVarChar(4000), ubicacion)
      .input("Zona", sql.NVarChar(4000), zona)
      .input("Foto", sql.NVarChar(4000), fotos)
      .input("fkDueño", sql.Int, fkDueño)
      .query(
        "INSERT INTO Lugar (Nombre, Ubicacion, Zona, Foto, fkDueño) VALUES (@Nombre, @Ubicacion, @Zona, @Foto, @fkDueño)"
      );
  };

  static deleteById = async (Id) => {
    let returnEntity = null;
    console.log("Estoy en: Borrar lugar");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, Id)
        .query("Delete FROM Lugar WHERE Id = @pId");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
  static getLugarById = async (Id) => {
    let returnEntity = null;
    console.log("Estoy en: GetCanchasByLugar");
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), Id)
        .query(
          "SELECT L.Id, L.Nombre, L.Ubicacion, L.Zona, L.Foto, L.fkDueño FROM Lugar L INNER JOIN Usuario U on L.fkDueño = U.Id WHERE U.Id = @pId"
        );
      // console.log(result.recordset);
      returnEntity = result.recordset;
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
}
export class Horarios{

  static 

}