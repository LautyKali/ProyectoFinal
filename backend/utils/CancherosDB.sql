USE [master]
GO
/****** Object:  Database [CancherosDB]    Script Date: 29/5/2023 11:24:49 ******/
CREATE DATABASE [CancherosDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CancherosDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\CancherosDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CancherosDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\CancherosDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
EXEC sys.sp_db_vardecimal_storage_format N'CancherosDB', N'ON'
GO
ALTER DATABASE [CancherosDB] SET QUERY_STORE = OFF
GO
USE [CancherosDB]
GO
/****** Object:  User [alumno]    Script Date: 29/5/2023 11:24:49 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Admin]    Script Date: 29/5/2023 11:24:49 ******/
CREATE USER [Admin] FOR LOGIN [Admin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Admin]
GO
/****** Object:  Table [dbo].[Cancha]    Script Date: 29/5/2023 11:24:49 ******/
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
	[Precio] [int] NOT NULL,
	[fkLugar] [int] NOT NULL,
 CONSTRAINT [PK_Cancha] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CanchasXHorario]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CanchasXHorario](
	[fkCancha] [int] NOT NULL,
	[fkHorario] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Horarios]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Horarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Horario] [time](4) NOT NULL,
 CONSTRAINT [PK_Horarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lugar]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lugar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](4000) NOT NULL,
	[Ubicacion] [varchar](4000) NOT NULL,
	[Zona] [varchar](4000) NOT NULL,
	[Foto] [varchar](4000) NULL,
	[fkDueño] [int] NOT NULL,
 CONSTRAINT [PK_Lugar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reserva]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reserva](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumeroReserva] [int] NOT NULL,
	[PrecioSeña] [float] NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkCancha] [int] NOT NULL,
 CONSTRAINT [PK_Reserva] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 29/5/2023 11:24:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](4000) NOT NULL,
	[Telefono] [varchar](4000) NULL,
	[Mail] [varchar](4000) NOT NULL,
	[Contrasenna] [varchar](4000) NOT NULL,
	[Foto] [varchar](4000) NULL,
	[fkRol] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cancha] ON 

INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (8, N'cancah1', NULL, N'fulbo', 0, 12, N'cemento', 4000, 2)
INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (17, N'cancha2', NULL, N'basket', 1, 15, N'cemento', 6000, 2)
INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (18, N'cancha33333', NULL, N'fulbo', 0, 10, N'caucho', 7000, 2)
INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (19, N'martin witlis', NULL, N'intento de futbol', 1, 5, N'davo', 9, 2)
INSERT [dbo].[Cancha] ([Id], [Nombre], [Foto], [Deporte], [EnReparacion], [CantPersonas], [TipoPiso], [Precio], [fkLugar]) VALUES (20, N'cancah8', NULL, N'fulbo', 0, 22, N'pasto', 4000, 2)
SET IDENTITY_INSERT [dbo].[Cancha] OFF
GO
SET IDENTITY_INSERT [dbo].[Lugar] ON 

INSERT [dbo].[Lugar] ([Id], [Nombre], [Ubicacion], [Zona], [Foto], [fkDueño]) VALUES (2, N'Club del pasaje', N'Del barco centenera 950', N'caballito', NULL, 7)
SET IDENTITY_INSERT [dbo].[Lugar] OFF
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
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[CanchasXHorario]  WITH CHECK ADD  CONSTRAINT [FK_CanchasXHorario_Cancha] FOREIGN KEY([fkCancha])
REFERENCES [dbo].[Cancha] ([Id])
GO
ALTER TABLE [dbo].[CanchasXHorario] CHECK CONSTRAINT [FK_CanchasXHorario_Cancha]
GO
ALTER TABLE [dbo].[CanchasXHorario]  WITH CHECK ADD  CONSTRAINT [FK_CanchasXHorario_Horarios] FOREIGN KEY([fkHorario])
REFERENCES [dbo].[Horarios] ([Id])
GO
ALTER TABLE [dbo].[CanchasXHorario] CHECK CONSTRAINT [FK_CanchasXHorario_Horarios]
GO
ALTER TABLE [dbo].[Lugar]  WITH CHECK ADD  CONSTRAINT [FK_Lugar_Usuario] FOREIGN KEY([fkDueño])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Lugar] CHECK CONSTRAINT [FK_Lugar_Usuario]
GO
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_Cancha] FOREIGN KEY([fkCancha])
REFERENCES [dbo].[Cancha] ([Id])
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_Cancha]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Rol] FOREIGN KEY([fkRol])
REFERENCES [dbo].[Rol] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Rol]
GO
USE [master]
GO
ALTER DATABASE [CancherosDB] SET  READ_WRITE 
GO
