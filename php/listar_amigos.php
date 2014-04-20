<?php
include './conexion.php';

//$peticion=mysql_query("SELECT nombre FROM usuarios WHERE id!='{$_GET["id_usuario"]}' ORDER BY nombre");
$peticion=mysql_query("SELECT * FROM usuarios, amigos WHERE usuarios.id=amigos.id_amigo and amigos.id_usuario='{$_GET["id_usuario"]}' ORDER BY usuarios.nombre");
echo mysql_error();
$x=0;
 while ($registro = mysql_fetch_array($peticion)){
    $sh_usuarios["n_".$x]=$registro["nombre"];
    $x++;
 }
$sh_usuarios["cuenta"]=$x;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);