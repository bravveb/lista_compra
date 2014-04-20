<?php
include './conexion.php';

mysql_query("UPDATE  `productos` SET  `estado` =  '{$_GET["estado"]}' WHERE  `productos`.`id` ='{$_GET["id_producto"]}';");
echo mysql_error();

    $peticionpro = mysql_query("SELECT count(id) FROM `productos` WHERE id_lista='{$_GET["lista"]}'");
    $resultadopro = mysql_fetch_assoc($peticionpro);

    $peticioncomp = mysql_query("SELECT count(id) FROM `productos` WHERE id_lista='{$_GET["lista"]}' and estado='2'");
    $resultadocomp = mysql_fetch_assoc($peticioncomp);

    $resultados["np_loc"] = $resultadopro["count(id)"];
    $resultados["npc_loc"] = $resultadocomp["count(id)"];
    
    if ($resultadocomp["count(id)"] == 0 || $resultadopro["count(id)"] == 0) {
        $porcentaje = 0;
    } else {
        $porcentaje = ($resultadocomp["count(id)"] * 100) / $resultadopro["count(id)"];
    }
    $resultados["pp_loc"] = $porcentaje;

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