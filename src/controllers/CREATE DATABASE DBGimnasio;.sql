CREATE DATABASE DBGimnasio;

-- SCRIPT Y POBLACION
CREATE TABLE Persona(
	Id SERIAL Primary key ,
	Nombre VARCHAR(35) NOT NULL,
	Apellido VARCHAR(35) NOT NULL,
	CI int,
	Telefono VARCHAR(20),
	Fecha_Nacimiento DATE
);

CREATE TABLE ROL(
	ID	SERIAL Primary key,
	Nombre VARCHAR(30) NOT NULL,
	Activo BOOLEAN NOT NULL
);


CREATE TABLE Funcionalidad(
	ID SERIAL PRIMARY KEY,
	Nombre VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(100) NOT NULL,
	Activo BOOLEAN NOT NULL
);

CREATE TABLE Permiso_Rol(
	Id_Funcionalidad INT NOT NULL,
	ID_Rol INT NOT NULL,
	PRIMARY KEY (Id_Funcionalidad,Id_Rol),
	FOREIGN KEY(Id_Funcionalidad) REFERENCES Funcionalidad(ID)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Rol) REFERENCES Rol(ID)
	ON update CASCADE
	ON delete CASCADE
);


CREATE TABLE Usuario(
	Id_Persona INT NOT NULL PRIMARY KEY,
	Username VARCHAR(30) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	Id_Rol INT NOT NULL,
	Direccion VARCHAR(50),
	Activo Boolean NOT NULL,
	FOREIGN KEY(Id_Persona) REFERENCES Persona(Id)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Rol) REFERENCES Rol(Id)
	ON update CASCADE
	ON delete CASCADE

);


CREATE TABLE Bitacora(
	ID SERIAL PRIMARY KEY,
	Fecha_Hora TIMESTAMP NOT NULL,
	Id_Usuario INT NOT NULL,
	FOREIGN KEY(Id_Usuario) REFERENCES Usuario(Id_Persona)
	ON update CASCADE
	ON delete CASCADE
);



CREATE TABLE Entrenador(
	ID_Usuario INT NOT NULL PRIMARY KEY,
	FOREIGN KEY(Id_Usuario) REFERENCES Usuario(Id_Persona)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Disciplina(
	Cod VARCHAR(20) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(100),
	Precio DECIMAL(10,2) NOT NULL,
	Activo BOOLEAN NOT NULL
);

CREATE TABLE Entrenador_Disciplina(
	Id_Entrenador INT NOT NULL,
	Cod_Disciplina VARCHAR(20) NOT NULL ,
	PRIMARY KEY(Id_Entrenador,Cod_Disciplina),
	FOREIGN KEY(Id_Entrenador) REFERENCES Entrenador(ID_Usuario)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Cod_Disciplina) REFERENCES Disciplina(Cod)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Horario(
	Id SERIAL PRIMARY KEY,
	Hora_Inicio TIME NOT NULL,
	Hora_Fin TIME NOT NULL,
	Dia VARCHAR(15) not null
);


CREATE TABLE Disciplina_Horario(
	Cod_Disciplina VARCHAR(20) NOT NULL,
	Id_Horario INT NOT NULL,
	PRIMARY KEY(Cod_Disciplina,Id_Horario),
	FOREIGN KEY(Cod_Disciplina) REFERENCES Disciplina(Cod)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Horario) REFERENCES Horario(Id)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Cliente(
	Id_Persona INT NOT NULL PRIMARY KEY,
	Activo BOOLEAN NOT NULL,
	FOREIGN KEY(Id_Persona) REFERENCES Persona(Id)
	ON update CASCADE
	ON delete CASCADE
);


CREATE TABLE Pago(
	Id SERIAL PRIMARY KEY,
	Tipo VARCHAR(20) NOT NULL,
	Monto DECIMAL(10,2) NOT NULL
);

CREATE TABLE Membresia(
	Id SERIAL PRIMARY KEY,
	Fecha_Inicio DATE NOT NULL,
	Fecha_Fin DATE NOT NULL,
	Id_Cliente INT NOT NULL,
	Id_Pago INT NOT NULL,
	Id_Usuario INT NOT NULL,
	FOREIGN KEY(Id_Cliente) REFERENCES Cliente(Id_Persona)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Pago) REFERENCES Pago(Id)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Usuario) REFERENCES Usuario(Id_Persona)
	ON update CASCADE
	ON delete CASCADE
);


CREATE TABLE Disciplina_Membresia(
	Cod_Disciplina VARCHAR(20) NOT NULL,
	Id_Membresia INT NOT NULL,
	PRIMARY KEY(Cod_Disciplina,Id_Membresia),
	FOREIGN KEY(Cod_Disciplina) REFERENCES Disciplina(Cod)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Membresia) REFERENCES Membresia(Id)
	ON update CASCADE
	ON delete CASCADE
);


CREATE TABLE Proveedor(
	Id SERIAL PRIMARY KEY,
	Empresa VARCHAR(80) NOT NULL,
	Telefono VARCHAR(20)
);




CREATE TABLE Categoria(
	Id SERIAL PRIMARY KEY,
	Nombre VARCHAR(20) NOT NULL,
	Descripcion VARCHAR(100)
);

CREATE TABLE Nota_de_Entrada(
	Id SERIAL PRIMARY KEY,
	Id_Usuario INT NOT NULL,
	Id_Proveedor INT NOT NULL,
	Monto DECIMAL(10,2) NOT NULL,
	FOREIGN KEY(Id_Usuario) REFERENCES Usuario(Id_Persona)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Proveedor) REFERENCES Proveedor(Id)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Producto(
	Cod SERIAL NOT NULL PRIMARY KEY,
	Nombre VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(100) ,
	Precio DECIMAL(10,2),
	Id_Categoria INT NOT NULL,
	FOREIGN KEY(Id_Categoria) REFERENCES Categoria(Id)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Inventario(
	Id SERIAL PRIMARY KEY,
	Cantidad INT NOT NULL,
	Id_Producto INT NOT NULL,
	FOREIGN KEY(Id_Producto) REFERENCES Producto(Cod)
	ON update CASCADE
	ON delete CASCADE
);
CREATE TABLE Detalle_Entrada(
	Id_Nota_Entrada INT NOT NULL,
	Cod_Producto INT NOT NULL,
	Cantidad INT NOT NULL,
	Precio DECIMAL(10,2) NOT NULL,
	Fecha DATE NOT NULL,
	FOREIGN KEY(Id_Nota_Entrada) REFERENCES Nota_de_Entrada(Id)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Cod_Producto) REFERENCES Producto(Cod)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Factura(
	Nit SERIAL PRIMARY KEY,
	Monto DECIMAL(10,2) NOT NULL,
	Id_Usuario INT NOT NULL,
	Id_Cliente INT NOT NULL,
	FOREIGN KEY(Id_Usuario) REFERENCES Usuario(Id_Persona)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Id_Cliente) REFERENCES Cliente(Id_Persona)
	ON update CASCADE
	ON delete CASCADE
);

CREATE TABLE Detalle_Factura(
	Cod_Producto INT NOT NULL,
	Nit_Factura INT NOT NULL,
	Cantidad INT NOT NULL,
	Precio DECIMAL(10,2) NOT NULL,
	Fecha Date NOT NULL,
	FOREIGN KEY(Cod_Producto) REFERENCES Producto(Cod)
	ON update CASCADE
	ON delete CASCADE,
	FOREIGN KEY(Nit_Factura) REFERENCES Factura(Nit)
	ON update CASCADE
	ON delete CASCADE
);

INSERT INTO Persona (Nombre, Apellido, CI, Telefono, Fecha_Nacimiento) VALUES
('Wilson', 'Arebalo Baldiviezo', 4550234, '69445098', '1984-11-19'),
('Pepe ', 'Cabrera', 9894199, '70022327', '1998-02-07'), 
('Santiago', 'Cardona Lara', 7055031, '77050092', '1988-03-15'),
('Sofia Raquel', 'Soliz Cruz', 6987439, '60000597', '1992-12-03'),
('Jose Elias', 'Cardenas Angulo', 3897192, '78191662', '1989-06-17'),
('Carlos Andres', 'Plata Saucedo', 7654321, '78581746', '1997-06-29'),
('Brayan', 'Flores Castro', 8765432, '77838140', '1992-08-30'),
('Miguel Angel ', 'Rojas Irusta', 2345678, '79803692', '1975-12-31'),
('Hans Alejandro', 'Menacho Sosa', 6754321, '78154606', '1991-10-14'),
('Luz Clara', 'Panoso Villazon', 4321987, '75686215', '1996-02-11'),
('Darling', 'Valencia Pereira', 5678912, '62029578', '1993-04-20'),
('Jorge David', 'Antelo Porcel', 1987654, '65059590', '1984-11-12'),
('Margarita', 'Montaño Pizarro', 6950547, '63420320', '1988-05-28'),
('Ana Luisa', 'Barba Gutierrez', 13784954, '72695048', '2002-01-29'),
('Carla Maria', 'Saucedo Hurtado', 13784953, '75091105', '2000-03-03'),
('Ana Brenda', 'Solis Daza', 12784034, '69033001', '2001-09-14'),
('Miriam Lenny', 'Vargas Mendoza', 12054749, '76336624', '1999-12-24'),
('Luis Eduardo', 'Quispe Vasquez', 10283495, '77816888', '2003-06-19'),
('Lorenzo', 'Rioja Rios', 11432491, '67359705', '2002-08-30'),
('Jose Daniel', 'Hinojosa Torrez', 10562343, '63486616', '2003-01-03'),
('Kaleb Aaron', 'Flores Mansilla', 11673298, '75579360', '2000-06-09'),
('Cristian', 'Vaca Justiniano', 12503271, '68303159', '2003-03-23');
select * from Persona

INSERT INTO ROL(Nombre, activo) VALUES
('ADMINISTRADOR GENERAL', true),
('ADMINISTRADOR', true),
('ATENCION AL CLIENTE', true),
('ENTRENADOR', true);

INSERT INTO Funcionalidad (Nombre, Descripcion, activo) VALUES
('PEDIDO.VER','PERMITE VER TODO LOS PEDIDOS Y SUS ESTADOS',true),
('PEDIDO.CREAR','PERMITE CREAR NUEVOS PEDIDOS', true),
('PEDIDO.MODIFICAR','PERMITE MODIFICAR LOS PEDIDOS CREADOS', true),
('PEDIDO.ELIMINAR','PERMITE ELIMINAR UN PEDIDO', true),
('VESTIMENTA.VER','PERMITE VER LAS VESTIMENTAS DISPONIBLES', true),
('VESTIMENTA.CREAR','PERMITE AÑADIR UNA NUEVA VESTIMENTA', true),
('VESTIMENTA.MODIFICAR','PERMITE MODIFICAR LOS DATOS DE UNA VESTIMENTA', true),
('VESTIMENTA.ELIMINAR','PERMITE ELIMINAR UNA VESTIMENTA', true);

SELECT *
FROM Rol;

INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES
(7,2),
(3,3),
(1,1);

3974000000175

006bc
391 branch

select *
from Persona

INSERT INTO Usuario (Id_Persona,Username, Password, Id_Rol, Direccion, Activo) VALUES
(1,'Pedrito19', 'pedroVaca123',  2, 'Av. Banzer #2556',true),
(2,'Raquelita69', 'Rq456',  3, 'Av. Guapay #789',true),
(3,'Miguelito01', 'Gueto89', 1, 'Calle Junín #876',false),
(4,'Carlitos32', 'Crls23', 4, 'Av. Buenos Aires #321',true),
(5,'Darling2', 'drlng88', 4, 'Calle Ayacucho #2345',true),
(6,'cristiancito', 'BB123', 4, 'Barrio Primavera C/ Los Lirios',false),
(7,'edu45', '3467e', 4, 'Barrio Juana Azurduy',true);
UPDATE Usuario
SET Id_Rol=4
WHERE Id_Persona=6
select *
from Usuario

INSERT INTO Bitacora (Fecha_Hora, Id_Usuario) VALUES
('2022-09-12', 1),
('2023-02-03', 2),
('2023-02-03', 2),
('2023-09-01', 1);
UPDATE Bitacora
SET Fecha_Hora='2023-09-12'
where Id=1


select *
from Bitacora
INSERT INTO Entrenador (Id_Usuario) VALUES
(4),
(5),
(6),
(7);


INSERT INTO Disciplina (Cod, Nombre, Descripcion, Precio, Activo) VALUES
('001', 'Boxeo', 'Clases de boxeo para todos los niveles', 25.00, true),
('002', 'Spinning', 'Clases de spinning para mejorar la resistencia', 20.00, true),
('003', 'Kick Boxing', 'Clases de kick boxing para mejorar la fuerza y resistencia', 30.00, true),
('004', 'Aparatos', 'Uso de equipos de gimnasio para entrenamiento de fuerza', 40.00, true),
('005', 'Crossfit', 'Entrenamiento funcional de alta intensidad', 35.00, true),
('006', 'Zumba', 'Clases de baile energéticas para quemar calorías', 15.00, true);

select * from Disciplina
INSERT INTO Entrenador_Disciplina (Id_Entrenador, Cod_Disciplina) VALUES
(4, '002'),
(5, '001'),
(6, '006'),
(7, '003'),
(4, '004');

INSERT INTO Horario (Hora_Inicio,Hora_Fin, Dia) VALUES
('16:00:00', '17:30:00', 'Miércoles'),
('10:00:00', '11:30:00', 'Jueves'),
('13:30:00', '15:00:00', 'Viernes'),
('11:00:00', '12:30:00', 'Sábado'),
('09:00:00', '10:30:00', 'Lunes'),
('14:00:00', '15:30:00', 'Martes');

select * from Disciplina
INSERT INTO Disciplina_Horario (Cod_Disciplina,Id_Horario) VALUES
('001', 1),
('006', 2),
('004', 3),
('002', 4),
('005', 5),
('003', 6);

select * from disciplina

INSERT INTO Cliente (Id_Persona,Activo) VALUES
(9, true),
(10, false),
(11, false),
(12, true),
(13, true),
(14, true),
(15, true),
(16, false),
(17, true),
(18, true);

INSERT INTO Pago (Tipo,Monto) VALUES
('Tarjeta de crédito', 50.00),
('Transferencia', 75.00),
('Efectivo', 30.00);

select* from Pago

INSERT INTO Membresia (Fecha_Inicio, Fecha_Fin, Id_Cliente, Id_Pago, Id_Usuario) VALUES
('2023-01-01', '2023-06-01', 9, 1, 4),
('2023-10-15', '2023-11-15', 10, 3, 5),
('2023-09-10', '2023-12-10', 11, 3, 6),
('2023-04-15', '2023-05-15', 12, 2, 7);
UPDATE Membresia
SET Id_Cliente =14
WHERE ID = 3;

select * from Cliente
INSERT INTO Disciplina_Membresia (Cod_Disciplina, Id_Membresia) VALUES
('001', 1),
('003', 3),
('005', 4);

INSERT INTO Proveedor (Empresa,Telefono) VALUES
('NutreXplosion', '78143744'),
('New Force (Suplementos & Proteinas)', '76331485'),
('Suplementos Natural Diet', '61344464');

select * from Categoria
INSERT INTO Categoria (Nombre, Descripcion) VALUES
('Proteínas', 'Ayuda  para la recuperación muscular'),
('Quema Grasa', 'Ayuda a la pérdida de peso'),
('Creatina', 'Ayuda aumentar de tamaño y de fuerza'),
('Pre Entreno', 'Batidos para la recuperación muscular'),
('Aminoacidos', 'Ayuda al desarrollo muscular sostenido'),
('Bebidas isotónicas', 'Bebidas para reponer electrolitos');

 
select * from Producto
INSERT INTO Producto (Nombre, Descripcion, Precio, ID_categoria) VALUES
---proteinas
('CARNIVOR', 'CHOCOLATE SAMPLE PACKET / 1 SVG', 150, 1),
('LENNY & LARRY’S BOSS COOKIES', 'Galleta de proteína horneada', 110, 1),
---Quema grasas--
('ADRENALINE DRIVE', 'es una novedosa Menta Energética', 175, 2),
('Apple Cider Vinegar', 'apoya la digestion y la perdida de peso', 57, 2),
-----Creatina
('CREATINA HCI+', 'Aumenta los músculos y la potencia', 220, 3),
('CREATINE DECANATE 300GR', 'Aumenta de tamaño y de fuerza', 260, 3),
----preentreno
('NITRAFLEX 30SERV', 'es una fórmula de preentrenamiento', 285, 4),
('TESTROL GOLD 60 GAT-097CT', 'Refuerzo de testosterona masculino', 110, 4),
----aminnoacidos
('GAT AGMATINE 75G', 'Mejora síntesis de óxido nítrico,', 100, 5),
('GAT Beta Alanine 200g', 'Aumenta niveles de carnosina muscular', 117, 5),
---Isotonicas--
('Gatorade', 'ayuda en hidratación durante el ejercicio.', 8, 6),
('Powerade', 'ayuda en reposición de electrolitos', 10, 6);

INSERT INTO Inventario (Cantidad, Id_Producto) VALUES
('50',1),
('55',2),
('55',3),
('60',4),
('50',5),
('65',6),
('70',7),
('75',8),
('80',9),
('45',10),
('60',11),
('70',12);


INSERT INTO Nota_de_Entrada (Id_Usuario,Id_Proveedor, Monto) VALUES
(2, 3, 800),
(7, 1, 1000);

INSERT INTO Detalle_Entrada (Id_Nota_Entrada,Cod_Producto, Cantidad, Precio, Fecha) VALUES
(1, 2, 10, 13, '2023-05-23'),
(1, 6, 2, 160, '2023-05-23'),
(2,7, 2, 278, '2023-07-15'),
(2, 9, 2, 95, '2023-07-15');
UPDATE Detalle_Entrada
SET Cantidad=15
WHERE Id_Nota_Entrada=2 AND Cod_Producto=9
select * from Detalle_Entrada
INSERT INTO Factura (Monto,Id_Usuario, Id_Cliente) VALUES
(500, 2, 9),
(200, 3, 10),
(50, 5, 11);
INSERT INTO Factura (Monto,Id_Usuario, Id_Cliente) VALUES(350,4,9);
select * from Factura
INSERT INTO Detalle_Factura (Cod_Producto,Nit_Factura, Cantidad, Precio, Fecha) VALUES
--500
(5, 1, 1, 175, '2023-06-15'),
(7, 1, 1, 285, '2023-06-15'),
(6, 1, 4, 10, '2023-06-15'),
--200
(2, 2, 1, 57, '2023-03-02'),
(9, 2, 1, 110, '2023-03-02'),
(3, 2, 1, 8, '2023-03-02'),
(1, 2, 1, 15, '2023-03-02'),
(12, 2, 1, 10, '2023-03-02'),

--50
(11, 3, 2, 15, '2023-08-21'),
(8, 3, 2, 10, '2023-08-21');
INSERT INTO Detalle_Factura (Cod_Producto,Nit_Factura, Cantidad, Precio, Fecha) VALUES
(2, 3, 2, 150, '2023-09-21');


