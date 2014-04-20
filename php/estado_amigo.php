<?php
include './conexion.php';

$consulta=mysql_query("SELECT id_usuario FROM amigos WHERE id_usuario='{$_GET["id"]}' and id_amigo=SHA('{$_GET["id_amigo"]}')");
echo mysql_error();
$resultado=mysql_fetch_assoc($consulta);
if (empty($resultado)) {
    $resultados["confirmacion"] = "no";
}else{
    $resultados["confirmacion"] = "si";
}
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

/* ---------------------------------------------------------------------------- */
mysql_close($conexion);