<?php
include './conexion.php';

$cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
$longitudCadena=strlen($cadena);
$pass = "";
$longitudPass=10;
for($i=1 ; $i<=$longitudPass ; $i++){
$pos=rand(0,$longitudCadena-1);
$pass .= substr($cadena,$pos,1);}

mysql_query("INSERT INTO `productos`(`nombre`, `id_lista`) VALUES ('{$_GET["nombre"]}', '{$_GET["id_lista"]}')");
echo mysql_error();
   
mysql_query("UPDATE listas SET n_productos=n_productos+1 WHERE id = '{$_GET["id_lista"]}'");
echo mysql_error();

$error=  mysql_error();

if (empty($error)) {
    $resultados["confirmacion"] = "correcto";
} else {
    $resultados["confirmacion"] = "erroneo";
}
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);