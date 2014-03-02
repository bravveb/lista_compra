<?php
$conexion = mysql_connect ("localhost","appuestas","appuestas");
mysql_select_db("appuestas",$conexion);

$peticion=mysql_query("SELECT id, nombre FROM usuarios WHERE nombre!='{$_GET["nombre"]}' ORDER BY nombre");
echo mysql_error();
$x=0;
 while ($registro = mysql_fetch_array($peticion)){
    $sh_usuarios["u_".$x]=$registro["nombre"];
    $sh_usuarios["i_".$x]=$registro["id"];
    $x++;
 }
$sh_usuarios["cuenta"]=$x;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);