<?php
include './conexion.php';

$peticion=mysql_query("SELECT * FROM productos WHERE id_lista='{$_GET["id_lista"]}' ORDER BY nombre");
echo mysql_error();

$x=0;
 while ($registro = mysql_fetch_array($peticion)){
    $sh_usuarios["idp_".$x]=$registro["id"];
    $sh_usuarios["nmp_".$x]=$registro["nombre"];
    $x++;
 }
$sh_usuarios["cuenta"]=$x;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);