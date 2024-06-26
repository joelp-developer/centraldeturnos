USE [CentraldeTurnos]
GO
/****** Object:  Table [dbo].[Medico]    Script Date: 25/6/2024 19:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medico](
	[IdMedico] [bigint] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Apellido] [nvarchar](50) NULL,
	[idEspecialidad] [bigint] NULL,
	[Email] [nvarchar](50) NULL,
	[Telefono] [nvarchar](50) NULL,
 CONSTRAINT [PK_Medico] PRIMARY KEY CLUSTERED 
(
	[IdMedico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicoEspecialidad]    Script Date: 25/6/2024 19:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicoEspecialidad](
	[IdEspecialidad] [bigint] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
 CONSTRAINT [PK_MedicoEspecialidad] PRIMARY KEY CLUSTERED 
(
	[IdEspecialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoUsaurio]    Script Date: 25/6/2024 19:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoUsaurio](
	[idTipoUsuario] [bigint] IDENTITY(1,1) NOT NULL,
	[tipo] [nchar](100) NULL,
 CONSTRAINT [PK_TipoUsaurio] PRIMARY KEY CLUSTERED 
(
	[idTipoUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Turnos]    Script Date: 25/6/2024 19:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Turnos](
	[IdTurno] [bigint] IDENTITY(1,1) NOT NULL,
	[Fecha] [nvarchar](50) NULL,
	[Hora] [nvarchar](50) NULL,
	[IdUsuario] [bigint] NULL,
	[IdMedico] [bigint] NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_Turnos] PRIMARY KEY CLUSTERED 
(
	[IdTurno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 25/6/2024 19:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [bigint] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Apellido] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Telefono] [nvarchar](50) NULL,
	[Contraseña] [nvarchar](100) NULL,
	[IdTipoUsuario] [bigint] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Medico] ON 

INSERT [dbo].[Medico] ([IdMedico], [Nombre], [Apellido], [idEspecialidad], [Email], [Telefono]) VALUES (1, N'medico', N'medicodoc', 1, N'medico@yopmail.com', N'51264719')
INSERT [dbo].[Medico] ([IdMedico], [Nombre], [Apellido], [idEspecialidad], [Email], [Telefono]) VALUES (2, N'medico2', N'medico2', 2, N'medico1@yopmail.com', N'51264719')
INSERT [dbo].[Medico] ([IdMedico], [Nombre], [Apellido], [idEspecialidad], [Email], [Telefono]) VALUES (3, N'medico3', N'medico3', 3, N'medico3@yopmail.com', N'51264719')
SET IDENTITY_INSERT [dbo].[Medico] OFF
GO
SET IDENTITY_INSERT [dbo].[MedicoEspecialidad] ON 

INSERT [dbo].[MedicoEspecialidad] ([IdEspecialidad], [Descripcion]) VALUES (1, N'Pediatra')
INSERT [dbo].[MedicoEspecialidad] ([IdEspecialidad], [Descripcion]) VALUES (2, N'Clinico')
INSERT [dbo].[MedicoEspecialidad] ([IdEspecialidad], [Descripcion]) VALUES (3, N'Dermatologo')
INSERT [dbo].[MedicoEspecialidad] ([IdEspecialidad], [Descripcion]) VALUES (4, N'Cardiologia')
INSERT [dbo].[MedicoEspecialidad] ([IdEspecialidad], [Descripcion]) VALUES (5, N'Odontologia')
SET IDENTITY_INSERT [dbo].[MedicoEspecialidad] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoUsaurio] ON 

INSERT [dbo].[TipoUsaurio] ([idTipoUsuario], [tipo]) VALUES (1, N'Medico                                                                                              ')
INSERT [dbo].[TipoUsaurio] ([idTipoUsuario], [tipo]) VALUES (2, N'Usuario                                                                                             ')
SET IDENTITY_INSERT [dbo].[TipoUsaurio] OFF
GO
SET IDENTITY_INSERT [dbo].[Turnos] ON 

INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (2, N'2024-06-21', N'09:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (3, N'2024-06-20', N'09:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (4, N'2024-06-21', NULL, 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (5, N'2024-06-22', NULL, 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (6, N'2024-06-22', NULL, 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (7, N'2024-06-22', NULL, 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (8, N'2024-06-22T03:00:00.000Z', NULL, 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (9, N'2024-06-22', N'09:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (10, N'2024-06-22', N'10:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (11, N'2024-06-22', N'11:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (12, N'2024-06-22', N'11:00', 1, 2, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (13, N'2024-06-22', N'12:00', 1, 2, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (14, N'2024-06-24', N'09:00', 1, 1, N'Cerrado')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (15, N'2024-06-25', N'09:00', 1, 1, N'Atendiendo')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (16, N'2024-06-24', N'10:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (17, N'2024-06-24', N'12:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (18, N'2024-06-25', N'11:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (19, N'2024-06-25', N'13:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (20, N'2024-06-25', N'12:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (21, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (22, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (23, N'2024-06-25', N'17:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (24, N'2024-06-25', N'14:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (25, N'2024-06-25', N'18:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (26, N'2024-06-26', N'14:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (27, N'2024-06-27', N'12:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (28, N'2024-06-26', N'12:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (29, N'2024-06-25', N'10:00', 1, 1, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (30, N'2024-06-25', N'12:00', 1, 2, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (31, N'2024-06-25', N'12:00', 1, 3, N'Abierto')
INSERT [dbo].[Turnos] ([IdTurno], [Fecha], [Hora], [IdUsuario], [IdMedico], [Estado]) VALUES (32, N'2024-06-24', N'16:00', 1, 1, N'Abierto')
SET IDENTITY_INSERT [dbo].[Turnos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [Nombre], [Apellido], [Email], [Telefono], [Contraseña], [IdTipoUsuario]) VALUES (1, N'joel', N'pereiro', N'joel@yopmail.com', N'51264719', N'$2a$10$odbLUxulZL10.9E5daRmY./7DvUfUccB8ATqCxKuE8.nyjSRLeope', 2)
INSERT [dbo].[Usuario] ([idUsuario], [Nombre], [Apellido], [Email], [Telefono], [Contraseña], [IdTipoUsuario]) VALUES (2, N'medico', N'medicodoc', N'medico@yopmail.com', N'51264719', N'$2a$10$68ZpkfAcryNCBSjEHZuTZ.IBtXb9CKJGxT6HLlpSuyzPE6ziNYDr6', 1)
INSERT [dbo].[Usuario] ([idUsuario], [Nombre], [Apellido], [Email], [Telefono], [Contraseña], [IdTipoUsuario]) VALUES (3, N'medico2', N'medico2', N'medico1@yopmail.com', N'51264719', N'$2a$10$Iu2KooyVLahjXjEKB4RI3OI1paAW5kWEkZvS0hM16PZYmuc.UN2Uu', 1)
INSERT [dbo].[Usuario] ([idUsuario], [Nombre], [Apellido], [Email], [Telefono], [Contraseña], [IdTipoUsuario]) VALUES (4, N'medico3', N'medico3', N'medico3@yopmail.com', N'51264719', N'$2a$10$fvflEYtrnjisVhftf1EuY.iXBgzzVv3Z2ljQg/gYAZzhSTdTuPFXi', 1)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Medico]  WITH CHECK ADD  CONSTRAINT [FK_Medico_Medico] FOREIGN KEY([idEspecialidad])
REFERENCES [dbo].[MedicoEspecialidad] ([IdEspecialidad])
GO
ALTER TABLE [dbo].[Medico] CHECK CONSTRAINT [FK_Medico_Medico]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_TipoUsaurio] FOREIGN KEY([IdTipoUsuario])
REFERENCES [dbo].[TipoUsaurio] ([idTipoUsuario])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_TipoUsaurio]
GO
