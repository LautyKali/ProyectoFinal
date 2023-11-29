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
        .input("pId", sql.Int(), id)
        .query("SELECT * FROM Usuario WHERE Usuario.Id = @pId ");
      returnEntity = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
  static updateRol = async (usuario, id) => {
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

  static getDisponibilidadCanchaXDia = async(id,fecha)=>{
    let returnEntity = null;
    console.log("Estoy en: Getdisponibilidad", id, fecha);
    try{
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int(), id)
        .input("pFecha", sql.Date(),fecha)
        .query("Select * from ReservaXHorario WHERE fkReserva  IN (Select Id FROM Reserva  Where fkCancha  = @pId AND Fecha = @pFecha)")
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

  static reservar = async (Id, reserva) => {
    const {
      NumeroReserva,
      PrecioSeña,
      Fecha,
      NumeroTarjeta,
      TipoTarjeta,
      fkUsuario,
      fkCancha
    } = reserva
    let returnEntity = null;
    console.log("Estoy en reservar cancha", reserva);
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("NumeroReserva", sql.Int, NumeroReserva)
        .input("PrecioSeña", sql.Int, PrecioSeña)
        .input("Fecha", sql.Date, Fecha)
        .input("NumeroTarjeta", sql.NVarChar(4000), NumeroTarjeta)
        .input("TipoTarjeta", sql.NVarChar, TipoTarjeta)
        .input("fkUsuario", sql.Int, fkUsuario)
        .input("fkCancha", sql.Int, Id)
        .query(
          "INSERT INTO Reserva (NumeroReserva, PrecioSeña, Fecha,  NumeroTarjeta, TipoTarjeta, fkUsuario, fkCancha) VALUES (@NumeroReserva, @PrecioSeña, @Fecha, @NumeroTarjeta, @TipoTarjeta, @fkUsuario, @fkCancha); SELECT SCOPE_IDENTITY() AS UltimoId;"
        );
        returnEntity =  result.recordset[0].UltimoId
        console.log("result", result)
    }
    catch (error) {
      console.log(error);
    }
    return returnEntity;
  }

  static reservarHorario = async(IdR, IdH) =>{
    let returnEntity = null;
    console.log("IDH",IdH)
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("fkReserva", sql.Int, IdR)
        .input("fkHorario", sql.Int, IdH)
        .query(
          "INSERT INTO ReservaXHorario (fkReserva, fkHorario) VALUES (@fkReserva, @fkHorario)"

        );

    
    }
    catch (error) {
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
export class Horario {
  static getAllHorarios = async () =>{
    let returnEntity = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool
      .request()
      .query("Select Id, FORMAT(Cast(Hora as DateTime), N'HH\:mm') As Hora from Horario");
      returnEntity = result.recordsets[0];
      console.log("returnennenene",returnEntity)
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };


}