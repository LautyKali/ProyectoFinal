USE [master]
GO
/****** Object:  Database [CancherosDB]    Script Date: 29/11/2023 23:12:57 ******/
CREATE DATABASE [CancherosDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CancherosDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CancherosDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CancherosDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CancherosDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [CancherosDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CancherosDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CancherosDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CancherosDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CancherosDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CancherosDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CancherosDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [CancherosDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CancherosDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CancherosDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CancherosDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CancherosDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CancherosDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CancherosDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CancherosDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CancherosDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CancherosDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CancherosDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CancherosDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CancherosDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CancherosDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CancherosDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CancherosDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CancherosDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CancherosDB] SET RECOVERY FULL 
GO
ALTER DATABASE [CancherosDB] SET  MULTI_USER 
GO
ALTER DATABASE [CancherosDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CancherosDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CancherosDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CancherosDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CancherosDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CancherosDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [CancherosDB] SET QUERY_STORE = OFF
GO
USE [CancherosDB]
GO
/****** Object:  User [Canchero]    Script Date: 29/11/2023 23:12:57 ******/
CREATE USER [Canchero] FOR LOGIN [Canchero] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Canchero]
GO
/****** Object:  Table [dbo].[Cancha]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cancha](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](4000) NOT NULL,
	[Foto] [nvarchar](4000) NULL,
	[Deporte] [nvarchar](4000) NOT NULL,
	[EnReparacion] [bit] NOT NULL,
	[CantPersonas] [int] NOT NULL,
	[TipoPiso] [nvarchar](4000) NOT NULL,
	[Precio] [float] NOT NULL,
	[fkLugar] [int] NOT NULL,
 CONSTRAINT [PK_Cancha] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Horario]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Horario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Hora] [time](7) NOT NULL,
 CONSTRAINT [PK_Horario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lugar]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lugar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](4000) NOT NULL,
	[Ubicacion] [nvarchar](4000) NOT NULL,
	[Zona] [nvarchar](4000) NOT NULL,
	[Foto] [nvarchar](4000) NULL,
	[fkDueño] [int] NOT NULL,
 CONSTRAINT [PK_Lugar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reserva]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reserva](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumeroReserva] [int] NOT NULL,
	[PrecioSeña] [float] NOT NULL,
	[Fecha] [date] NOT NULL,
	[NumeroTarjeta] [nvarchar](4000) NOT NULL,
	[TipoTarjeta] [nvarchar](4000) NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkCancha] [int] NOT NULL,
 CONSTRAINT [PK_Reserva] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReservaXHorario]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReservaXHorario](
	[fkReserva] [int] NOT NULL,
	[fkHorario] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 29/11/2023 23:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](4000) NOT NULL,
	[Telefono] [nvarchar](4000) NULL,
	[Mail] [nvarchar](4000) NOT NULL,
	[Contrasenna] [nvarchar](4000) NOT NULL,
	[Foto] [nvarchar](4000) NULL,
	[fkRol] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cancha] ON 

INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (32, N'Albert', N'C:\fakepath\WhatsApp Image 2023-11-20 at 7.08.02 PM.jpeg', N'Futbol', 1, 12, N'Cemento', 20000, 2)
SET IDENTITY_INSERT [dbo].[Cancha] OFF
GO
SET IDENTITY_INSERT [dbo].[Horario] ON 

INSERT [dbo].[Horario] ([id], [Hora]) VALUES (1, CAST(N'10:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (2, CAST(N'11:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (3, CAST(N'12:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (4, CAST(N'13:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (5, CAST(N'14:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (6, CAST(N'15:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (7, CAST(N'16:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (8, CAST(N'17:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (9, CAST(N'18:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (10, CAST(N'19:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (11, CAST(N'20:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (12, CAST(N'21:00:00' AS Time))
INSERT [dbo].[Horario] ([id], [Hora]) VALUES (13, CAST(N'22:00:00' AS Time))
SET IDENTITY_INSERT [dbo].[Horario] OFF
GO
SET IDENTITY_INSERT [dbo].[Lugar] ON 

INSERT [dbo].[Lugar] ([Id], [Nombre], [Ubicacion], [Zona], [Foto], [fkDueño]) VALUES (2, N'Club del pasaje', N'Del barco centenera 950', N'Caballito', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxy7X5QY4nIwfk-4IG7n5XsdDSAi1x72YN2c3L92_PcI4z08ol2hLQ1Z7aWtz_lt44AZg&usqp=CAU', 7)
INSERT [dbo].[Lugar] ([Id], [Nombre], [Ubicacion], [Zona], [Foto], [fkDueño]) VALUES (5, N'Caballito Norte', N'Av. Avellaneda 1423', N'Caballito', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKYr0Y64WZbGu-8nUH0KfK4Ue6VMQKu4VB0eliHGLX-1b2ZWAHi0zdqFA3RorzmhzeB8&usqp=CAU', 11)
SET IDENTITY_INSERT [dbo].[Lugar] OFF
GO
SET IDENTITY_INSERT [dbo].[Reserva] ON 

INSERT [dbo].[Reserva] ([Id], [NumeroReserva], [PrecioSeña], [Fecha], [NumeroTarjeta], [TipoTarjeta], [fkUsuario], [fkCancha]) VALUES (63, 430240, 10000, CAST(N'2023-11-02' AS Date), N'44334343', N'Credito', 47, 32)
INSERT [dbo].[Reserva] ([Id], [NumeroReserva], [PrecioSeña], [Fecha], [NumeroTarjeta], [TipoTarjeta], [fkUsuario], [fkCancha]) VALUES (66, 870650, 10000, CAST(N'2023-11-30' AS Date), N'312311', N'Credito', 47, 30)
SET IDENTITY_INSERT [dbo].[Reserva] OFF
GO
INSERT [dbo].[ReservaXHorario] ([fkReserva], [fkHorario]) VALUES (63, 2)
INSERT [dbo].[ReservaXHorario] ([fkReserva], [fkHorario]) VALUES (66, 3)
GO
SET IDENTITY_INSERT [dbo].[Rol] ON 

INSERT [dbo].[Rol] ([Id], [Rol]) VALUES (1, N'Admin')
INSERT [dbo].[Rol] ([Id], [Rol]) VALUES (2, N'Canchero')
INSERT [dbo].[Rol] ([Id], [Rol]) VALUES (3, N'Usuario')
SET IDENTITY_INSERT [dbo].[Rol] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Nombre], [Telefono], [Mail], [Contrasenna], [Foto], [fkRol]) VALUES (7, N'Ricardo', N'1135657556', N'ricarditox@gmail.com', N'soygay', NULL, 2)
INSERT [dbo].[Usuario] ([Id], [Nombre], [Telefono], [Mail], [Contrasenna], [Foto], [fkRol]) VALUES (11, N'Mr.Centenera', N'2342343214', N'centenera@gmail.com', N'CHINO2020', NULL, 2)
INSERT [dbo].[Usuario] ([Id], [Nombre], [Telefono], [Mail], [Contrasenna], [Foto], [fkRol]) VALUES (12, N'Lauty', N'11111111111', N'lautikali@gmail.com', N'123', NULL, 2)
INSERT [dbo].[Usuario] ([Id], [Nombre], [Telefono], [Mail], [Contrasenna], [Foto], [fkRol]) VALUES (47, N'Albert', N'1231231', N'alberto@gmail.com', N'123', NULL, 3)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Cancha]  WITH CHECK ADD  CONSTRAINT [FK_Cancha_Lugar] FOREIGN KEY([fkLugar])
REFERENCES [dbo].[Lugar] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cancha] CHECK CONSTRAINT [FK_Cancha_Lugar]
GO
ALTER TABLE [dbo].[Lugar]  WITH CHECK ADD  CONSTRAINT [FK_Lugar_Usuario] FOREIGN KEY([fkDueño])
REFERENCES [dbo].[Usuario] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Lugar] CHECK CONSTRAINT [FK_Lugar_Usuario]
GO
ALTER TABLE [dbo].[Reserva]  WITH NOCHECK ADD  CONSTRAINT [FK_Reserva_Cancha1] FOREIGN KEY([fkCancha])
REFERENCES [dbo].[Cancha] ([Id])
GO
ALTER TABLE [dbo].[Reserva] NOCHECK CONSTRAINT [FK_Reserva_Cancha1]
GO
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_Usuario] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuario] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_Usuario]
GO
ALTER TABLE [dbo].[ReservaXHorario]  WITH CHECK ADD  CONSTRAINT [FK_ReservaXHorario_Horario] FOREIGN KEY([fkHorario])
REFERENCES [dbo].[Horario] ([id])
GO
ALTER TABLE [dbo].[ReservaXHorario] CHECK CONSTRAINT [FK_ReservaXHorario_Horario]
GO
ALTER TABLE [dbo].[ReservaXHorario]  WITH CHECK ADD  CONSTRAINT [FK_ReservaXHorario_Reserva] FOREIGN KEY([fkReserva])
REFERENCES [dbo].[Reserva] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ReservaXHorario] CHECK CONSTRAINT [FK_ReservaXHorario_Reserva]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Rol] FOREIGN KEY([fkRol])
REFERENCES [dbo].[Rol] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Rol]
GO
USE [master]
GO
ALTER DATABASE [CancherosDB] SET  READ_WRITE 
GO
