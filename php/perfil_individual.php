<?php
include './conexion.php';

$peticion=mysql_query("SELECT imagen_logo, imagen_fondo FROM usuarios WHERE nombre='{$_GET["id"]}'");
echo mysql_error();
$resultado=mysql_fetch_assoc($peticion);
    $sh_usuarios["i_logo"]=$resultado["imagen_logo"];
    $sh_usuarios["i_fondo"]=$resultado["imagen_fondo"];
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);