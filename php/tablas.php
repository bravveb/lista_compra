<?php
include './conexion.php';

$sql1 = "CREATE TABLE usuarios
(id varchar (40) NOT NULL UNIQUE,
nombre varchar (30) NOT NULL UNIQUE,
password varchar (40) NOT NULL,
imagen_logo varchar (150),
imagen_fondo varchar (150),
PRIMARY KEY (id)
)";
mysql_query($sql1,$conexion);
echo mysql_error();

$sql3 = "CREATE TABLE amigos
(id_usuario varchar (40) NOT NULL,
nombre_usuario varchar (30) NOT NULL,
id_amigo varchar (40) NOT NULL,
nombre_amigo varchar (30) NOT NULL,
PRIMARY KEY (id_usuario, id_amigo),
FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE,
FOREIGN KEY (id_amigo) REFERENCES usuarios (id) ON DELETE CASCADE
)";
mysql_query($sql3,$conexion);
echo mysql_error();

mysql_close($conexion);