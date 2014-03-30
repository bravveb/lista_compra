<?php
include './conexion.php';

//$sql3 = "CREATE TABLE versiones
//(version float,
//url text
//)";
//mysql_query($sql3,$conexion);
//echo mysql_error();
//
//$sql1 = "CREATE TABLE usuarios
//(id varchar (40) NOT NULL UNIQUE,
//nombre varchar (30) NOT NULL UNIQUE,
//password varchar (40) NOT NULL,
//imagen_logo varchar (150),
//imagen_fondo varchar (150),
//PRIMARY KEY (id)
//)";
//mysql_query($sql1,$conexion);
//echo mysql_error();
//
//$sql3 = "CREATE TABLE amigos
//(id_usuario varchar (40) NOT NULL,
//nombre_usuario varchar (30) NOT NULL,
//id_amigo varchar (40) NOT NULL,
//nombre_amigo varchar (30) NOT NULL,
//PRIMARY KEY (id_usuario, id_amigo),
//FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE,
//FOREIGN KEY (id_amigo) REFERENCES usuarios (id) ON DELETE CASCADE
//)";
//mysql_query($sql3,$conexion);
//echo mysql_error();
//
//$sql4 = "CREATE TABLE listas
//(id int NOT NULL AUTO_INCREMENT,
//nombre varchar (30),
//descripcion text,
//n_productos int,
//n_productos_comprados int,
//keywl varchar (30),
//PRIMARY KEY (id)
//)";
//mysql_query($sql4,$conexion);
//echo mysql_error();
//
//$sql5 = "CREATE TABLE pertenecientes_listas
//(id_usuario varchar (40) NOT NULL,
//id_lista int NOT NULL,
//cargo varchar(15),
//FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE,
//FOREIGN KEY (id_lista) REFERENCES listas (id) ON DELETE CASCADE,
//PRIMARY KEY (id_usuario, id_lista)
//)";
//mysql_query($sql5,$conexion);
//echo mysql_error();

mysql_close($conexion);