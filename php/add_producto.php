<?php
include './conexion.php';

$cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
$longitudCadena=strlen($cadena);
$pass = "";
$longitudPass=10;
for($i=1 ; $i<=$longitudPass ; $i++){
$pos=rand(0,$longitudCadena-1);
$pass .= substr($cadena,$pos,1);}

mysql_query("INSERT INTO `listas`(`nombre`, `descripcion`, `n_productos`, `n_productos_comprados`, `keywl`) VALUES ('{$_GET["nombre"]}','{$_GET["descripcion"]}', 0, 0, '$pass')");
echo mysql_error();

$peticion=mysql_query("SELECT id FROM listas WHERE keywl='$pass'");
echo mysql_error();

$registro = mysql_fetch_array($peticion);
   $registro["id"];
   
mysql_query("INSERT INTO `pertenecientes_listas`(`id_usuario`, `id_lista`, `cargo`) VALUES ('{$_GET["id"]}', '{$registro["id"]}', 'Ad')");
echo mysql_error();

mysql_query("UPDATE `listas` SET `keywl`='' WHERE id='{$registro["id"]}'");
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