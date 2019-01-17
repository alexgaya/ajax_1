DROP TABLE IF EXISTS personas;
DROP TABLE IF EXISTS puestos;
DROP TABLE IF EXISTS departamentos;

CREATE TABLE departamentos (
	id int(3) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE puestos (
	id int(3) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    id_departamento int(3) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id)
);

CREATE TABLE personas (
	id int(3) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono int(10),
    id_puesto int(3) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_puesto) REFERENCES puestos(id)
);

INSERT INTO departamentos (nombre) VALUES ('Administraci�n');
INSERT INTO departamentos (nombre) VALUES ('Inform�tica');

INSERT INTO puestos (nombre, id_departamento) VALUES ('Contable',1);
INSERT INTO puestos (nombre, id_departamento) VALUES ('Administraci�n',1);
INSERT INTO puestos (nombre, id_departamento) VALUES ('Ingenier�a',2);
INSERT INTO puestos (nombre, id_departamento) VALUES ('Desarrollo',2);

INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Alex','alex@alex.com',111222333,1);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Paco','paco@paco.com',222333444,1);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Toni','toni@toni.com',333444555,2);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Pepe','pepe@pepe.com',444555666,2);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('�ngela','angela@angela.com',555666777,3);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Mar�a','maria@maria.com',666777888,3);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Laura','laura@laura.com',777888999,4);
INSERT INTO personas (nombre, email, telefono, id_puesto) VALUES ('Juan','juan@juan.com',888999000,4);