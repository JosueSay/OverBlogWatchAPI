-- CREATE DATABASE IF NOT EXISTS blog_josuesay;
-- CREATE USER IF NOT EXISTS 'josues'@'%' IDENTIFIED BY '12345';
-- GRANT ALL PRIVILEGES ON blog_josuesay.* TO 'josues'@'%' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;
USE blog_josuesay;

-- Creación de la tabla Categoria
CREATE TABLE Categoria (
    Id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255)
);

-- Creación de la tabla Usuarios
CREATE TABLE Usuarios (
    Id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

-- Creación de la tabla Comentario
CREATE TABLE Comentario (
    Id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    Contenido TEXT,
    Fecha DATE
);

-- Creación de la tabla Posts
CREATE TABLE Posts (
    Id_post INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(255),
    Contenido TEXT,
    Fecha DATE,
	Id_usuario INT,
	FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario)
);

-- Creación de la tabla DetalleComentario
CREATE TABLE DetalleComentario (
    Id_detalle_comentario INT PRIMARY KEY AUTO_INCREMENT,
    Id_usuario INT,
    Id_post INT,
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario),
    FOREIGN KEY (Id_post) REFERENCES Posts(Id_post)
);

-- Creación de la tabla DetallePost
CREATE TABLE DetallePost (
    Id_detalle_post INT PRIMARY KEY AUTO_INCREMENT,
    Id_categoria INT,
    Id_post INT,
    FOREIGN KEY (Id_categoria) REFERENCES Categoria(Id_categoria),
    FOREIGN KEY (Id_post) REFERENCES Posts(Id_post)
);

-- Inserción en la tabla Categoria
INSERT INTO Categoria (Nombre) VALUES ('Tecnología');
INSERT INTO Categoria (Nombre) VALUES ('Ciencia');
INSERT INTO Categoria (Nombre) VALUES ('Arte');

-- Inserción en la tabla Usuarios
INSERT INTO Usuarios (Nombre, Email, Password) VALUES ('Juan Perez', 'juan.perez@email.com', 'juan123');
INSERT INTO Usuarios (Nombre, Email, Password) VALUES ('Ana López', 'ana.lopez@email.com', 'ana123');

-- Inserción en la tabla Comentario
INSERT INTO Comentario (Contenido, Fecha) VALUES ('Este es un comentario', '2024-03-01');
INSERT INTO Comentario (Contenido, Fecha) VALUES ('Otro comentario', '2024-03-02');

-- Inserción en la tabla Posts
INSERT INTO Posts (Titulo, Contenido, Fecha, Id_usuario) VALUES ('Mi primer post', 'Este es el contenido del post', '2024-03-03', 1);
INSERT INTO Posts (Titulo, Contenido, Fecha, Id_usuario) VALUES ('Mi segundo post', 'Este es otro contenido', '2024-03-04', 1);

-- Inserción en la tabla DetalleComentario
INSERT INTO DetalleComentario (Id_usuario, Id_post) VALUES (1, 1);
INSERT INTO DetalleComentario (Id_usuario, Id_post) VALUES (2, 1);

-- Inserción en la tabla DetallePost
INSERT INTO DetallePost (Id_categoria, Id_post) VALUES (1, 1);
INSERT INTO DetallePost (Id_categoria, Id_post) VALUES (2, 2);

